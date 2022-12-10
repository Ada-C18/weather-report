'use strict';

// const axios = require('axios');
const state = {
  city: '',
};

function incrementButton() {
  const element = document.getElementById('counter');
  let value = element.innerHTML;

  value++;

  temperatureColor(value);
  landscapeIcons(value);

  document.getElementById('counter').innerHTML = value;
}

function decreaseButton() {
  const element = document.getElementById('counter');
  let value = element.innerHTML;

  value--;

  temperatureColor(value);
  landscapeIcons(value);

  document.getElementById('counter').innerHTML = value;
}

function temperatureColor(temp) {
  let element = document.getElementById('counter');
  if (temp >= 80) {
    element.className = 'red';
  } else if (temp >= 70 && temp <= 79) {
    element.className = 'orange';
  } else if (temp >= 60 && temp <= 69) {
    element.className = 'yellow';
  } else if (temp >= 50 && temp <= 59) {
    element.className = 'green';
  } else if (temp <= 49) {
    element.className = 'teal';
  }
}

function landscapeIcons(temp) {
  let emoji = document.getElementById('emojis');
  if (temp >= 80) {
    emoji.innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70 && temp <= 79) {
    emoji.innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60 && temp <= 69) {
    emoji.innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp <= 59) {
    emoji.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
}

function skySelector() {
  let dropdown = document.getElementById('dropdown');
  if (sunny) {
    dropdown.innerText = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (cloudy) {
    dropdown.innerText = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (rainy) {
    dropdown.innerText = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (snowy) {
    dropdown.innerText = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
}

const cityNameInput = (e) => {
  const log = document.getElementById('City-Name-Top');
  state.city = document.querySelector('#city-input').value;
  log.textContent = state.city;
  console.log(e.data);
};

const getRealtimeTemperature = (e) => {
  console.log(getRealtimeTemperature);

  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      console.log(response);
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: response.data[0].lat,
            lon: response.data[0].lon,
            units: 'imperial',
          },
        })
        .then((response) => {
          let location_temp = response.data.main.temp;
          let temperature_box = document.getElementById('counter');
          temperature_box.textContent = location_temp;
          console.log('Updated temperature' + temperature_box);
          landscapeIcons(location_temp);
        })
        .catch((error) => {
          console.log('error!' + error);
        });
    })
    .catch(() => {
      console.log('error!');
    });
};

const registerEventHandlers = () => {
  const cityInput = document.querySelector('#city-input');
  cityInput.addEventListener('input', cityNameInput);

  const incButton = document.querySelector('#inc');
  incButton.addEventListener('click', incrementButton);

  const decButton = document.querySelector('#dec');
  decButton.addEventListener('click', decreaseButton);

  const liveButton = document.querySelector('#Get-Realtime-Temperature');
  liveButton.addEventListener('click', getRealtimeTemperature);

  const skyDropdown = document.querySelector('#dropdown');
  skyDropdown.addEventListener('onchange', skySelector);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
