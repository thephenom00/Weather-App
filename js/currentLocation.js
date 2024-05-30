import { displayCard, getCurrentWeatherByCoordinates } from './weatherData.js'
import { getHourlyForecastByCoordinates } from './weatherData.js'

class Location {
    /**
     * Gets the current geographical location of the user.
     *
     * @param {Function} callback The callback function to execute with the retrieved coordinates.
     */
    static get(callback) {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            callback(latitude, longitude);
          },
          () => {
            alert('Unable to retrieve your location');
          }
        );
      }
    }
  }

export function getCurrentLocation() {
  const infoText = document.getElementById('location-status');
  infoText.style.display = 'block';

  Location.get((latitude, longitude) => {
      getCurrentWeatherByCoordinates(latitude, longitude)
      getHourlyForecastByCoordinates(latitude, longitude)
      displayCard()

      setTimeout(() => {
        infoText.style.display = 'none';
      }, 750);
    });
}
  
  