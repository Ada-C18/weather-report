const state = {
  Temperature: 0,
  city: 'Seattle',
  sky: 'sunny',
  latitude: 0,
  longitude: 0,
};

const increaseTemp = (event) => {
  const tempContainer = document.querySelector('#Temperature');
  console.log('increaseTemp clicked');
  state.Temperature = Math.round(state.Temperature + 1);
  tempContainer.textContent = `${state.Temperature}`;
  tempRange();
};
// hello this is a new branch!! 

const decreaseTemp = (event) => {
  const tempContainer = document.querySelector('#Temperature');
  state.Temperature = Math.round(state.Temperature - 1);
  tempContainer.textContent = `${state.Temperature}`;
  tempRange();
};

const tempRange = () => {
  const tempContainer = document.querySelector('#Temperature');
  const landscapeContainer = document.querySelector('#landscape');
  if (state.Temperature >= 80) {
    tempContainer.style.color = 'red';
    landscapeContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.Temperature <= 79 && state.Temperature >= 70) {
    tempContainer.style.color = 'orange';
    landscapeContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.Temperature <= 69 && state.Temperature >= 60) {
    tempContainer.style.color = 'yellow';
    landscapeContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.Temperature <= 59 && state.Temperature >= 50) {
    tempContainer.style.color = 'green';
    landscapeContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.Temperature <= 49) {
    tempContainer.style.color = 'teal';
    landscapeContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const updateSky = (event) => {
  const skyContainer = document.querySelector('#skySelect');
  const skyBannerContainer = document.querySelector('#skyBanner');
  state.sky = skyContainer.value;
  if (state.sky === 'sunny') {
    skyBannerContainer.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (state.sky === 'cloudy') {
    skyBannerContainer.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (state.sky === 'rainy') {
    skyBannerContainer.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (state.sky === 'snowy') {
    skyBannerContainer.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const chooseCityName = (event) => {
  const cityName = document.querySelector('#cityName');
  const inputContainer = document.querySelector('#inputCityName');
  state.city = inputContainer.value;
  cityName.textContent = state.city;
};

const resetCityName = (event) => {
  const cityName = document.querySelector('#cityName');
  const inputContainer = document.querySelector('#inputCityName');
  state.city = 'Seattle';
  inputContainer.value = '';
  cityName.textContent = state.city;
};

const updateTemperature = (event) => {
  const tempContainer = document.querySelector('#Temperature');
  axios
    .get(`http://localhost:5000/location?q=${state.city}`)
    .then((response) => {
      state.latitude = response.data[0].lat;
      state.longitude = response.data[0].lon;
      console.log(response.data);
      axios
        .get(
          `http://localhost:5000/weather?lat=${state.latitude}&lon=${state.longitude}`
        )
        .then((response) => {
          const temperatureKelvin = response.data.main.temp;
          state.Temperature = ((temperatureKelvin - 273.15) * 9) / 5 + 32;
          tempContainer.textContent = `${Math.round(state.Temperature)}`;
          tempRange();
          console.log(response.data);
        })
        .catch((error) => {
          console.log('OpenWeather GET request error');
        });
    })
    .catch((error) => {
      console.log('LocationIQ GET request error');
    });
};

const registerEventHandlers = (event) => {
  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', increaseTemp);
  // increaseTempButton.addEventListener('click', tempRange);
  const decreaseTempButton = document.querySelector('#decreaseTempButton');
  decreaseTempButton.addEventListener('click', decreaseTemp);
  // decreaseTempButton.addEventListener('click', tempRange);
  const inputCityName = document.querySelector('#inputCityName');
  inputCityName.addEventListener('input', chooseCityName);
  const resetCityNameButton = document.querySelector('#resetCityName');
  resetCityNameButton.addEventListener('click', resetCityName);
  const updateTempButton = document.querySelector('#updateTempButton');
  updateTempButton.addEventListener('click', updateTemperature);
  const skySelect = document.querySelector('#skySelect');
  skySelect.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
