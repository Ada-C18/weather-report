let state = {
    startingTemp : 60,
    // landscapeIcons : 🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃,
};

// let state = 60;

// increase temoerature 
const updateTemperature = state => {
// const increaseTemperature = () => {
  const temperatureContainer = document.getElementById("startingTemp");
  temperatureContainer.textContent = state.startingTemp;
};

const increaseTemperature = () => {
  state.startingTemp += 1;
  updateTemperature(state);
  updateColor();
  updateLandscape();
};

const decreaseTemperature = () => {
  state.startingTemp -= 1;
  updateTemperature(state);
  updateColor();
  updateLandscape();
};

const updateColor = () => {

    if (state.startingTemp >= 80) {
        document.getElementById('startingTemp').style.color = 'red';
    } else if (state.startingTemp >= 70) {
        document.getElementById('startingTemp').style.color = 'orange';
    } else if (state.startingTemp >= 60) {
        document.getElementById('startingTemp').style.color = 'yellow';
    }  else if (state.startingTemp >= 50) {
        document.getElementById('startingTemp').style.color = 'green';
    } else if (state.startingTemp < 50) {
        document.getElementById('startingTemp').style.color = 'teal';
    }
};

const updateLandscape = () => {

    if (state.startingTemp >= 80) {
        document.getElementById('landscapeIcons').textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (state.startingTemp >= 70) {
        document.getElementById('landscapeIcons').textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (state.startingTemp >= 60) {
        document.getElementById('landscapeIcons').textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    }  else if (state.startingTemp < 60) {
        document.getElementById('landscapeIcons').textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } 
};

const updateSky = () => {

    const selectSky = document.getElementById('skyChoice')

    if (selectSky.value === 'rainy') {
        document.getElementById('skyIcons').textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧';
    } else if (selectSky.value === 'sunny') {
        document.getElementById('skyIcons').textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    }  else if (selectSky.value === 'cloudy') {
        document.getElementById('skyIcons').textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    }  else if (selectSky.value === 'snowy') {
        document.getElementById('skyIcons').textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    } 
};

const updateCity = () => {
    const inputCityName = document.getElementById("inputCity");
    const cityNameInHeader = document.getElementById("cityNameHeader");
    cityNameInHeader.textContent = inputCityName.value;

};

const registerEventHandlers = () => {
  const increaseTemperatureButton = document.getElementById('increaseButton');
  increaseTemperatureButton.addEventListener("click", increaseTemperature);

  const decreaseTemperatureButton = document.getElementById('decreaseButton');
  decreaseTemperatureButton.addEventListener("click", decreaseTemperature);

  const selectElement = document.getElementById('skyChoice');
  selectElement.addEventListener('change',updateSky);

  const userInputCity = document.getElementById('inputCity');
  userInputCity.addEventListener('input', updateCity);


};

document.addEventListener("DOMContentLoaded", registerEventHandlers);






