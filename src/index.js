import './styles.css';

const searchBtn = document.querySelector('.search-btn');
const input = document.querySelector('#searchbar');
const key = 'UH2A8AY7KYVYU3DUFPWKY6DGM';

const locationDisplay = document.querySelector('.location');
const conditionsDisplay = document.querySelector('.conditions');
const tempDisplay = document.querySelector('.temp');
const feelsLikeDisplay = document.querySelector('.feels-like');
const humidityDisplay = document.querySelector('.humidity');
const windspeedDisplay = document.querySelector('.windspeed');

searchBtn.addEventListener('click', () => {
  let location = input.value;
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;

  async function getWeather() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const weatherData = await response.json();
      let cleanData = processData(weatherData);

      locationDisplay.textContent = cleanData.location;
      conditionsDisplay.textContent = cleanData.conditions;
      tempDisplay.textContent = `Temperature: ${convertUnits(cleanData.temp)}°C`;
      feelsLikeDisplay.textContent = `Feels like: ${convertUnits(cleanData.feelsLike)}°C`;
      humidityDisplay.textContent = `Humidity: ${cleanData.humidity}%`;
      windspeedDisplay.textContent = `Wind speed: ${cleanData.windspeed} mph`;
    } catch (error) {
      console.error(`Invalid location input: ${error}`);
      alert('Invalid location.');
    }
  }

  getWeather();
});

function processData(data) {
  let location = data.resolvedAddress;
  let current = data.currentConditions;
  return {
    location: location, //khabib
    temp: current.temp,
    feelsLike: current.feelslike,
    humidity: current.humidity,
    conditions: current.conditions,
    windspeed: current.windspeed,
  };
}

function convertUnits(temp) {
  temp = ((temp - 32) * 5) / 9;
  return temp.toFixed(1);
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});
