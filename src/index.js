'use strict';

const state = {
  tempCount: 49,
  city: 'Seattle',
};

const convertKelvinToFarenheit = (kelvinTemp) => {
  return Math.floor((kelvinTemp - 273.15) * (9 / 5) + 32);
};

const changeTempColor = () => {
  let temp = state.tempCount;
  if (temp <= 49) {
    document.getElementById('tempCounter').style.color = 'teal';
  } else if (temp <= 59) {
    document.getElementById('tempCounter').style.color = 'green';
  } else if (temp <= 69) {
    document.getElementById('tempCounter').style.color = 'yellow';
  } else if (temp <= 79) {
    document.getElementById('tempCounter').style.color = 'orange';
  } else {
    document.getElementById('tempCounter').style.color = 'red';
  }
};

const changeBackground = () => {
  let temp = state.tempCount;
  document.body.style.backgroundSize = "100% 1000px";
  if (temp <= 59) {
    document.body.style.backgroundImage = "url('./assets/59_or_below.jpeg')";
  } else if (temp <= 69)
  {
    document.body.style.backgroundImage = "url('./assets/69_or_below.jpeg')";
  } else if (temp <= 79) {
    document.body.style.backgroundImage = "url('./assets/79_or_below.jpeg')";
  } else {
    document.body.style.backgroundImage = "url('./assets/80_and_above.png')";
  }
};

const addDegree = () => {
  state.tempCount += 1;
  const tempCounter = document.querySelector('#tempCounter');
  tempCounter.textContent = `${state.tempCount} \u00B0`;
  changeTempColor();
  changeBackground();
  console.log(state.tempCount);
};
const removeDegree = () => {
  state.tempCount -= 1;
  const tempCounter = document.querySelector('#tempCounter');
  tempCounter.textContent = `${state.tempCount} \u00B0`;
  changeTempColor();
  changeBackground();
};

const updateCity = () => {
  state.city = document.querySelector('#city').value;
  const cityDisplay = document.querySelector('#cityDisplay');
  cityDisplay.textContent = `for the lovely city of ${state.city}`;
};

const getLocationInfo = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      state.tempCount = convertKelvinToFarenheit(response.data['main']['temp']);
      const tempCounter = document.querySelector('#tempCounter');
      tempCounter.textContent = `${state.tempCount} \u00B0`;
      changeTempColor();
      changeBackground();
    })
    .catch((error) => {
      console.log('error in weather call!', error.response.data);
    });
};

const tempByLocation = () => {
  const location = state.city;

  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: location,
        format: 'json',
      },
    })
    .then((response) => {
      const latitude = response.data[0].lat;
      const longitude = response.data[0].lon;
      getLocationInfo(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in location call', error.response.data);
    });
};

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', addDegree);

  const decreaseTempButton = document.querySelector('#decreaseTempButton');
  decreaseTempButton.addEventListener('click', removeDegree);

  const submitCityButton = document.querySelector('#submit');
  submitCityButton.addEventListener('click', updateCity);

  const realTempButton = document.querySelector('#realTemp');
  realTempButton.addEventListener('click', tempByLocation);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
