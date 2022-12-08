'use strict';

// Select the HTML Element the event will occur on
const increaseTempElement = document.getElementById('increaseTempBtn');
const decreaseTempElement = document.getElementById('decreaseTempBtn');
const currentTemp = document.getElementById('currentTemp');

// Make a function to run when it occurs
// const changeTemperature = () => {
//   if (increaseTempElement) {
//     currentTemp.textContent = parseInt(currentTemp.textContent) + 1;
//   } else if (decreaseTempElement) {
//     currentTemp.textContent = parseInt(currentTemp.textContent) - 1;
//   }
// };

// Make a function to run when it occurs
const increaseTemperature = (event) => {
  currentTemp.textContent = parseInt(currentTemp.textContent) + 1;
  console.dir(event);
};

const decreaseTemperature = () => {
  currentTemp.textContent = parseInt(currentTemp.textContent) - 1;
};

// const changingColor = () => {
//   if currentTemp > 80 // assign class
// };

// Register that function as an 'event listener'
increaseTempElement.addEventListener('click', increaseTemperature);
decreaseTempElement.addEventListener('click', decreaseTemperature);
