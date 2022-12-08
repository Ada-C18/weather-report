import { landscapeEmoji, skyEmoji } from './constants.js';

// temperature controls
const state = {
  temp: 39,
};

const increaseTemp = () => {
  state.temp += 1;
  const currentTemperature = document.getElementById('temperature');
  currentTemperature.textContent = `${state.temp}`;
  tempColorAndLandscape();
};

const decreaseTemp = () => {
  state.temp -= 1;
  const currentTemperature = document.getElementById('temperature');
  currentTemperature.textContent = `${state.temp}`;
  tempColorAndLandscape();
};

const registerEventHandlers = () => {
  //increase temp
  const increaseTempButton = document.getElementById('inc-temp');
  increaseTempButton.addEventListener('click', increaseTemp);
  //decrease temp
  const decreaseTempButton = document.getElementById('dec-temp');
  decreaseTempButton.addEventListener('click', decreaseTemp);
  //text input
  const inputBox = document.getElementById('text-field');
  inputBox.addEventListener('keyup', displayText);
  //real time temperature
  const realTimeTempButton = document.getElementById('real-time-temp');
  realTimeTempButton.addEventListener('click', getRealTimeTemp);
  const skySelector = document.getElementById('sky-selector');
  skySelector.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

//temperature decorations
const tempColorAndLandscape = () => {
  const temperature = document.getElementById('temperature');
  const landscape = document.getElementById('landscape');

  if (state.temp >= 80) {
    temperature.style.color = 'red';
    landscape.textContent = landscapeEmoji.hot;
  } else if (state.temp >= 70) {
    temperature.style.color = 'orange';
    landscape.textContent = landscapeEmoji.warm;
  } else if (state.temp >= 60) {
    temperature.style.color = 'yellow';
    landscape.textContent = landscapeEmoji.cool;
  } else if (state.temp >= 50) {
    temperature.style.color = 'green';
    landscape.textContent = landscapeEmoji.freezing;
  } else {
    temperature.style.color = 'teal';
    landscape.textContent = landscapeEmoji.freezing;
  }
};

// sky selector - drop-down for sky art
const updateSky = () => {
  const selectedSky = document.getElementById('sky-selector').value;
  const weatherEmojiContainer = document.getElementById('weather-emojis');

  if (selectedSky === 'sunny') {
    console.log('sunny selected!');
    weatherEmojiContainer.textContent = skyEmoji.sunny;
  } else if (selectedSky === 'cloudy') {
    console.log('cloudy selected!');
    weatherEmojiContainer.textContent = skyEmoji.cloudy;
  } else if (selectedSky === 'rainy') {
    console.log('rainy selected!');
    weatherEmojiContainer.textContent = skyEmoji.rainy;
  } else if (selectedSky === 'snowy') {
    console.log('snowy selected!');
    weatherEmojiContainer.textContent = skyEmoji.snowy;
  }
};

// text field input - for city name
const displayText = () => {
  const cityName = document.getElementById('city-name');
  const textField = document.getElementById('text-field');

  cityName.textContent = textField.value;
};

const getRealTimeTemp = () => {};
