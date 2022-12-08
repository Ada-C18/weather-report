const state = {
  currentTemp: 79,
};

// temperature
const increaseTemp = () => {
  state.currentTemp += 1;
  const tempContainer = document.querySelector('#currentTemp');
  tempContainer.textContent = `${state.currentTemp}`;
};
const decreaseTemp = () => {
  state.currentTemp -= 1;
  const tempContainer = document.querySelector('#currentTemp');
  tempContainer.textContent = `${state.currentTemp}`;
};
const changeTempColor = () => {
  const landscapeContainer = document.querySelector('#landscapeSection');
  const oldLandscape = document.getElementById('view');
  const newLandscape = document.createElement('span');
  newLandscape.setAttribute('id', 'view');
  const box = document.getElementById('currentTemp');
  if (state.currentTemp >= 80) {
    box.style.color = 'red';
    newLandscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.currentTemp >= 70 && state.currentTemp <= 79) {
    box.style.color = 'orange';
    newLandscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.currentTemp >= 60 && state.currentTemp <= 69) {
    box.style.color = 'yellow';
    newLandscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.currentTemp >= 50 && state.currentTemp <= 59) {
    box.style.color = 'green';
    newLandscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    box.style.color = 'teal';
    newLandscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
  landscapeContainer.replaceChild(newLandscape, oldLandscape);
};

const registerEventHandlers = () => {
  const up = document.querySelector('#up');
  const down = document.querySelector('#down');
  up.addEventListener('click', increaseTemp);
  down.addEventListener('click', decreaseTemp);
  up.addEventListener('click', changeTempColor);
  down.addEventListener('click', changeTempColor);
  const input = document.querySelector('#cityName');
  input.addEventListener('keyup', updateValue);
  
};

function updateValue(e) {
  const log = document.getElementById('cityNameShown');
  log.textContent = e.target.value;
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);
