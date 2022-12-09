'use strict';

const { default: axios } = require("axios");

// State, city, temp, sky

const state = {
  city: 'Seattle',
  lat: 47.6038321,
  long: -122.3300624,
  temp: 50
};


const findLatAndLong = () => {
axios
  .get('',
    params: {
    key: process.env['LOCATION_API_KEY'],
    q: state.lat,
    format: 'json',
  })
  .then((response) => {
    console.log(response.data);
    state.lat = response.data[0].lat;
    state.long = response.data[0].lon;
  }
};

const findWeather = () => {
  axios
    .get('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}',{ 
    params: {
      lat: state.lat,
      lon: state.long
    })
  };

  const increaseTemp = () => {
    state.temp += 1;
    formatTempAndGarden();
  };

// Increase/Decrease temperature
// const increaseTemp = () => {
//   let count = 0;
//   count++;
//   const upButton = document.getElementById('up');
//   const downButton = document.getElementById('down');
//   let display = document.getElementById('tempNum');

//   upButton.addEventListener('click', function () {
//     count++;
//     display.textContent = count;
//   });
//   downButton.addEventListener('click', function () {
//     count--;
//     display.textContent = count;
//   });
//   // increaseTemp.addEventListener("click", incrementCount);
// };


const updateSky = () => {
  const inputSky = document.getElementById('skyOptions').value;
  const skyContainer = document.getElementById('sky-weather');
  let sky = '';
  let skyColor = '';
  if (inputSky === 'Clouds') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    skyColor = 'cloud';
  } else if (inputSky === 'Sunshine') {
    sky = '☁️     ☁️   ☁️ ☀️ ☁️  ☁️';
    skyColor = 'sunn';
  } else if (inputSky === 'Rain') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    skyColor = 'rain';
  } else if (inputSky === 'Snow') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    skyColor = 'snow';
  } else if (inputSky === 'Wind') {
    sky = '';
    skyColor = 'wind';
  }
}



// const decreaseTemp = () => {
//   i--;
//   document.getElementById('down').value = i;
// }
// Temperature number and background changes depending on number

// const tempColorChange = () => {

// }

// // Depending on what temperature it is, a different landscape should appear on the page.

// const

// // Changing landscapes should replace the existing landscape. There should only be one visible landscape at a time.

// // There must be at least four landscapes.

// // Reset city button
// const resetCity = () => {
//   formElement.reset()
// }
