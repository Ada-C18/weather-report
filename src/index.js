'use strict';

const cityName = document.querySelector('#city-name');
const temperature = document.querySelector('#temp');
const tempUnit = document.querySelector('#temp-unit');
const weather = document.querySelector('#weather');
const sky = document.querySelector('#sky');
const landscape = document.querySelector('#landscape');
const buttonIncrease = document.querySelector('#button-increase');
const buttonDecrease = document.querySelector('#button-decrease');

const State = {
	temperature: 70,
	unit: 'F',
};

const updateWeather = function() {
	temperature.textContent = `${State.temperature}`;
	tempUnit.textContent = `${State.unit}`;

	if (State.temperature < 32) {
		landscape.className = 'landscape-cold';
	} else if (State.temperature < 60) {
		landscape.className = 'landscape-cool';
	} else if (State.temperature < 90) {
		landscape.className = 'landscape-warm';
	} else {
		landscape.className = 'landscape-hot';
	}
};

updateWeather();

buttonIncrease.addEventListener('click', (_) => {
	State.temperature += 1;
	updateWeather();
});

buttonDecrease.addEventListener('click', (_) => {
	State.temperature -= 1;
	updateWeather();
});
