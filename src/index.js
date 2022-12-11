const state = {
  city: 'Neema & Pavi Land',
  lat: 47.6038321,
  long: -122.3300624,
  temp: 73,
};

const convertKtoF = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32;
};

const displayCityInfo = (cityinfo) => {
  const cityInfo = document.getElementById('cityInfo');
  cityInfo.textContent = `Current Temperature for: ${cityinfo}`;
};

const displayCityError = () => {
  const cityInfo = document.getElementById('cityInfo');
  cityInfo.textContent = "Couldn't find temperature for this city!";
};

const clearCityInfo = () => {
  const cityInfo = document.getElementById('cityInfo');
  cityInfo.textContent = '';
};

const findLatAndLong = () => {
  //let lat, long;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      console.log(response.data);
      state.lat = response.data[0].lat;
      state.long = response.data[0].lon;
      const cityinfo = response.data[0].display_name;
      getWeather(cityinfo);
    })
    .catch((error) => {
      console.log('Error finding the latitude and longitude:', error.response);
      displayCityError();
    });
};

const getWeather = (cityinfo) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.long,
      },
    })
    .then((response) => {
      const weather = response.data;
      state.temp = Math.round(convertKtoF(weather.main.temp));
      formatTempAndGarden();
      displayCityInfo(cityinfo);
    })
    .catch((error) => {
      console.log('Error getting the weather:', error);
      displayCityError();
    });
};

const updateCityName = () => {
  const inputName = document.getElementById('cityNameInput').value;
  const headerCityName = document.getElementById('headerCityName');
  state.city = inputName;
  headerCityName.textContent = state.city;
  clearCityInfo();
};

const resetCityName = () => {
  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.value = 'Seattle';
  clearCityInfo();
  updateCityName();
};

const formatTempAndGarden = () => {
  let temp = state.temp;
  let color = 'red';
  let landscapeImg = null;
  if (temp > 80) {
    color = 'red';
    landscapeImg = 'images/veryhot.webp';
  } else if (temp > 70) {
    color = 'orange';
    landscapeImg = 'images/spring.webp';
  } else if (temp > 60) {
    color = 'yellow';
    landscapeImg = 'images/fall.webp';
  } else if (temp > 50) {
    color = 'green';
    landscapeImg = 'images/winter.webp';
  } else {
    color = 'teal';
    landscapeImg = 'images/winter.webp';
  }
  const newLandscapeImg = document.getElementById('landscapeImg');
  newLandscapeImg.src = landscapeImg;
  const temperature = document.getElementById('tempValue');
  temperature.className = color;
  temperature.textContent = String(state.temp);
};

const increaseTemp = () => {
  state.temp += 1;
  formatTempAndGarden();
  clearCityInfo();
};

const decreaseTemp = () => {
  state.temp -= 1;
  formatTempAndGarden();
  clearCityInfo();
};

const changeSky = () => {
  const inputSky = document.getElementById('skySelect').value;
  const skyDisplay = document.getElementById('sky');
  let sky = '';
  if (inputSky === 'Cloudy') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (inputSky === 'Sunny') {
    sky = '☁️  ☀️ ☀️ ☀️  ☁️ ☀️ ☀️ ☁️ ☀️';
  } else if (inputSky === 'Rainy') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (inputSky === 'Snowy') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  skyDisplay.textContent = sky;
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

  const currentTempButton = document.getElementById('currentTempButton');
  currentTempButton.addEventListener('click', findLatAndLong);

  changeSky();
  const skySelector = document.getElementById('skySelect');
  skySelector.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
