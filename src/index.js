'use strict';

const increaseTemp = () => {
  state.temp += 1;
  formatTempAndGarden();
};

const decreaseTemp = () => {
  state.temp -= 1;
  formatTempAndGarden();
};

const colorAndLandscape = () => {
  let temp = state.temp;
  let color = 'red';
  let landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  if (temp > 80) {
    color = 'red';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp > 70) {
    color = 'orange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp > 60) {
    color = 'yellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp > 50) {
    color = 'green';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    color = 'teal';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }

  const newLandscape = document.getElementById('iconLandscape');
  newLandscape.textContent = landscape;
  const temperature = document.getElementById('tempValue');
  temperature.className = color;
  temperature.textContent = String(state.temp);
};
