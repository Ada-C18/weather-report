const state = {
  increaseButton: null,
  decreaseButton: null,
  temp: 50,
  city: 'Seattle',
};

const landscapes = {
  '80+': '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  '70-79': '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  '60-69': '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
  '59-': '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
};

const increaseTemp = (event) => {
  console.log('increaseTemp clicked');
  console.log(state.temp);
  state.temp++;
  refreshUI(state.temp);
};

const decreaseTemp = (event) => {
  state.temp--;
  refreshUI(state.temp);
};

const refreshUI = function () {
  let tempDisplay = document.getElementById('tempDisplay');
  let landscapeDisplay = document.getElementById('landscapeDisplay');

  tempDisplay.textContent = state.temp;

  if (state.temp > 79) {
    tempDisplay.style.color = 'Red';
    landscapeDisplay.textContent = landscapes['80+'];
  } else if (state.temp > 69) {
    tempDisplay.style.color = 'Orange';
    landscapeDisplay.textContent = landscapes['70-79'];
  } else if (state.temp > 59) {
    tempDisplay.style.color = 'Yellow';
    landscapeDisplay.textContent = landscapes['60-69'];
  } else if (state.temp > 49) {
    tempDisplay.style.color = 'Green';
    landscapeDisplay.textContent = landscapes['59-'];
  } else {
    tempDisplay.style.color = 'Teal';
    landscapeDisplay.textContent = landscapes['59-'];
  }
};

const updateCity = () => {};

const loadControls = () => {
  state.increaseButton = document.getElementById('increaseButton');
  state.decreaseButton = document.getElementById('decreaseButton');
};

const registerEvents = () => {
  state.increaseButton.addEventListener('click', increaseTemp);
  state.decreaseButton.addEventListener('click', decreaseTemp);
};

const onLoaded = () => {
  loadControls();
  registerEvents();
  refreshUI();
};

onLoaded();
