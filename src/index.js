'use strict';
console.log('testing');

const state = {
  city: 'Seattle',
  temp: 70,
};

const increaseTemperature = () => {
  state.temp += 1;
  changeColor();
  // const temperature = document.getElementById('temp');
  // temperature.textContent = state.temp;
};

const decreaseTemperature = () => {
  state.temp -= 1;
  changeColor();
  // const temperature = document.getElementById('temp');
  // temperature.textContent = state.temp;
};

const changeColor = () => {
  let temp = state.temp;
  let color = 'red';
  if (temp >= 80) {
    color = 'red';
  } else if (temp >= 70) {
    color = 'orange';
  } else if (temp >= 60) {
    color = 'yellow';
  } else if (temp >= 50) {
    color = 'green';
  } else {
    color = 'teal';
  }

  const temperature = document.getElementById('temp');
  // temperature.className = color;
  temperature.style.color = color;
  // temperature.textContent = String(state.temp);
  temperature.textContent = state.temp;
};

const registerEventHandlers = () => {
  const increaseTemp = document.getElementById('increaseTemp');
  increaseTemp.addEventListener('click', increaseTemperature);

  const decreaseTemp = document.getElementById('decreaseTemp');
  decreaseTemp.addEventListener('click', decreaseTemperature);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
