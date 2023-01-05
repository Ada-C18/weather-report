console.log('We made it into javascript!');
// LOCATION

const updateCity = () => {
  let inputCity = document.getElementById('cityName').value;
  let showCity = document.getElementById('setCity');
  showCity.innerHTML = inputCity;
};

const resetCity = () => {
  let cityInput = document.getElementById('cityName');
  cityInput.value = 'Atlanta';
  updateCity();
};

// CONDITIONS

let selectConditions = document.querySelectorAll('input[type="radio"]');

let condResult = document.getElementById('cond_result');
condResult.innerHTML = '✨';

const updateCondition = () => {
  let selected = document.querySelector(
    "input[name='Conditions']:checked"
  ).value;
  condResult.innerHTML = selected;
};

// TEMP DEPENDANTS

let defaultTemp = 65;
let currentTemp = defaultTemp;

const HOW_YA_FEELIN = ['🥶', '😮‍💨', '😄', '😎', '😅', '🥵'];
const HILLS_ARE_ALIVE = ['🧊', '🌲', '🌷', '🌻', '🌴', '🔥'];
const REPO_RAINBOW = [
  '#993BDB',
  '#2B52FF',
  '#0BD769',
  '#FFE146',
  '#FF7912',
  '#FF0000',
];

let showField = document.getElementById('temp_field');
let showYou = document.getElementById('you_are_here');

const updateTempies = (adjustedTemp) => {
  let tempSetting = 0;

  if (adjustedTemp > 99) {
    tempSetting = 5;
  } else if (adjustedTemp > 79) {
    tempSetting = 4;
  } else if (adjustedTemp > 65) {
    tempSetting = 3;
  } else if (adjustedTemp > 39) {
    tempSetting = 2;
  } else if (adjustedTemp > 14) {
    tempSetting = 1;
  }

  showField.innerHTML = HILLS_ARE_ALIVE[tempSetting];
  showYou.innerHTML = HOW_YA_FEELIN[tempSetting];
  document.getElementById('temp_result').style.color =
    REPO_RAINBOW[tempSetting];
};

// TEMPERATURE

let shownTemp = document.getElementById('temp_result');

shownTemp.innerHTML = currentTemp;

const handleAdd = () => {
  currentTemp++;
  shownTemp.innerHTML = currentTemp;

  updateTempies(currentTemp);
};

const handleSub = () => {
  currentTemp--;
  shownTemp.innerHTML = currentTemp;

  updateTempies(currentTemp);
};

const registerEventHandlers = () => {
  updateTempies(currentTemp);

  const addTemp = document.getElementById('uppie');
  addTemp.addEventListener('click', handleAdd);

  const subTemp = document.getElementById('downie');
  subTemp.addEventListener('click', handleSub);

  updateCity();
  const setCityInput = document.getElementById('cityName');
  setCityInput.addEventListener('input', updateCity);

  const resetBtn = document.getElementById('city_reset');
  resetBtn.addEventListener('click', resetCity);

  updateCondition();
  selectConditions.forEach((condition) => {
    condition.addEventListener('change', updateCondition);
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
