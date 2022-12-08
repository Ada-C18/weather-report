'use strict';

const state = {
  temperature: 60,
  cityNameValue: 'seattle',
};

// selecting HTML Elements
const addTemperatureButton = document.getElementById('upButton');
const decreaseTemperatureButton = document.getElementById('downButton');
const temperatureDisplay = document.getElementById('temperatureNumber');
const resetButton = document.getElementById('reset');
const cityName = document.getElementById('cityName');
const city = document.getElementById('city');
const getTempButton = document.getElementById('getTemperature');
let skyView = document.querySelector('.skyView');

// Wave 3 - function that display cityName immediately
function display(e) {
  //console.log(e); input event
  city.textContent = e.target.value;
  state.cityNameValue = e.target.value;
}
// Wave 6 - function that reset the input
function resetInput() {
  cityName.value = ''; //input
  city.textContent = ''; //span
}

//Wave 2 - changing text color and landscape
const textColorAndLandscape = () => {
  const landscapeDisplay = document.getElementById('landscape'); //? is this the right position?
  if (state.temperature >= 80) {
    temperatureDisplay.style.color = 'red';
    landscapeDisplay.innerText = '🌵🌵🐍🐍🦂🦂🌵🌵🐍🐍🐍🏜🏜🏜🦂';
  } else if (state.temperature >= 70 && state.temperature <= 79) {
    temperatureDisplay.style.color = 'orange';
    landscapeDisplay.innerText = '🌸🌿🌼🌼🌷🌷🌻🌿🌿☘️🌱🌱🌻🌷🌷';
  } else if (state.temperature >= 60 && state.temperature <= 69) {
    temperatureDisplay.style.color = 'purple';
    landscapeDisplay.innerText = '🌾🌾🍃🍃🪨🪨🛤🛤🛤🌾🌾🌾🌾🍃🍃';
  } else if (state.temperature >= 50 && state.temperature <= 59) {
    temperatureDisplay.style.color = 'green';
    landscapeDisplay.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲⛄️🍂';
  } else if (state.temperature <= 49) {
    temperatureDisplay.style.color = 'navy';
    landscapeDisplay.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲⛄️🍂';
  }
};

//Wave 2
const addTemperature = () => {
  state.temperature += 1;
  temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
  textColorAndLandscape();
};

const decreaseTemperature = () => {
  state.temperature -= 1;
  temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
  textColorAndLandscape();
};

//Wave 4 - API call
const findTemperature = async () => {
  let latitude, longitude;

  await axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.cityNameValue,
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
    })
    .catch((error) => {
      console.log('error in finding location!');
    });

  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      const kelvinTemperature = response.data.main.temp;
      const fahrenheitTemperature = Math.round(
        (kelvinTemperature - 273.15) * 1.8 + 32
      );
      state.temperature = fahrenheitTemperature;
      temperatureDisplay.innerText = `${state.temperature + '\u00B0F'}`;
      textColorAndLandscape();
    })
    .catch((error) => {
      console.log('error in finding temperature!', error);
    });
};

// Wave 5 - display the Sky according to dropdown list
const skyDisplay = (event) => {
  console.log(event);
  let skyPic = document.getElementById('skyPictures');
  if (skyView.value === 'Sunny') {
    // 1) changed from = to ===; 2) update .value;
    skyPic.innerText = '🌞🌞🌞🌞🌞🌞🌞🌞🌞🌞🌞🌞';
    console.log('text1', skyPic);
  } else if (skyView.value === 'Cloudy') {
    skyPic.innerText = '🌥️⛅️🌥️⛅️🌥️⛅️🌥️⛅️🌥️⛅️🌥️⛅️';

    console.log('text2', skyPic);
  } else if (skyView.value === 'Rainy') {
    skyPic.innerText = '🌦️🌧️⛈️🌩️🌦️🌧️⛈️🌩️🌦️🌧️⛈️🌩️';
  } else if (skyView.value === 'Snowy') {
    skyPic.innerText = '🌨️⛄️🌨️⛄️🌨️⛄️🌨️⛄️🌨️⛄️🌨️⛄️';
  }
};

// function to hold all the Event Handler
const allEventHandlers = () => {
  addTemperatureButton.addEventListener('click', addTemperature);
  decreaseTemperatureButton.addEventListener('click', decreaseTemperature);
  //skyView.onchange = skyDisplay; // 3)referring to the function, not calling the function with (); Option 1
  skyView.addEventListener('change', skyDisplay); //Option 2;
  resetButton.addEventListener('click', resetInput);
  cityName.addEventListener('input', display);
  getTempButton.addEventListener('click', findTemperature);
};

document.addEventListener('DOMContentLoaded', allEventHandlers);
