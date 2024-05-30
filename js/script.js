import { getCurrentLocation } from './currentLocation.js'
import { displayWeather } from './weatherData.js'
import { LastSearch } from './lastSearch.js';
import { handleClick, handleRain } from './audio.js'
import { OnlineIndicator } from './onlineIndicator.js'

/**
 * Performs the search operation for the given city name.
 *
 * @param {String} inputCity The name of the city to search for.
 */
function search() {
    const city = document.getElementById("city").value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    displayWeather(city);
    document.getElementById("city").value = ""; // Clear the input field after search
}

/**
 * Adds event listener for 'Enter' key to trigger search when pressed.
 *
 * @event keyup
 */
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        search();
    }
});

/**
 * Adds event listener for search button click to trigger search and handle click sound effect.
 *
 * @event click
 */
document.getElementById("search-btn").addEventListener("click", () => {
    handleClick(); 
    search();
});

/**
 * Adds event listener for location button click to get weather based on current location 
 * and handle click sound effect.
 *
 * @event click
 */
document.getElementById("location-btn").addEventListener("click", () => {
    handleClick(); 
    document.getElementById("city").value = ""; 
    getCurrentLocation(); 
});

/**
 * Adds event listener for cloud click to toggle rain sound effect.
 *
 * @event click
 */
document.getElementById("cloud-click").addEventListener("click", () => {
    const crossLine = document.getElementById("crossLine");
    handleRain(crossLine);
});

/**
 * Checks and displays last searched city's weather if available.
 */
LastSearch.checkLastSearch();

/**
 * Initializes online indicator to show if the user is online or offline.
 */
new OnlineIndicator();
