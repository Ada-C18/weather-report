'use strict';

// const { default: axios } = 'axios';

// State, city, temp, sky

// "https://us1.locationiq.com/v1/search.php"
// "https://api.openweathermap.org/data/2.5/weather"

const state = {
  city: 'Seattle',
  lat: 47.6038321,
  long: -122.3300624,
  temp: 48,
};

const convertKtoF = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32;
};

// increase/decrease
const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
let display = document.getElementById('tempNum');

upButton.addEventListener('click', function increaseTemp() {
  state.temp++;
  display.textContent = state.temp;
  displayEmojis();
});
downButton.addEventListener('click', function decreaseTemp() {
  state.temp--;
  display.textContent = state.temp;
  displayEmojis();
});

const findLatAndLong = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.long = response.data[0].lon;
      findWeather();
    });
};

const currentWeather = document.getElementById('currentWeather');
currentWeather.addEventListener('click', findLatAndLong);

const findWeather = (lat, long) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.long,
        // units: imperial,
      },
    })
    .then((response) => {
      const weather = response.data;
      console.log(weather);
      state.temp = Math.round(convertKtoF(weather.main.temp));
      displayEmojis();
      // console.log(weather);
    });
  // console.log(findWeather);
};

currentWeather.addEventListener('click', findWeather);

const updateCity = (event) => {
  const newCity = event.target.value;
  state.city = newCity;
  displayCity();
};

const newCity = document.getElementById('newCity');
newCity.addEventListener('input', updateCity);
const resetText = () => {
  const newCity = document.getElementById('newCity');
  newCity.value = 'Seattle';
  updateCity();
};
// Get the button
let resetButton = document.getElementById('reset');
// Add a click event listener to the button
resetButton.addEventListener('click', resetText);

const displayCity = () => {
  document.getElementById('cityInput').textContent = state.city;
};

const displayEmojis = () => {
  let numColor = 'red';
  let emojisBelow = '🌵__🐍_🦂_🌵🌴__🐍_🏜_🦂';
  if (state.temp > 80) {
    emojisBelow = '🌴__🐍_🦂_🌴🌵__🐍_🏜_🌴';
    numColor = 'red';
  } else if (state.temp > 70) {
    emojisBelow = '🌸🌿🌼__🌷🌻🦋_☘️🌱_🦋🌷';
    numColor = 'orange';
  } else if (state.temp > 60) {
    emojisBelow = '🥾🏞️🏕🧗🚵⛰_🪨🥾🏞️🏕🧗🚵⛰';
    numColor = 'green';
  } else if (state.temp > 50) {
    emojisBelow = '🍂☕️🪵🍂☕️🪵🍂☕️🪵🍂☕️🪵🍂☕️🪵';
    numColor = 'purple';
  } else {
    emojisBelow = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    numColor = 'grey';
  }
  const newEmojis = document.getElementById('emojis-below');
  newEmojis.textContent = emojisBelow;

  const temperature = document.getElementById('tempNum');
  temperature.className = numColor;
  temperature.textContent = String(state.temp);
};

const updateSky = () => {
  const inputSky = document.getElementById('climate').value;
  let sky = '';
  if (inputSky === 'clouds') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (inputSky === 'sunshine') {
    sky = '☁️☁️☁️     ☁️   ☁️ ☀️ ☁️  ☁️☁️☁️';
  } else if (inputSky === 'rain') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (inputSky === 'snow') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  } else if (inputSky === 'wind') {
    sky = '🌬️☁️🌬️☁️🌬️☁️🌬️☁️🌬️☁️🌬️☁️';
  }

  const skyContainer = document.getElementById('weather-emojis');
  skyContainer.textContent = sky;
};

updateSky();
const chooseSky = document.getElementById('climate');
chooseSky.addEventListener('change', updateSky);

console.log(updateSky);
