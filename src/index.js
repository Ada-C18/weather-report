'use strict';

const cityName = document.querySelector('#city-name');
const temperature = document.querySelector('#temp');
const tempUnit = document.querySelector('#temp-unit');
const weather = document.querySelector('#weather');
const buttonIncrease = document.querySelector('#button-increase');
const buttonDecrease = document.querySelector('#button-decrease');

const State = {
	temperature: 70,
	unit: 'F',
};

const updateWeather = function() {
	temperature.textContent = `${State.temperature}`;
	tempUnit.textContent = `${State.unit}`;
};

updateWeather();

buttonIncrease.addEventListener('click', (_) => { });
