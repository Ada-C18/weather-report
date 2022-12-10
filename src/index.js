// WAVE 2

// const { default: axios } = require('axios');

const increaseTemp = () => {
  const increaseButton = document.getElementById('increase-temp');

  increaseButton.addEventListener('click', () => {
    const currentTemperature = document.getElementById('curr-temp');
    currentTemperature.innerHTML = parseInt(currentTemperature.innerHTML) + 1;
    tempcolor();
  });
};

const decreaseTemp = () => {
  const decreaseButton = document.getElementById('decrease-temp');

  decreaseButton.addEventListener('click', () => {
    const currentTemperature = document.getElementById('curr-temp');
    currentTemperature.innerHTML = parseInt(currentTemperature.innerHTML) - 1;
    changeTempColorAndLandscape();
  });
};

const changeTempColorAndLandscape = () => {
  const currentTemperature = document.getElementById('curr-temp');
  // Double check that how we can access background-image in grid-container class
  const gridContainer = document.querySelector('.grid-container');

  if (currentTemperature.innerHTML >= 80) {
    currentTemperature.className = 'temp-red';
    gridContainer.style.backgroundImage =
      'url(../assets/desert-nicole-herrero.jpg)';
  } else if (currentTemperature.innerHTML >= 70) {
    currentTemperature.className = 'temp-orange';
    gridContainer.style.backgroundImage =
      'url(../assets/tropical-alexis-antonio.jpg)';
  } else if (currentTemperature.innerHTML >= 55) {
    currentTemperature.className = 'temp-yellow';
    gridContainer.style.backgroundImage =
      'url(../assets/green-field-anisur-rahman.jpg)';
  } else if (currentTemperature.innerHTML >= 40) {
    currentTemperature.className = 'temp-green';
    gridContainer.style.backgroundImage =
      'url(../assets/fall-federica-galli.jpg)';
  } else if (currentTemperature.innerHTML <= 39) {
    currentTemperature.className = 'temp-teal';
    gridContainer.style.backgroundImage =
      'url(../assets/winter-christiaan-huynen.jpg)';
  }
};

// wave 3
const changeCity = () => {
  const inputCityName = document.getElementById('city-name');
  inputCityName.addEventListener('input', () => {
    const headerCityName = document.getElementById('header-city');
    headerCityName.textContent = inputCityName.value;
  });
};

//wave 4

const getLatLon = (location) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: { q: location, format: 'json' },
    })
    .then((result) => {
      const latitude = result.data[0]['lat'];
      const longitude = result.data[0]['lon'];
      // console.log(`${location} lat: ${latitude} lon: ${longitude}`);
      getWeather(latitude, longitude);
    })
    .catch((error) => {
      console.log(`Error in the getLatLon api ${error}`);
    });
};

const getWeather = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: { lat: latitude, lon: longitude, format: 'json' },
    })
    .then((result) => {
      // console.log("we're in the getWeather", result);
      const temp = result.data.main.temp;
      const tempF = convertKtoF(temp);
      // console.log(temp);
      // console.log(tempF);
      const currentTemperature = document.getElementById('curr-temp');
      currentTemperature.innerHTML = tempF;
      changeTempColorAndLandscape();
    })
    .catch((error) => {
      console.log(`Error in the getWeather api ${error}`);
    });
};

const convertKtoF = (temp) => {
  const tempF = Math.floor((temp - 273.15) * 1.8 + 32);
  return tempF;
};

const addRealtimeTempListener = () => {
  const realtimeTempButton = document.getElementById('realtime-temp-btn');
  realtimeTempButton.addEventListener('click', (event) => {
    event.preventDefault();
    const city = document.getElementById('header-city').innerText;
    
    // console.log("we are inside realtime temperature");
    console.log("this is the city", city);
    
    getLatLon(city);

  });
};

const setUp = () => {
  increaseTemp();
  decreaseTemp();
  changeCity();
  changeTempColorAndLandscape();
  addRealtimeTempListener();
};

if (document.readyState !== 'loading') {
  increaseTemp();
  decreaseTemp();
  changeCity();
  changeTempColorAndLandscape();
  addRealtimeTempListener();
} else {
  document.addEventListener('DOMContentLoaded', setUp);
}