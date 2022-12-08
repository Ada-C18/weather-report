// import axios from 'axios';

const state = {
  temp: 30,
};

const formatTempAndLandscape = () => {
  let temp = state.temp;
  let color = 'fuschia';
  // const p = document.getElementById('#tempDisplay');
  if (temp > 80) {
    color = 'red';
  } else if (temp < 70) {
    color = 'orange';
  } else if (temp < 60) {
    color = 'yellow';
  } else if (temp < 50) {
    color = 'green';
  } else {
    color = 'teal';
  }

  const temperature = document.getElementById('tempDisplay');
  temperature.className = color;
  temperature.textContent = String(state.temp);
};

const addTemp = () => {
  state.temp += 1;
  formatTempAndLandscape();
  const tempDisplay = document.querySelector('#tempDisplay');
  tempDisplay.textContent = `${state.temp}`;
};

const minusTemp = () => {
  state.temp -= 1;
  formatTempAndLandscape();
};

const registerEventHandlers = () => {
  formatTempAndLandscape();

  const tempPlus = document.getElementById('tempPlus');
  tempPlus.addEventListener('click', addTemp);
  console.log(tempPlus);

  const tempMinus = document.getElementById('tempMinus');
  tempMinus.addEventListener('click', minusTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
