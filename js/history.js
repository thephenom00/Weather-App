import { displayWeather } from "./weatherData.js";

export class HistoryHandler {
    constructor() {
        window.addEventListener("popstate", this.handlePopState.bind(this));
    }

    /**
     * Handles the popstate event when the user navigates through the browser history.
     *
     * @param {PopStateEvent} event The popstate event object.
     */
    handlePopState(event) {
        if (!event.state) {
            return;
        }
        const city = event.state.city;
        displayWeather(city, false); // Display weather without updating the history
    }

    /**
     * Pushes the current city search to the browser history.
     *
     * @param {String} city The name of the city to add to the history state.
     */
    pushHistory(city) {
        window.history.pushState({ city: city }, "", "?city=" + encodeURIComponent(city));
    }
}
