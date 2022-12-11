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

// increase temp
const increaseTemp = () => {
  state.temp++;
  displayEmojis();
  // console.log(increaseTemp);
  // console.log(state.temp);
};

const decreaseTemp = () => {
  state.temp--;
  displayEmojis();
};

const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
let display = document.getElementById('tempNum');

upButton.addEventListener('click', function increaseTemp() {
  state.temp++;
  display.textContent = state.temp;
});
downButton.addEventListener('click', function decreaseTemp() {
  state.temp--;
  display.textContent = state.temp;
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

const updateCity = () => {
  const newCity = document.getElementById('newCity');
  state.city = newCity.value;
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

const displayEmojis = () => {
  let numColor = 'red';
  let emojisBelow = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  if (state.temp > 80) {
    emojisBelow = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    numColor = 'red';
  } else if (state.temp > 70) {
    emojisBelow = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    numColor = 'orange';
  } else if (state.temp > 60) {
    emojisBelow = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    numColor = 'green';
  } else if (state.temp > 50) {
    emojisBelow = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
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

// const tempColorChange = () => {
//   const tempContainer = document.getElementById('temperature');
//   tempColorChange.addEventListener('click', findWeather);
//   if (tempContainer <= 32) {
//     document.body.style.backgroundColor = 'blue';

//     document.write('🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨');
//   } else if (tempContainer > 32 && tempContainer <= 50) {
//   } else if (tempContainer > 50 && tempContainer <= 68) {
//   } else if (tempContainer > 68 && tempContainer <= 86) {
//   } else {
//   }
// };

const updateSky = () => {
  let sky = '';
  let skyColor = '';
  if (inputSky === 'clouds') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    skyColor = 'cloud';
  } else if (inputSky === 'sunshine') {
    sky = '☁️     ☁️   ☁️ ☀️ ☁️  ☁️';
    skyColor = 'sunny';
  } else if (inputSky === 'rain') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    skyColor = 'rain';
  } else if (inputSky === 'snow') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    skyColor = 'snow';
  } else if (inputSky === 'wind') {
    sky = '🌬️☁️🌬️☁️🌬️☁️🌬️☁️🌬️☁️🌬️☁️';
    skyColor = 'wind';
  }

  const inputSky = document.getElementById('skyOptions').value;
  inputSky.textContent = inputSky;
  const skyContainer = document.getElementById('sky-weather');
  skyContainer.className = skySection;
  skyContainer.textContent = String(state.temp);
  // skyContainer.textContent = sky;
  // skyOptions.addEventListener('change', updateSky);
};

console.log(updateSky);
