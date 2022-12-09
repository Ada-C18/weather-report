// import axios from 'axios';

// const toCelsius = (temp) => {

// }
const state = {
  temp: 0,
};

const tempChangeUpdateUI = () => {
  const currentTemp = Number(document.querySelector('#temp-num').innerText);
  const tempConsole = document.querySelector('#temp-console');
  const landscape = document.querySelector('#landscape-img');

  if (currentTemp <= 49) {
    tempConsole.className = 'teal';
    landscape.src = 'assets/winter-landscape.png';
  } else if (currentTemp <= 59) {
    tempConsole.className = 'green';
    landscape.src = 'assets/fall-landscape.png';
  } else if (currentTemp <= 69) {
    tempConsole.className = 'yellow';
    landscape.src = 'assets/spring-landscape.png';
  } else if (currentTemp <= 79) {
    tempConsole.className = 'orange';
    landscape.src = 'assets/spring-landscape.png';
  } else if (currentTemp >= 80) {
    tempConsole.className = 'red';
    landscape.src = 'assets/summer-landscape.png';
  }
};

const decreaseTemp = () => {
  state.temp -= 1;
  currentTemp.innerText = state.temp;
  tempChangeUpdateUI();
};

const increaseTemp = () => {
  state.temp += 1;
  currentTemp.innerText = state.temp;
  tempChangeUpdateUI();
};

const convertTemp = () => {
  const currentTempType = document.querySelector('#temp-type');
  let currentTempNum = document.querySelector('#temp-num');
  if (currentTempType.innerText === 'F') {
    currentTempNum = (Number(currentTempNum) - 32) * (5 / 9);
    currentTempType.innerText = 'C';
    console.log(currentTemp.innerText);
  } else if (currentTempType.innerText === 'C') {
    currentTempNum = Number(currentTempNum) * (9 / 5) + 32;
    currentTempType.innerText = 'F';
  }
};

const updateCity = () => {
  const locationInput = document.querySelector('.location').value;
  const city = document.querySelector('#city-name');
  city.innerText = locationInput;
};

const currentTemp = document.querySelector('#temp-num');
currentTemp.innerText = state.temp;

const registerEventHandlers = () => {
  const decrTempBtn = document.querySelector('#decrement');
  decrTempBtn.addEventListener('click', decreaseTemp);

  const incrTempBtn = document.querySelector('#increment');
  incrTempBtn.addEventListener('click', increaseTemp);

  const tempButton = document.querySelector('#temp-info');
  tempButton.addEventListener('click', convertTemp);

  const cityInput = document.querySelector('.location');
  cityInput.addEventListener('input', updateCity);
};

window.addEventListener('load', tempChangeUpdateUI);
document.addEventListener('DOMContentLoaded', registerEventHandlers);
