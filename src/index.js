'use strict';

const cityName = document.querySelector('#city-name');
const citySelector = document.querySelector('#city-selector');
const tempBox = document.querySelector('#temp-box');
const temperature = document.querySelector('#temp');
const tempUnit = document.querySelector('#temp-unit');
const weather = document.querySelector('#weather');
const sky = document.querySelector('#sky');
const landscape = document.querySelector('#landscape');
const buttonIncrease = document.querySelector('#button-increase');
const buttonDecrease = document.querySelector('#button-decrease');

buttonIncrease.addEventListener('click', (_) => {
    State.temperature += 1;
    updatePage();
});

buttonDecrease.addEventListener('click', (_) => {
    State.temperature -= 1;
    updatePage();
});

citySelector.addEventListener('input', (_) => {
    axios
        .get('http://127.0.0.1:5000/location', {
            params: {
                q: citySelector.value,
                format: 'json',
            },
        })
        .then((response) => {
            console.log(response.data[0]);
            State.latitude = response.data[0]['lat'];
            State.longitude = response.data[0]['lon'];
            cityName.textContent = response.data[0]['display_name'];
        })
        .catch((error) => {
            console.log(error);
        });
});

const State = {
    temperature: 70,
    unit: 'F',
    latitude: 0,
    longitude: 0,
    weather: 'sunny',
};

const updateWeather = function() {
    axios
        .get('http://127.0.0.1:5000/weather', {
            params: {
                lat: State.latitude,
                lon: State.longitude,
            },
        })
        .then((response) => {
            console.log(response.data);
            State.weather = response.data['weather'][0]['description'];
            State.temp = response.data['main']['temp'];
        })
        .catch((error) => {
            console.log(error);
        });
};

const updatePage = function() {
    temperature.textContent = `${State.temperature}`;
    tempUnit.textContent = `${State.unit}`;
    weather.textContent = `${State.weather}`;

    if (State.temperature < 32) {
        landscape.className = 'landscape-cold';
        tempBox.className = 'temp-box-cold';
    } else if (State.temperature < 60) {
        landscape.className = 'landscape-cool';
        tempBox.className = 'temp-box-cool';
    } else if (State.temperature < 90) {
        landscape.className = 'landscape-warm';
        tempBox.className = 'temp-box-warm';
    } else {
        landscape.className = 'landscape-hot';
        tempBox.className = 'temp-box-hot';
    }
};

updatePage();
