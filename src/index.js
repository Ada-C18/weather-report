'use strict';

let searchform = document.querySelector('#search-form');
searchform.addEventListener('submit', search);

const changeCity = () => {
  document.querySelector('#city').innerHTML = response.data.name;
};

function search(event) {
  let city = document.querySelector('#city-input').value;
  changeCity();
}

searchform.addEventListener('submit', search);

const incrementCount = document.getElementById('increaseTemp');
const decrementCount = document.getElementById('decreaseTemp');

const totalCount = document.getElementById('temperatureValue');

const state = {
  temp: 58,
};

temperatureValue.textContent = `${state.temp}°f`;

const handleIncrement = () => {
  state.temp++;
  temperatureValue.textContent = `${state.temp}°f`;
  changeColor();
  changeLandscape();
};

const handleDecrement = () => {
  state.temp--;
  temperatureValue.textContent = `${state.temp}°f`;
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
  let groundChange = '';
  if (temp > 80) {
    groundChange = '🌵_🏜__🌵🐍';
  } else if (temp > 70) {
    groundChange = '🏝_⛱__🏝_🌊';
  } else if (temp > 60) {
    groundChange = '🌳_🌈__🌳_🌸';
  } else {
    groundChange = '🌲_🌲__⛄️_🌲🌲';
  }
  ground.textContent = groundChange;
};

const registerEventHandlers = () => {
  changeColor();
  changeLandscape();
  changeCity();
};
