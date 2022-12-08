// debugger;
let temp = 75;
const cityInput = document.getElementById('name');
const cityName = document.getElementById('city-name');

const updateTemp = (temp) => {
  console.log('update called');
  const tempValueContainer = document.getElementById('tempValue');
  tempValueContainer.textContent = temp;
  updateTempColor(temp);
  changeLandscape(temp);
};

const increaseTemp = () => {
  console.log('increase');
  temp += 1;
  updateTemp(temp);
};

const decreaseTemp = () => {
  temp -= 1;
  updateTemp(temp);
};

const updateTempColor = (temp) => {
  const tempValueColor = document.getElementById('tempValue');
  let color = 'cold';
  if (temp >= 80) {
    color = 'hot';
  } else if (temp >= 70) {
    color = 'warm';
  } else if (temp >= 60) {
    color = 'cozy';
  } else if (temp >= 50) {
    color = 'cool';
  }
  tempValueColor.className = color;
};

const changeLandscape = (temp) => {
  const landscape = document.getElementById('landscape');
  let ground = '🥶__🧤_🏂_🧊__🧊_';
  if (temp >= 80) {
    ground = '`"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"';
  } else if (temp >= 70) {
    ground = `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;
  } else if (temp >= 60) {
    ground = `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`;
  } else if (temp >= 50) {
    ground = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
  }
  landscape.textContent = ground;
};

const updateCity = () => {
  cityName.textContent = cityInput.value;
};

const renderAndUpdate = () => {
  console.log('render called');
  const upButton = document.getElementById('up');
  const downButton = document.getElementById('down');
  updateTemp(temp);
  upButton.addEventListener('click', increaseTemp);
  downButton.addEventListener('click', decreaseTemp);
  cityInput.addEventListener('input', updateCity);
};

if (document.readyState !== 'loading') {
  renderAndUpdate();
} else {
  document.addEventListener('DOMContentLoaded', renderAndUpdate);
}
