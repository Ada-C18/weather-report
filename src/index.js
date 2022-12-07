"use strict";

const state = {
    temperature: 87,
    tempeColor: 'red',
};

const addTemperatureButton = document.getElementById("upButton");
const decreaseTemperatureButton = document.getElementById("downButton");


// const textColorAndLandscape = (temperatureDisplay) => {
//     if (state.temperature >= 80) {
//         about = temperatureDisplay.innerHTML;
//         about.style.color = 'blue';
//     }
// }

const addTemperature = () => {   
    const temperatureDisplay = document.getElementById("temperatureNumber");
    state.temperature += 1;
    temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
    if (state.temperature >= 80) {
        about = temperatureDisplay.innerHTML;
        about.style.tempColor = 'blue';
    }
}

const decreaseTemperature = () => {  
    const temperatureDisplay = document.getElementById("temperatureNumber");
    state.temperature -= 1;
    temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
}

//group
const allEventHandlers = () => {
    addTemperatureButton.addEventListener('click', addTemperature);
    decreaseTemperatureButton.addEventListener('click', decreaseTemperature);
}


document.addEventListener('DOMContentLoaded', allEventHandlers);