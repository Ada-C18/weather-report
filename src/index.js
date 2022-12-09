'use strict';
console.log('testing');

const state = {
  city: 'Seattle',
  temp: 80,
};

const increaseTemperature = () => {
  state.temp += 1;
  changeColorAndGarden();
  // const temperature = document.getElementById('temp');
  // temperature.textContent = state.temp;
};

const decreaseTemperature = () => {
  state.temp -= 1;
  changeColorAndGarden();
  // const temperature = document.getElementById('temp');
  // temperature.textContent = state.temp;
};

const changeColorAndGarden = () => {
  let temp = state.temp;
  let color = 'red';
  // let garden = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';

  if (temp >= 80) {
    color = 'red';
    garden = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    color = 'orange';
    garden = '🦜🦜__😎_ 🌞__⛱⛱_ ';
  } else if (temp >= 60) {
    color = 'yellow';
    garden = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 50) {
    color = 'green';
    garden = '🌱🌱__ 🌻 🌿__ 🌷🌷';
  } else {
    color = 'teal';
    garden = '❄️🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲️';
  }

  const newgarden = document.getElementById('garden');
  newgarden.textContent = garden;
  const temperature = document.getElementById('temp');
  temperature.className = color;
  temperature.textContent = String(state.temp);
};

const registerEventHandlers = () => {
  changeColorAndGarden();

  const increaseTemp = document.getElementById('increaseTemp');
  increaseTemp.addEventListener('click', increaseTemperature);

  const decreaseTemp = document.getElementById('decreaseTemp');
  decreaseTemp.addEventListener('click', decreaseTemperature);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
