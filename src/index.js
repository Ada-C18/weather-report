'use strict';

const state = {
    tempValue: 62,
    tempFontColor: "goldenrod",
    nameOfCity: "Atlanta",
    weatherGarden: "🌷🌷🌷🌷",
};

const tempValue = document.getElementById("tempValue");
tempValue.textContent = `${state.tempValue}° F`;
tempValue.style.color = state.tempFontColor;

const nameOfCity = document.getElementById("location-city");
nameOfCity.textContent = state.nameOfCity;

const weatherGarden = document.getElementById("weather-garden");
weatherGarden.textContent = state.weatherGarden;

// Functions to increase or decrease temperature
const increaseTemp = () => {
    state.tempValue += 1;
    tempValue.textContent = `${state.tempValue}° F`;
    changeTempFontColor();
    changeWeatherGarden();

};

const decreaseTemp = () => {
    state.tempValue -= 1;
    tempValue.textContent = `${state.tempValue}° F`;
    changeTempFontColor();
    changeWeatherGarden();
    
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
// function to change weather garden
const changeWeatherGarden = () => {
    if (state.tempValue >= 80) {
        state.weatherGarden = "🌴🌴🌴🌴";
        weatherGarden.textContent = state.weatherGarden;
    } else if (state.tempValue >= 60 & state.tempValue < 80) {
        state.weatherGarden = "🌷🌷🌷🌷";
        weatherGarden.textContent = state.weatherGarden;
    } else if (state.tempValue >= 40 & state.tempValue < 60) {
        state.weatherGarden = "🍁🍁🍁🍁";
        weatherGarden.textContent = state.weatherGarden;
    } else if (state.tempValue < 40) {
        state.weatherGarden = "🥀🥀🥀🥀";
        weatherGarden.textContent = state.weatherGarden;
    }
};

// Function to change city input
const inputCity = (userCityInput) => {
    const locationCity = document.getElementById("location-city");
    state.nameOfCity = userCityInput.target.value;
    locationCity.textContent = state.nameOfCity;
};


// Registering Event Handlers
const registerEventHandlers = () => {
    const upButton = document.getElementById("increase-temp-control");
    upButton.addEventListener("click", increaseTemp);

    const downButton = document.getElementById("decrease-temp-control");
    downButton.addEventListener("click", decreaseTemp);

    const cityInput = document.getElementById("city-content");
    cityInput.addEventListener("input", inputCity);

    
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);

