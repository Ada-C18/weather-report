// import axios from 'axios';
'use strict';

const state = {
  clickCount: 50, // # of clicks
};

const plusClickCount = () => {
  const plusContainer = document.getElementById('Temperature');
  state.clickCount += 1;
  plusContainer.textContent = state.clickCount;
  changeColor();
  changeLandscape();
};

const minusClickCount = () => {
  const minusContainer = document.getElementById('Temperature');
  state.clickCount -= 1;
  minusContainer.textContent = state.clickCount;
  changeColor();
  changeLandscape();
};
//making text color different
const changeColor = () => {
  const tempColor = document.querySelector('#Temperature');
  const newLandscape = document.querySelector('#landscape');

  if (state.clickCount < 49) {
    tempColor.style.color = 'teal';
  } else if (state.clickCount >= 50 && state.clickCount < 59) {
    tempColor.style.color = 'green';
  } else if (state.clickCount >= 60 && state.clickCount < 69) {
    tempColor.style.color = 'yellow';
  } else if (state.clickCount >= 70 && state.clickCount < 79) {
    tempColor.style.color = 'orange';
  } else if (state.clickCount >= 80) {
    tempColor.style.color = 'red';
  }
};
// change landscape
const changeLandscape = () => {
  // Create a new image and set its attribute
  const newLS = document.createElement('img');
  const newLandscape = document.querySelector('#landscape');

  if (state.clickCount < 59) {
    newLS.src = `assets/cold.jpeg`;
  } else if (state.clickCount >= 60 && state.clickCount < 69) {
    newLS.src = `assets/cool.jpeg`;
  } else if (state.clickCount >= 70 && state.clickCount < 79) {
    newLS.src = `assets/warm.jpeg`;
  } else if (state.clickCount >= 80) {
    newLS.src = `assets/hot.jpeg`;
  }
  newLandscape.append(newLS);
};
//wave 3
const input = document.querySelector('input');
const log = document.getElementById('values');

input.addEventListener('input', updateValue);

function updateValue(e) {
  log.textContent = e.target.value;
}
//wave 4 axios call
const findLocationWeather = (query) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        format: 'json',
        q: query,
      },
    })
    .then((response) => {
      let latitude = response.data[0].lat;
      let longitude = response.data[0].lon;
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            format: 'json',
            lat: latitude,
            lon: longitude,
          },
        })
        .then((response) => {
          console.log('success in findWeather!', response.data);
          state.clickCount = Math.floor(
            (Number(response.data.main.temp) - 273.15) * 1.8 + 32
          );
        })
        .catch((error) => {
          console.log('error in findweather!', error);
        });
    })
    .catch((error) => {
      console.log('error!', error);
    });
};

const realTimeClick = () => {
  let query = input.value;
  findLocationWeather(query);
  const tempContainer = document.getElementById('Temperature');
  tempContainer.textContent = state.clickCount;
};

const resetCity = () => {
  input.value = '';
  document.getElementById('values')='';
};

const registerEventHandlers = () => {
  const hotterButton = document.getElementById('plusButton');
  hotterButton.addEventListener('click', plusClickCount);
  const coolerButton = document.getElementById('minusButton');
  coolerButton.addEventListener('click', minusClickCount);
  let realTimeButton = document.getElementById('realTimeButton');
  realTimeButton.addEventListener('click', realTimeClick);
  const reset = document.getElementById('resetButton');
  reset.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
