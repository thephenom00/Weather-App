import { displayWeatherFromLocalStorage } from './weatherData.js';
export class LastSearch {
    constructor() {}

    static checkLastSearch() {
        const question = confirm('Would you like to see the last searched city?');
        if (question) {
            const weatherData = JSON.parse(localStorage.getItem('lastSearchedCityCurrentWeather'));
            const forecastData = JSON.parse(localStorage.getItem('lastSearchedCityHourlyForecast'));
            if (!weatherData || !forecastData) {
                alert('You have not searched for any city yet.');
                return;
            } else {
                displayWeatherFromLocalStorage(weatherData, forecastData);
            }
        }
    }
}
