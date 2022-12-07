'use strict';
// import "./styles/index.css";
// tempUp
// - change display temperature (increase by 1 per click)
// - check current temp and if range changes, change landscape

// const upButton = document.getElementByID('temp-up');
// const downButton = document.getElementById('temp-down');

const tempUp = () => {
  let displayTemp = document.getElementById('temp');
  displayTemp.textContent = Number(displayTemp.textContent) + 1;
  tempLandscapeColorChange()
};

const tempDown = () => {
  let displayTemp = document.getElementById('temp');
  displayTemp.textContent = Number(displayTemp.textContent) - 1;
  tempLandscapeColorChange()
};

const tempLandscapeColorChange = () => {
  let temp = document.getElementById('temp')
  let displayTemp = Number(temp.textContent)
  let landscape = document.getElementById('ground-display')
  
  if (displayTemp >= 80) {
    temp.style.color = "red";
    landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
  } else if (70 <= displayTemp && displayTemp <= 79) {
    temp.style.color = "orange";
    landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
  } else if (60 <= displayTemp && displayTemp <= 69) {
    temp.style.color = "brown";
    landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
  } else if (50 <= displayTemp && displayTemp <= 59) {
    temp.style.color = "green";
    landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
  } else {
    temp.style.color = "purple";
    landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
  }
};

const changeName = () => {
  let name = document.getElementById('city-name-display')
  let newName = document.getElementById('city-name-input')
  name.textContent = newName.value
}


const registerEvents = () => {
  const upButton = document.getElementById('temp-up');
  const downButton = document.getElementById('temp-down');
  const input = document.querySelector('input')

  upButton.addEventListener('click', tempUp);
  downButton.addEventListener('click', tempDown);
  input.addEventListener('input', changeName);
};

document.addEventListener("DOMContentLoaded", registerEvents);