'use strict';

// Wave 2
const state = {
  temperature: 79,
  cityNameValue: 'seattle',
};

document.getElementById('temperatureNumber').style.color = 'black';

const addTemperatureButton = document.getElementById('upButton');
const decreaseTemperatureButton = document.getElementById('downButton');
const temperatureDisplay = document.getElementById('temperatureNumber');
const resetButton = document.getElementById('reset');

// Wave 3
const cityName = document.getElementById('cityName');
const city = document.getElementById('city');
cityName.addEventListener('input', display);

// Wave 2 - function that display cityName immediately
function display(e) {
  //console.log(e);
  city.textContent = e.target.value;
  state.cityNameValue = e.target.value;
}
// Wave 2 - function that reset the input
function resetInput() {
  cityName.value = ''; //input
  city.textContent = ''; //span
}

resetButton.addEventListener('click', resetInput);

const textColorAndLandscape = () => {
  const landscapeDisplay = document.getElementById('landscape'); //? is this the right position?
  if (state.temperature >= 80) {
    temperatureDisplay.style.color = 'red';
    landscapeDisplay.innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temperature >= 70 && state.temperature <= 79) {
    temperatureDisplay.style.color = 'orange';
    landscapeDisplay.innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temperature >= 60 && state.temperature <= 69) {
    temperatureDisplay.style.color = 'yellow';
    landscapeDisplay.innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temperature >= 50 && state.temperature <= 59) {
    temperatureDisplay.style.color = 'green';
    landscapeDisplay.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temperature <= 49) {
    temperatureDisplay.style.color = 'teal';
    landscapeDisplay.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

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

const allEventHandlers = () => {
  addTemperatureButton.addEventListener('click', addTemperature);
  decreaseTemperatureButton.addEventListener('click', decreaseTemperature);
};

//Wave 4

const findTemperature = async () => {
  let latitude, longitude;

  await axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.cityNameValue,
        //q: `${state.cityNameValue}`,
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
    })
    .catch((error) => {
      console.log('error in finding temperature!', error);
    });
};

const getTempButton = document.getElementById('getTemperature');
getTempButton.addEventListener('click', findTemperature); //??

// Wave 5

let skyView = document.querySelector('.skyView');

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

//skyView.onchange = skyDisplay; // 3)referring to the function, not calling the function with (); Option 1

skyView.addEventListener('change', skyDisplay); //Option 2;

document.addEventListener('DOMContentLoaded', allEventHandlers);
