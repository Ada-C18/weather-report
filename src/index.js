const state = {
  currentTemp: 108,
};

// temperature
const changeTemp = () => {
  state.currentTemp += 1;
  const tempContainer = document.querySelector('#currentTemp');
  tempContainer.textContent = `${state.currentTemp}`;
};

const registerEventHandlers = () => {
  const up = document.querySelector('#up');
  const down = document.querySelector('#down');
  up.addEventListener('click', changeTemp);
  down.addEventListener('click', decreaseTemp);
};

// reset the city temperature
const resetCity = () => {
  const cityContainer = document.getElementById(citySection);
  cityContainer.value = 'Seattle';
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
