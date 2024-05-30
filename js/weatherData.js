import { HistoryHandler } from "./history.js"

const apiKey = "eee7ac16ae8410accd846f41902792f5"
const History = new HistoryHandler();

/**
 * Fetches and displays the current weather for the given city.
 *
 * @param {String} city The name of the city to fetch weather for.
 */
export function getCurrentWeatherByCity(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data)
            if (data.cod !== '404') {
                displayDate() 
            }
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
        });
}

/**
 * Fetches and displays the hourly forecast for the given city.
 *
 * @param {String} city The name of the city to fetch forecast for.
 */
export function getHourlyForecastByCity(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list)
    })
}

/**
 * Fetches and displays the current weather for the given coordinates.
 *
 * @param {Number} lat The latitude of the location.
 * @param {Number} lon The longitude of the location.
 */
export function getCurrentWeatherByCoordinates(lat, lon) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data)
            History.pushHistory(data.name)
            displayDate()
       })
}

/**
 * Fetches and displays the hourly forecast for the given coordinates.
 *
 * @param {Number} lat The latitude of the location.
 * @param {Number} lon The longitude of the location.
 */
export function getHourlyForecastByCoordinates(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list)
    })
}

/**
 * Displays the current weather data on the page.
 *
 * @param {Object} data The weather data object.
 */
export function displayCurrentWeather(data) {
    const img = document.getElementById("img")
    const location = document.getElementById("location")
    const temperature = document.getElementById("temp")
    const conditions = document.getElementById("conditions")
    location.textContent = ""
    temperature.textContent = ""
    conditions.textContent = ""
    document.getElementById('date').textContent = ""

    if (data.cod === '404') {
        img.src="images/404.png"
        temperature.textContent = "Oops! There is no city with such a name. Please try again."
        document.title = `Weather App`
    } else {
        localStorage.setItem('lastSearchedCityCurrentWeather', JSON.stringify(data));

        location.textContent = data.name
        temperature.textContent = Math.floor(data.main.temp) + "°C"
        conditions.textContent = data.weather[0].description
        document.title = `${data.name}`
        img.src = `images/${getWeatherIcon(data.weather[0].main)}.png`;
    }
}

/**
 * Displays the hourly forecast data on the page.
 *
 * @param {Array} hourlyData The array of hourly forecast data.
 */
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    if (hourlyData.cod !== '404'){
    localStorage.setItem('lastSearchedCityHourlyForecast', JSON.stringify(hourlyData));

    const next24Hours = hourlyData.slice(0, 8);
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp);
        const iconCode = item.weather[0].icon;
        let icon;

        if (navigator.onLine) {
            icon = `https://openweathermap.org/img/wn/${iconCode}.png`;
        } else {
            icon = "images/clear.png"
        }

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${icon}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    })}
}

/**
 * Displays the current date on the page.
 */
function displayDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = now.toLocaleDateString('en-US', options);
    document.getElementById('date').textContent = currentDate;
}

/**
 * Displays the main weather card with animation.
 */
export function displayCard() {
    const wrapper = document.querySelector('.wrapper');
    const hourlyData = document.querySelector('#hourly-forecast');
    
    wrapper.classList.remove('isShown');
    hourlyData.classList.remove('isShown');

    void wrapper.offsetWidth;

    wrapper.classList.add('isShown');
    hourlyData.classList.add('isShown');
}

/**
 * Displays the weather data for the given city and updates history.
 *
 * @param {String} city The name of the city to display weather for.
 * @param {Boolean} history Whether to update the search history (default: true).
 */
export function displayWeather(city, history=true) {
    getCurrentWeatherByCity(city)
    getHourlyForecastByCity(city)
    displayCard()

    if(history){
        History.pushHistory(city)
    }
}

/**
 * Displays the weather data from local storage.
 *
 * @param {Object} weatherData The stored weather data object.
 * @param {Array} forecastData The stored hourly forecast data array.
 */
export function displayWeatherFromLocalStorage(weatherData, forecastData) {
    displayCurrentWeather(weatherData);
    displayHourlyForecast(forecastData);
    displayCard()
}

/**
 * Returns the appropriate weather icon based on the weather condition.
 *
 * @param {String} weather The main weather condition.
 * @returns {String} The icon name corresponding to the weather condition.
 */
function getWeatherIcon(weather) {
    switch (weather) {
        case 'Clear':
            return 'clear';
        case 'Rain':
            return 'rain';
        case 'Snow':
            return 'snow';
        case 'Clouds':
            return 'cloud';
        case 'Haze':
            return 'mist';
        default:
            return 'cloud';
    }
}
