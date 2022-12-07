'use strict';

const incrementCount = document.getElementById('increaseTemp');
const decrementCount = document.getElementById('decreaseTemp');

const totalCount = document.getElementById('temperatureValue');

let temp = 58;

temperatureValue.innerHTML = temp;

const handleIncrement = () => {
  temp++;
  temperatureValue.innerHTML = temp;
  changeColor();
};

const handleDecrement = () => {
  temp--;
  temperatureValue.innerHTML = temp;
  changeColor();
};

incrementCount.addEventListener('click', handleIncrement);
decrementCount.addEventListener('click', handleDecrement);

const state = {
  temp: 58,
};

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

const registerEventHandlers = () => {
  changeColor();
};
