// import axios from 'axios';

const state = {
  temp: 30,
};

const formatTempAndGarden = () => {
  let temp = state.temp;
  const temperature = document.getElementById('tempDisplay');
  temperature.textContent = String(state.temp);
};

const addTemp = () => {
  state.temp += 1;
  formatTempAndGarden();
  const tempDisplay = document.querySelector('#tempDisplay');
  tempDisplay.textContent = `${state.temp}`;
};

const minusTemp = () => {
  state.temp -= 1;
  formatTempAndGarden();
};

const registerEventHandlers = () => {
  formatTempAndGarden();

  const tempPlus = document.getElementById('tempPlus');
  tempPlus.addEventListener('click', addTemp);

  const tempMinus = document.getElementById('tempMinus');
  tempMinus.addEventListener('click', minusTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
