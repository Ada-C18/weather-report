'use strict';

const state = {
  temp: 70,
  city: 'Denver',
  lat: 0.0,
  lon: 0.0,
};

// WAVE 1 and WAVE 2  ///////
let tempValue = state.temp;
const tempControl = document.querySelector('#tempValue');
const emojiControl = document.querySelector('#emojis');

const increaseTemp = () => {
  tempValue += 1;
  tempControl.textContent = `${tempValue}`;
  changeTempColorAndLandscape();
};

const decreaseTemp = () => {
  tempValue -= 1;
  tempControl.textContent = `${tempValue}`;
  changeTempColorAndLandscape()
};

const changeTempColorAndLandscape = () => {
  if (tempValue >= 80) {
    tempControl.style.color = 'red';
    emojiControl.textContent = '🥵🥵🥵🥵🥵🥵🥵';
  } else if (tempValue >= 70 && tempValue <= 79) {
    emojiControl.textContent = '😍😍😍😍😍😍😍';
    tempControl.style.color = 'orange';
  } else if (tempValue >= 60 && tempValue <= 69) {
    emojiControl.textContent = '😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️';
    tempControl.style.color = 'yellow';
  } else if (tempValue >= 50 && tempValue <= 59) {
    emojiControl.textContent = '🤢🤢🤢🤢🤢🤢🤢';
    tempControl.style.color = 'green';
  } else if (tempValue <= 49) {
    emojiControl.textContent = '🥶🥶🥶🥶🥶🥶🥶';
    tempControl.style.color = 'teal';
  }
};

const upButton = document.querySelector('#increaseTempControl');
upButton.addEventListener('click', increaseTemp);

const downButton = document.querySelector('#decreaseTempControl');
downButton.addEventListener('click', decreaseTemp);



// WAVE 3 /////////
let city = state.city;
const cityName = document.querySelector('#cityName');

const changeCity = () => {
  const changeCityInput = document.querySelector('#inputCity');
  city = changeCityInput.value;
  cityName.textContent = city;
};

const inputCity = document.querySelector('#inputCity');
inputCity.addEventListener('input', changeCity);



// Wave 4 ///////
const kelvinToFarenheight = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32;
};

const getRealTemp = async () => {
  const response = await axios.get('http://127.0.0.1:5000/weather', {
    params: {
      lat: state.lat,
      lon: state.lon,
    },
  });
  const weather = kelvinToFarenheight(response.data.main.temp);

  tempValue = Math.round(weather);
  tempControl.textContent = `${tempValue}`;
  changeTempColorAndLandscape();
};

const getLatLon = async () => {
  const response = await axios.get('http://127.0.0.1:5000/location', {
    params: {
      q: city,
    },
  });
  state.lat = response.data[0].lat;
  state.lon = response.data[0].lon;
  getRealTemp();
};

const realTempButton = document.querySelector('#realTempButton');
realTempButton.addEventListener('click', getLatLon);



// Wave 5 //////
const changeSky = () => {
  const skySelect = document.getElementById('sky-select').value;
  const emojiSky = document.getElementById('emoji-sky');
  let sky = '';
  let skyColor = '';
  if (skySelect === 'The Heat Is On') {
    sky = '☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️';
    skyColor = 'hot';
  } else if (skySelect === 'Chasing the Clouds Away') {
    sky = '☀️🌈☀️🦄☀️🌈☀️☀️🌈☀️🦄☀️🌈☀️';
    skyColor = 'perfect';
  } else if (skySelect === 'Purple Rain') {
    sky = '🌈🌧💧💧💧🌧💧💧💧🌧🌈';
    skyColor = 'rainy';
  } else if (skySelect === 'Ice Ice Baby') {
    sky = '🌧⛈🌧🌧💧🌧🌦🌧💧🌧🌧';
    skyColor = 'snowy';
  }
  emojiSky.textContent = sky;
  const landscape = document.getElementById('landscapeContent');
  landscape.classList = `landscape-content ${skyColor}`;
};

const skySelect = document.getElementById('sky-select');
skySelect.addEventListener('change', changeSky);



// WAVE 6 /////////
const resetCity = () => {
  const changeCityInput = document.querySelector('#inputCity');
  changeCityInput.value = 'Denver';
  cityName.textContent = 'Denver';
};

const cityButton = document.getElementById('cityButton');
cityButton.addEventListener('click', resetCity);
