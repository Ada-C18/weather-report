'use strict';

const state = {
    tempValue: 62,
    tempFontColor: "goldenrod",

};

const tempValue = document.getElementById("tempValue");
tempValue.textContent = `${state.tempValue}° F`;
tempValue.style.color = state.tempFontColor;

// Functions to increase or decrease temperature
const increaseTemp = () => {
    state.tempValue += 1;
    tempValue.textContent = `${state.tempValue}° F`;
    changeTempFontColor();
};

const decreaseTemp = () => {
    state.tempValue -= 1;
    tempValue.textContent = `${state.tempValue}° F`;
    changeTempFontColor();
};
// Function to determine color of the temperature font
const changeTempFontColor = () =>   {
    if (state.tempValue >= 80) {
        state.tempFontColor = "red";
        tempValue.style.color = state.tempFontColor;
    } else if (state.tempValue >= 70 & state.tempValue < 80)  {
        state.tempFontColor = "rgba(246, 94, 7, 0.95)";
        tempValue.style.color = state.tempFontColor;
    } else if (state.tempValue >= 60 & state.tempValue < 70) {
        state.tempFontColor = "rgb(218, 165, 32)";
        tempValue.style.color = state.tempFontColor;
    } else if (state.tempValue >= 50 & state.tempValue < 60) {
        state.tempFontColor = "rgb(15, 102, 15)";
        tempValue.style.color = state.tempFontColor;
    } else if (state.tempValue >= 40 & state.tempValue < 50) {
        state.tempFontColor = "blue";
        tempValue.style.color = state.tempFontColor;
    } else if (state.tempValue < 40) {
        state.tempFontColor = "lightblue";
        tempValue.style.color = state.tempFontColor;
    }
};

// Registering Event Handlers
const registerEventHandlers = () => {
    const upButton = document.getElementById("increaseTempControl");
    upButton.addEventListener("click", increaseTemp);

    const downButton = document.getElementById("decreaseTempControl");
    downButton.addEventListener("click", decreaseTemp);
};
document.addEventListener("DOMContentLoaded", registerEventHandlers);

