const state = {
  temperature: 70,
  cityName: 'Seattle',
};

const increaseTemp = (event) => {
  const tempDisplay = document.querySelector('#temperature');
  const landScape = document.querySelector('#landscape');

  state.temperature++;
  tempDisplay.textContent = `${state.temperature}`;

  changeTemperatureColor(state.temperature, tempDisplay);
  changeLandScape(state.temperature, landScape);
};

const decreaseTemp = (event) => {
  const tempDisplay = document.querySelector('#temperature');
  const landScape = document.querySelector('#landscape');

  state.temperature--;
  tempDisplay.textContent = `${state.temperature}`;

  changeTemperatureColor(state.temperature, tempDisplay);
  changeLandScape(state.temperature, landScape);
};

const changeTemperatureColor = (temp, tempDisplay) => {
  if (temp > 80) {
    tempDisplay.style.color = 'red';
  } else if (temp > 70) {
    tempDisplay.style.color = 'orange';
  } else if (temp > 60) {
    tempDisplay.style.color = 'yellow';
  } else if (temp > 50) {
    tempDisplay.style.color = 'lightgreen';
  } else if (temp <= 49) {
    tempDisplay.style.color = 'white';
  }
};

const changeLandScape = (temp, landscape) => {
  if (temp >= 80) {
    landscape.textContent = `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`;
  } else if (temp >= 70) {
    landscape.textContent = `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;
  } else if (temp >= 60) {
    landscape.textContent = `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`;
  } else if (temp > 50) {
    landscape.textContent = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
  } else if (temp <= 49) {
    landscape.textContent = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
  }
};

const changeCityName = (event) => {
  const cityName = document.querySelector('#city-name');
  const input = document.querySelector('#city-search').value;

  state.cityName = input;
  cityName.textContent = `${state.cityName}`;
};

const registerEventHandlers = (event) => {
  console.log('registerEventHandlers called');
  const increaseButton = document.querySelector('#increase-temp');
  increaseButton.addEventListener('click', increaseTemp);

  const decreaseButton = document.querySelector('#decrease-temp');
  decreaseButton.addEventListener('click', decreaseTemp);

  const citySearchButton = document.querySelector('#change-city');
  citySearchButton.addEventListener('click', changeCityName);
};

if (document.readyState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', registerEventHandlers);
}
