'use strict';
// const { default: axios } = require("axios")
axios;

{
  /* <script src="./node_modules/axios/dist/axios.min.js"></script> */
}

// create state
const state = {
  temperature: 72,
};

// temperature color changes based on temp
const colorEnvChange = () => {
  let temperature = state.temperature;
  let color = 'orange';
  let environment = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  if (temperature >= 80) {
    color = 'red';
    environment = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70) {
    color = 'orange';
    environment = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60) {
    color = 'yellow';
    environment = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature >= 50) {
    color = 'green';
    environment = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    color = 'teal';
  }
  const temp = document.getElementById('temperature');
  temp.className = color;

  const enviro = document.getElementById('landscape');
  enviro.textContent = environment;
  // temp.textContent = String(state.temperature);
};

// create functions
const increaseTemp = () => {
  state.temperature++;
  temperature.textContent = `${state.temperature}°`;
  colorEnvChange();
};

const decreaseTemp = () => {
  state.temperature--;
  temperature.textContent = `${state.temperature}°`;
  colorEnvChange();
};


const updateCity = () => {
    const textName = document.getElementById('search-box');
    const cityOutPut = document.getElementById('cityOutput');
    cityOutPut.innerHTML = textName.value;
}



// register event handlers
const registerEventHandlers = () => {
  // Increase Decrease Arrows
  colorEnvChange();
  updateCity();
  const addCity = document.getElementById('addCityButton');
  addCity.addEventListener('click', updateCity);
  
  const arrowUp = document.getElementById('arrow-up');
  arrowUp.addEventListener('click', increaseTemp);

  const arrowDown = document.getElementById('arrow-down');
  arrowDown.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
