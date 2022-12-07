'use strict';

const state = {
  temperature: 79,
  //tempColor: 'red', we need to make this text bigger
};

document.getElementById('temperatureNumber').style.color = 'black';

const addTemperatureButton = document.getElementById('upButton');
const decreaseTemperatureButton = document.getElementById('downButton');
const temperatureDisplay = document.getElementById('temperatureNumber');
const resetButton = document.getElementById('reset');
// console.log(resetButton)
const cityName = document.getElementById('cityName') ;
const city = document.getElementById('city');
  
cityName.addEventListener('input', display);

function display(e){
  console.log(e);
  city.textContent = e.target.value ;
  
}

function resetInput() {
  console.log('Hello');
  cityName.value="";
  city.textContent="";
  // cityName.reset();
  
}

resetButton.addEventListener('click', resetInput);



const textColorAndLandscape = () => {
    const landscapeDisplay = document.getElementById("landscape"); //? is this the right position?

  if (state.temperature >= 80) {
    temperatureDisplay.style.color = 'red';
    landscapeDisplay.innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temperature >= 70 && state.temperature <= 79) {
    temperatureDisplay.style.color  = 'orange';
    landscapeDisplay.innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temperature >= 60 && state.temperature <= 69) {
    temperatureDisplay.style.color = 'yellow';
    landscapeDisplay.innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temperature >= 50 && state.temperature <= 59) {
    temperatureDisplay.style.color = 'green';
    landscapeDisplay.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temperature <= 49) {
    temperatureDisplay.style.color = 'teal';
    landscapeDisplay.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};



const addTemperature = () => {
  state.temperature += 1;
  temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
  textColorAndLandscape();
};

const decreaseTemperature = () => {
  
  state.temperature -= 1;
  temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
  textColorAndLandscape();
};

// group
const allEventHandlers = () => {
  addTemperatureButton.addEventListener('click', addTemperature);
  decreaseTemperatureButton.addEventListener('click', decreaseTemperature);
};

document.addEventListener('DOMContentLoaded', allEventHandlers);
