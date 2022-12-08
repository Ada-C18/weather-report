// const axios = require('axios');
// import axios from 'axios';
const axios = require('axios/dist/node/axios.cjs'); 
require('dotenv').config();

const locationApi = process.env.LOCATION_API_KEY; 
const weatherApi = process.env.WEATHER_API_KEY;

const state = {
    city: 'Seattle',
    lat: 47.6038321,
    long: -122.330062,
    temp: 0
}

const convertKtoF = (temp) => {
    return (temp - 273.15) * (9 / 5) + 32;
};

const findLatandLong = () => {
    axios.get('https://us1.locationiq.com/v1/search.php', 
    {
        params: {
            key: locationApi,
            q: state.city,
            format: 'json'
    }
})
    .then ( (response) => {
        state.lat = response.data[0].lat;
        state.long = response.data[0].lon;
        getWeather();
})
    .catch ( (error) => {
        console.log('Error getting long and lat', error.response);
    });
};

const getWeather = () => {
    axios.get('https://api.openweathermap.org/data/3.0/onecall?',
    {
        params: {
            appid: weatherApi,
            lat: state.lat,
            lon: state.long,
            format: 'json' 
    }
})
    .then( (response) => {
        const weather = response.data.current.temp;
    })
    .catch( (error) => {
        console.log('Error getting weather', error.response);
    });
};


const updateCityName = () => {
    const inputName = document.getElementById('cityNameInput').value;
    const headerCity = document.getElementById('headerCity');
    state.city = inputName;
    headerCity.textContent = state.city;
};

updateCityName();
const cityNameInput = document.getElementById('cityNameInput');
cityNameInput.addEventListener('input', updateCityName);

let i = 0;
let currentTemp = document.getElementById("tempValue");
currentTemp.innerHTML = i;

const increaseTemp = () => {
    i++;
    currentTemp.innerHTML = i;
};

const decreaseTemp = () => {
    i--;
    currentTemp.innerHTML = i;
};

const registerEventHandlers = () => {
    const addTemp = document.getElementById("increaseTemp");
    addTemp.addEventListener("click", increaseTemp);
    const lowerTemp = document.getElementById("decreaseTemp");
    lowerTemp.addEventListener("click", decreaseTemp);
    updateCityName();
    const cityNameInput = document.getElementById('cityNameInput');
    cityNameInput.addEventListener('input', updateCityName);
};


document.addEventListener("DOMContentLoaded", registerEventHandlers);
