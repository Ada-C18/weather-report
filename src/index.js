'use strict';

//making a promise wave 4:

const getLocation = (cityInput) => {
  let lat, lon;
  axios.get('http://127.0.0.1:5000/location', {
  params: {
    q: cityInput,
    format: 'json',
    }
  })
  .then((response) => {
    lat = response.data[0].lat;
    lon = response.data[0].lon;
    console.log("lat: ", lat, "lon: ", lon);

    getWeather(lat, lon);
  })
  .catch((error) => {
    console.log(error.data);
  });
};

const getWeather = (lat, lon) => {
  axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat: lat,
      lon: lon,
    }
  })
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log('error in getting weather!');
  });
}

// const latAndLon = getLocation('Seattle');
getWeather(47.6038321, -122.330062);

















//increases temperature from click
let currentTemp = 70;
const tempUp = () => {
  const tempValue = document.querySelector('#temp-value');
  currentTemp += 1;
  tempValue.innerHTML = currentTemp;
  changeTemperatureColor();
};
//decreases temperature from click
const tempDown = () => {
  const tempValue = document.querySelector('#temp-value');
  currentTemp -= 1;
  tempValue.innerHTML = currentTemp;
  changeTemperatureColor();
};

//changes colors according to temperature
const changeTemperatureColor = () => {
  const textColor = document.getElementById('temp-value');
  const groundLand = document.getElementById('ground');
  if (currentTemp >= 80) {
    textColor.className = 'red';
    groundLand.innerHTML = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (currentTemp >= 70 && currentTemp <= 79) {
    textColor.className = 'orange';
    groundLand.innerHTML = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (currentTemp >= 60 && currentTemp <= 69) {
    textColor.className = 'yellow';
    groundLand.innerHTML = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (currentTemp >= 50 && currentTemp <= 59) {
    textColor.className = 'green';
    groundLand.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    textColor.className = 'teal';
    groundLand.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

//city input text updates city name
const cityName = document.getElementById('city-name');
const cityInput = document.getElementById('city-input');
const inputHandler = function (e) {
  cityName.innerHTML = e.target.value;
};

//get temperature button id"temp-button"
const updateTemperature = () => {
  const tempButton = document.getElementById('temp-button');
  
}

//changes sky from drop down menu options
const changeSky = () => {
  const skyView = document.getElementById('sky');
  const skyOption = document.getElementById('dropdown');
  if (skyOption.value === 'cloudy') {
    skyView.innerHTML = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyOption.value === 'sunny') {
    skyView.innerHTML = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyOption.value === 'rainy') {
    skyView.innerHTML = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyOption.value === 'snowy') {
    skyView.innerHTML = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

//resets button to blank. We can make Seattle default if that is something we want.
const clearInput = () => {
  document.getElementById("city-input").value = '';
};

//register event handlers
const registerEventHandlers = () => {
  cityInput.addEventListener('input', inputHandler);
  cityInput.addEventListener('propertychange', inputHandler);

  const tempUpButton = document.querySelector('#up-button');
  tempUpButton.addEventListener('click', tempUp);

  const tempDownButton = document.querySelector('#down-button');
  tempDownButton.addEventListener('click', tempDown);

  document.getElementById('dropdown').addEventListener('change', changeSky);

  const resetCity = document.querySelector("#reset-button")
  resetCity.addEventListener('click',clearInput);

  
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

//80+ 🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂
//70-79 🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷
//60-69 🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃
//59 or below 🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲
