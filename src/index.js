'use strict';

const incrementCount = document.getElementById('increaseTemp');
const decrementCount = document.getElementById('decreaseTemp');

const totalCount = document.getElementById('temperatureValue');

let temp = 58;

temperatureValue.innerHTML = temp;

const handleIncrement = () => {
  temp++;
  temperatureValue.innerHTML = temp;
};

const handleDecrement = () => {
  temp--;
  temperatureValue.innerHTML = temp;
};

incrementCount.addEventListener('click', handleIncrement);
decrementCount.addEventListener('click', handleDecrement);
