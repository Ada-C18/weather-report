'use strict';

const incrementCount = document.getElementById('increaseTemp');
const decrementCount = document.getElementById('decreaseTemp');

const totalCount = document.getElementById('temperatureValue');

// let temp = 58;
const state = {
  temp: 58,
};

temperatureValue.innerHTML = `${state.temp}°f`;

const handleIncrement = () => {
  state.temp++;
  temperatureValue.innerHTML = `${state.temp}°f`;
  changeColor();
  changeLandscape();
};

const handleDecrement = () => {
  state.temp--;
  temperatureValue.innerHTML = `${state.temp}°f`;
  changeColor();
  changeLandscape();
};

incrementCount.addEventListener('click', handleIncrement);
decrementCount.addEventListener('click', handleDecrement);

// const state = {
//   temp: 58,
// };

const changeColor = () => {
  let temp = state.temp;
  let color = '';
  if (temp > 80) {
    color = 'red';
  } else if (temp > 70) {
    color = 'orange';
  } else if (temp > 60) {
    color = 'yellow';
  } else if (temp > 50) {
    color = 'green';
  } else {
    color = 'blue';
  }
  totalCount.className = color;
};

const ground = document.getElementById('ground');

const changeLandscape = () => {
  let temp = state.temp;
  let ground = '';
  if (temp > 80) {
    ground = '🌵_🏜__🌵🐍';
  } else if (temp > 70) {
    ground = '🏝_⛱__🏝_🌊';
  } else if (temp > 60) {
    ground = '🌳_🌈__🌳_🌸';
  } else {
    ground = '🌲_🌲__⛄️_🌲🌲';
  }
  // ground-contents.className = ground;
};

const registerEventHandlers = () => {
  changeColor();
  changeLandscape();
};
