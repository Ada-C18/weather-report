"use strict";

//to keep track of and to be able to modify current state
const state = {
    city: 'SanFrancisco',
    temp: 60
}

//functions to increase and decrease the temp
const increaseTemp = () => {
    state.temp += 1;
    changeTempColorAndLandscape()
  }
const decreaseTemp = () => {
    state.temp -= 1;
    changeTempColorAndLandscape()
  }

//function to change the landscape and temperature value color
const changeTempColorAndLandscape = () => {
    let temperature_value = state.temp;
    let temperature_color = 'yellow';
    let landscape =	"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"

    if (temperature_value > 80) {
        landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
        temperature_color = 'red'
    } else if (temperature_value >= 70) {
        landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
        temperature_color = 'orange'
    } else if (temperature_value >= 60) {
        landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        temperature_color = 'yellow'
    } else if (temperature_value >= 50) {
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        temperature_color = 'green'
    } else {
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        temperature_color = 'teal'
    }

    // First, get element we want to alter
    // Next, set the textcontent (the string that represents the image) of that element
    const currentLandscape = document.getElementById('landscape_image');
    currentLandscape.textContent = landscape;
    // First, get element we want to alter
    // Change the classname according to the color of the range
    // Next, set the textcontent (the value literal) of that element, to be the value of the integer in current state casted to a string
    const tempValue = document.getElementById('temperature-value');
    tempValue.className = temperature_color;
    tempValue.textContent = String(state.temp);
}

const updateCityName = ()=>{
  const chosenCityInputName = document.getElementById('city_name_input').value;
  const titleCityName = document.getElementById('city');
  state.city = chosenCityInputName;
  titleCityName.textContent = state.city;
};

const resetCityName = ()=>{
  const defaultNameInput = document.getElementById('city_name_input');
  defaultNameInput.value='Name a City';
  updateCityName(); //callback function...able to use state from this function
};

//register event handlers
const registerEventHandlers = () => {

    const increaseTempValue = document.getElementById('up-button');
    increaseTempValue.addEventListener('click', increaseTemp);

    const decreaseTempValue = document.getElementById('down-button');
    decreaseTempValue.addEventListener('click', decreaseTemp);

    const cityNameInput = document.getElementById('city_name_input');
    cityNameInput.addEventListener('input', updateCityName);

    const changeCityNamebtn = document.getElementById('city_name_reset');
    changeCityNamebtn.addEventListener('click', resetCityName);
}


// wait for DOM to load before the events
document.addEventListener('DOMContentLoaded', registerEventHandlers);
