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

const State = {
    city: 'Atlanta',
    temperature: 70,
    unit: 'F',
    latitude: 0,
    longitude: 0,
    weather: 'sunny',
};

const updateLocation = async function(input) {
    axios
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
            updatePage();
        })
        .catch((error) => {
            console.log(error);
        });
};

citySelector.addEventListener('input', (_) =>
    updateLocation(citySelector.value).then(updateWeather())
);

const updateWeather = function() {
    axios
        .get('http://127.0.0.1:5000/weather', {
            params: {
                lat: State.latitude,
                lon: State.longitude,
            },
        })
        .then((response) => {
            // console.log(response.data);
            State.weather = response.data['weather'][0]['description'];
            State.temperature = response.data['main']['temp'];
            updatePage();
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

    if (normalizedTemp < 32) {
        landscape.className = 'landscape-cold';
        tempBox.className = 'temp-box-cold';
    } else if (normalizedTemp < 60) {
        landscape.className = 'landscape-cool';
        tempBox.className = 'temp-box-cool';
    } else if (normalizedTemp < 90) {
        landscape.className = 'landscape-warm';
        tempBox.className = 'temp-box-warm';
    } else {
        landscape.className = 'landscape-hot';
        tempBox.className = 'temp-box-hot';
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

updateLocation('Atlanta').then(updateWeather());
