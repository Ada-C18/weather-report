'use strict';
const state = {
    increaseTemp: null,
    currentTemp: 60
};

const loadsControls = () => {
    state.increaseTemp = document.getElementById("increaseTemp");
};
const increaseTempNum = () => {
    state.increaseTemp.addEventListener("click", (event) => {
        ++state.currentTemp;
        state.currentTemp.textContent = state.currentTemp;
    })
};