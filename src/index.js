'use strict';

const state = {
  temp: 65,
  city: "Seattle"
};

const changeTempColorAndGardenLandscape = () => {
  let temp = state.temp;
  let color = "yellow";
  let landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  if (temp > 80) {
    color = "red";
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp > 70) {
    color = "orange";
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp > 60) {
    color = "yellow";
    landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (temp > 50) {
    color = "green";
    landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else {
    color = "teal";
    landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  }

  const currentTemp = document.querySelector("#temp_value");
  currentTemp.textContent = state.temp
  currentTemp.className = color;
  const currentLandscape = document.querySelector("#landscape");
  currentLandscape.textContent = landscape;
};


const increaseTemp = () => {
  state.temp++;
  changeTempColorAndGardenLandscape();
};

const decreaseTemp = () => {
  state.temp--;
  changeTempColorAndGardenLandscape();
}

const changeTopCityName = () => {
  const inputCityName = document.getElementById("name").value;
  const topCityName = document.getElementById("cityname");
  state.city = inputCityName;
  topCityName.textContent = state.city;
};

const resetCityInput = () => {
  const cityNameInput = document.getElementById("name");
  cityNameInput.value = "Seattle";
  changeTopCityName();
};


const registerEventHandlers = (event) => {
  changeTempColorAndGardenLandscape();

  const increaseButton = document.querySelector("#increase_temp");
  increaseButton.addEventListener('click', increaseTemp);

  const decreaseButton = document.querySelector('#decrease_temp');
  decreaseButton.addEventListener('click', decreaseTemp);

  changeTopCityName();
  const changeCityNameInHeader = document.querySelector('#name');
  changeCityNameInHeader.addEventListener('input', changeTopCityName);

  const resetCityNameBackToSeattle = document.getElementById('reset_button');
  resetCityNameBackToSeattle.addEventListener('click', resetCityInput);
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);