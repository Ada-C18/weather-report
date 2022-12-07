"use strict";
// Leave this commented out:
// const { default: axios } = require("axios");

axios


const state = {
  temperature: 75,
  landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'
};

// Wave 02: Temperature Ranges Change Text Color and Landscape
const increaseTemp = () => {
  state.temperature += 1;
  const temp = document.getElementById("temp");
  temp.textContent = `${state.temperature}°F`;
  changeColorAndLandscape();
}

const decreaseTemp = () => {
  state.temperature -= 1;
  const temp = document.getElementById("temp");
  temp.textContent = `${state.temperature}°F`;
  changeColorAndLandscape();
}

const changeColorAndLandscape = () => {
  // selects HTML element with id="temp"
  const tempColor = document.getElementById("temp");
  // selects HTML element with id="landscape"
  const landscapeUpdate = document.getElementById("landscape");
  if (state.temperature >= 80){
    console.log("higher than 80")
    tempColor.className = 'temp_red';
    landscapeUpdate.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
  }else if(70 <= state.temperature && state.temperature < 80){
    tempColor.className = 'temp_orange';
    landscapeUpdate.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
  }else if (60 <= state.temperature && state.temperature < 70){
    console.log("between 60 and 70")
    tempColor.className = 'temp_yellow';
    landscapeUpdate.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
  }else if (50 <= state.temperature && state.temperature < 60){
    console.log("between 50 and 60")
    tempColor.className = 'temp_green';
    landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
  }else if (40 <= state.temperature && state.temperature < 50){
    tempColor.className = 'temp_teal';
    landscapeUpdate.textContent = "🌲☃️⛄️🌲⛄️❄️🌲❄️🌲☃️⛄️❄️🌲"
  }else if (state.temperature < 40){
  tempColor.className = 'temp_aqua';
  landscapeUpdate.textContent = "🧊🧊⛄️🌬️⛄️❄️☃️❄️🌬️🧊⛄️❄️☃️"
  }
}

const registerEventHandlers = () => {
  const incButton = document.querySelector("#increaseButton");
  incButton.addEventListener("click", increaseTemp);

  const decButton = document.querySelector("#decreaseButton");
  decButton.addEventListener("click", decreaseTemp);
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);
