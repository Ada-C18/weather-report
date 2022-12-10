const state = {
  city: 'Seattle',
  lat: 47.6038321,
  long: -122.3300624,
  temp: 73,
};

const updateCityName = () => {
  const inputName = document.getElementById('cityNameInput').value;
  const headerCityName = document.getElementById('headerCityName');
  state.city = inputName;
  headerCityName.textContent = state.city;
};

const resetCityName = () => {
  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.value = 'Seattle';
  updateCityName();
};

const formatTempAndGarden = () => {
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

  const newLandscape = document.getElementById('landscape');
  newLandscape.textContent = landscape;
  const temperature = document.getElementById('tempValue');
  temperature.className = color;
  temperature.textContent = String(state.temp);
};

const increaseTemp = () => {
  state.temp += 1;
  formatTempAndGarden();
};

const decreaseTemp = () => {
  state.temp -= 1;
  formatTempAndGarden();
};

const registerEventHandlers = () => {
  formatTempAndGarden();

  const increaseTempControl = document.getElementById('increaseTempControl');
  increaseTempControl.addEventListener('click', increaseTemp);

  const decreaseTempControl = document.getElementById('decreaseTempControl');
  decreaseTempControl.addEventListener('click', decreaseTemp);

  const cityNameResetBtn = document.getElementById('cityNameReset');
  cityNameResetBtn.addEventListener('click', resetCityName);

  updateCityName();
  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.addEventListener('input', updateCityName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
