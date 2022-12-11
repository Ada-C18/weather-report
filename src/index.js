'use strict';

const cityName = document.querySelector('#city-name');
const citySelector = document.querySelector('#city-selector');
const cityReset = document.querySelector('#city-reset');
const tempBox = document.querySelector('#temp-box');
const temperature = document.querySelector('#temp');
const tempUnit = document.querySelector('#temp-unit');
const weather = document.querySelector('#weather');
const sky = document.querySelector('#sky');
const landscape = document.querySelector('#landscape');
const buttonIncrease = document.querySelector('#button-increase');
const buttonDecrease = document.querySelector('#button-decrease');
const unitSelector = document.querySelector('#unit-selector');

cityReset.addEventListener('click', (_) => {
    citySelector.value = '';
    updateLocation('Atlanta');
});

buttonIncrease.addEventListener('click', (_) => {
    State.temperature += State.unit === 'F' ? 5 / 9 : 1;
    updatePage();
});

buttonDecrease.addEventListener('click', (_) => {
        State.temperature -= State.unit === 'F' ? 5 / 9 : 1;
    updatePage();
});

unitSelector.addEventListener('click', (_) => {
    State.unit = State.unit === 'F' ? 'C' : 'F';
    updatePage();
});

const State = {
    city: 'Atlanta',
    temperature: 70,
    unit: 'F',
    latitude: 0,
    longitude: 0,
    weather: 'sunny',
    weatherCategory: 'clear',
};

const updateLocation = async function(input) {
    return axios
        .get('http://127.0.0.1:5000/location', {
            params: {
                q: input,
                format: 'json',
            },
        })
        .then((response) => {
            // console.log(response.data[0]);
            State.city = response.data[0]['display_name'];
            State.latitude = response.data[0]['lat'];
            State.longitude = response.data[0]['lon'];
            return updatePage();
        })
        .then((_) => updateWeather())
        .catch((error) => {
            console.log(error);
        });
};

const updateWeather = async function() {
    return axios
        .get('http://127.0.0.1:5000/weather', {
            params: {
                lat: State.latitude,
                lon: State.longitude,
            },
        })
        .then((response) => {
            // console.log(response.data);
            State.weather = response.data['weather'][0]['description'];
            State.weatherCategory = response.data['weather'][0]['main'];
            State.temperature = response.data['main']['temp'];
            return updatePage();
        })
        .catch((error) => {
            console.log(error);
        });
};

const updatePage = async function() {
    cityName.textContent = State.city;
    let normalizedTemp = Math.round(convertTemp(State.unit, State.temperature));
    temperature.textContent = `${normalizedTemp}`;
    tempUnit.textContent = `${State.unit}`;
    weather.textContent = `${State.weather}`;

    if (State.temperature < 273.15) {
        landscape.className = 'landscape-cold';
        tempBox.className = 'temp-box-cold';
    } else if (State.temperature < 288.7) {
        landscape.className = 'landscape-cool';
        tempBox.className = 'temp-box-cool';
    } else if (State.temperature < 305.4) {
        landscape.className = 'landscape-warm';
        tempBox.className = 'temp-box-warm';
    } else {
        landscape.className = 'landscape-hot';
        tempBox.className = 'temp-box-hot';
    }

    switch (State.weatherCategory) {
        case 'Thunderstorm':
            sky.className = 'sky-thunderstorm';
            break;
        case 'Drizzle':
            sky.className = 'sky-drizzle';
            break;
        case 'Rain':
            sky.className = 'sky-rain';
            break;
        case 'Snow':
            sky.className = 'sky-snow';
            break;
        case 'Clear':
            sky.className = 'sky-clear';
            break;
        case 'Clouds':
            sky.className = 'sky-clouds';
            break;
        default:
            sky.className = 'sky-atmosphere';
            break;
    }
};

const convertTemp = function(unit, K) {
    if (unit === 'C') {
        return K - 273.15;
    } else if (unit === 'F') {
        return (K - 273.15) * (9 / 5) + 32;
    }
    return 'invalid unit';
};

citySelector.addEventListener('change', (_) =>
    updateLocation(citySelector.value)
);

updateLocation('Atlanta');
