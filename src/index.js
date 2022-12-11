'use strict';
const state = {
  temp: 75,
  city: 'Seattle',
};

// const cityForm = document.querySelector('form');
// const landscape = document.querySelector('.card');
// const card = document.querySelector('.details')


// function convertFromKtoF(temp) {
//   return (temp - 273) * (9 / 5) + 32;
// }
const convertFromKtoF = (temp) => (temp - 273) * (9 / 5) + 32;
// const letsSee = convertFromKtoF(296.48);

const colorAndLandscape = () => {
  let temp = state.temp;
  let color = 'red';
  let landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  if (temp > 80) {
    color = 'red';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp > 70) {
    color = 'orange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp > 60) {
    color = 'yellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp > 50) {
    color = 'green';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    color = 'teal';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }

  const updateLandscape = document.querySelector('#iconLandscape');
  updateLandscape.textContent = landscape;
  const temperature = document.querySelector("#tempValue");
  // for(let )
  temperature.className = color;
  temperature.textContent = String(state.temp);
};

const increaseTemp = () => {
  state.temp += 1;
  colorAndLandscape();
};

const decreaseTemp = () => {
  state.temp -= 1;
  colorAndLandscape();
};

const registerEventHandlers = () => {
  colorAndLandscape();

  // const currentTempBtn = document.getElementById('currentTempBtn');
  // currentTempBtn.addEventListener('click');

  const tempInc = document.getElementById('tempInc');
  tempInc.addEventListener('click', increaseTemp);

  const tempDec = document.getElementById('tempDec');
  tempDec.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
