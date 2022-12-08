'use strict';

function delay(fn, ms) {
    let timer = 0;
    return function (...args) {
        clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args), ms || 0);
    };
}

const state = {
    increaseTemp: null,
    decreaseTemp: null,
    currentTempCount: 60,
    currentTemp: null,
    landscape: null,
    cityDisplay: null,
    cityInput: null,
    getTempButton: null,
    skyDropDown: null,
    skyDisplay: null,
    weatherGardenSection: null
};

const loadsControls = () => {
    state.increaseTemp = document.getElementById('increaseTemp');
    state.decreaseTemp = document.getElementById('decreaseTemp');
    state.currentTemp = document.getElementById('currentTemp');
    state.landscape = document.getElementById('landscape');
    state.cityDisplay = document.getElementById('city-display');
    state.cityInput = document.getElementById('city-input');
    state.getTempButton = document.getElementById('getTempButton');
    state.skyDropDown = document.getElementById('sky-dropdown');
    state.skyDisplay = document.getElementById('skyDisplay');
    state.weatherGardenSection = document.getElementById('weather-garden-section');
};

const refreshTemp = () => {
    state.currentTemp.textContent = state.currentTempCount;
  // state.cityDisplay.textContent = state.cityInput.value;
};

const handleIncreaseTempButtonClicked = (event) => {
    ++state.currentTempCount;
    refreshTemp();
    tempTextColorChange();
    landscapeChange();
};

const handleDecreaseTempButtonClicked = (event) => {
    --state.currentTempCount;
    refreshTemp();
    tempTextColorChange();
    landscapeChange();
};

const handleCityInputChanged = (event) => {
  // refreshUI();
    state.cityDisplay.textContent = state.cityInput.value;
};

const getLatLon = cityName => {
    axios.get("http://127.0.0.1:5000/location", {
        params: {
            q: cityName,
        }
    })
    .then(response => {
        const lat = response.data[0].lat;
        const lon = response.data[0].lon;

        return (lat, lon);
    })
};

const getWeather = (lat, lon) => {  
    axios.get("http://127.0.0.1:5000/weather", {
        params: {
            lat: lat,
            lon: lon,
        }
    })
    .then(response => {
        const weather = response.main.temp;
        return 1.8(temp - 273) + 32;
    })
};

const handleGetTempButtonClicked = (event) => {
    state.currentTemp.textContent = getWeather(getLatLon(state.cityDisplay.textContent));
};

const handleSkyDropDownChanged = (event) => {
    skyDisplayChange();
};

const registerEvents = () => {
    state.increaseTemp.addEventListener('click', handleIncreaseTempButtonClicked);
    state.decreaseTemp.addEventListener('click', handleDecreaseTempButtonClicked);
    state.cityInput.addEventListener(
        'input',
        delay(handleCityInputChanged, 3000)
    );
//   state.getTempButton.addEventListener('click', handleGetTempButtonClicked);
    state.skyDropDown.addEventListener('change', handleSkyDropDownChanged);
};

const tempTextColorChange = () => {
    let temp = state.currentTempCount;
    if (temp <= 49) {
        document.getElementById('currentTemp').style.color = 'teal';
    } else if (temp >= 50 && temp <= 59) {
        document.getElementById('currentTemp').style.color = 'green';
    } else if (temp >= 60 && temp <= 69) {
        document.getElementById('currentTemp').style.color = 'yellow';
    } else if (temp >= 70 && temp <= 79) {
        document.getElementById('currentTemp').style.color = 'orange';
    } else {
        document.getElementById('currentTemp').style.color = 'red';
    }
};

const landscapeChange = () => {
    let temp = state.currentTempCount;
    if (temp <= 59) {
        state.landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else if (temp >= 60 && temp <= 69) {
        state.landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (temp >= 70 && temp <= 79) {
        state.landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else {
        state.landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    }
};

const skyDisplayChange = () => {
    let sky = state.skyDropDown.value;
    if (sky === 'snowy') {
        state.skyDisplay.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
        document.getElementById('weather-garden-section').style.backgroundColor = 'grey';
    } else if (sky === 'rainy') {
        state.skyDisplay.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
        document.getElementById('weather-garden-section').style.backgroundColor = 'darkgrey';
    } else if (sky === 'cloudy') {
        state.skyDisplay.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
        document.getElementById('weather-garden-section').style.backgroundColor = 'lightgrey';
    } else if (sky === 'sunny') {
        state.skyDisplay.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
        document.getElementById('weather-garden-section').style.backgroundColor = 'lightblue';
    }   
};

const onLoaded = () => {
    loadsControls();
    registerEvents();
    tempTextColorChange();
    landscapeChange();
    skyDisplayChange();
};

onLoaded();
