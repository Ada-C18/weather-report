const URL = 'http://127.0.0.1:5000';

const state = {
  city: 'Los Angeles',
  temp: 75,
  lat: 34.0536909,
  lon: -118.242766
};


const showTemp = () => {
  const tempValue  = document.querySelector('#tempValue');
  tempValue.textContent = `${state.temp} °F`;
  colorReaction();
}
const increaseTemp = () => {
  const tempValue  = document.querySelector('#tempValue');
  state.temp += 1;
  tempValue.textContent = `${state.temp} °F`;
  colorReaction();
};

const decreaseTemp = () => {
  const tempValue  = document.querySelector('#tempValue');
  state.temp -= 1;
  tempValue.textContent = `${state.temp} °F`;
  colorReaction();
};

const colorReaction = () => {
  const tempColor = document.querySelector('#tempValue')
  const landscape = document.querySelector('#landscape')

  if (state.temp >= 80) {
    tempColor.style.color = 'red';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🍳';
  } else if (state.temp >= 70 && state.temp <= 79) {
    tempColor.style.color = 'orange';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿 _☘️🌱 _🌻🌷 ';
  } else if (state.temp >= 60 && state.temp <= 69) {
    tempColor.style.color = 'yellow';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp >= 50 && state.temp <= 59) {
    tempColor.style.color = "green";
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempColor.style.color = 'teal';
    landscape.textContent = '⛄️⛄️🌲⛄️⛄️⛄️🌲⛄️⛄️🌲⛄️⛄️⛄️';
  }
};

const changeCityName = () => {
  const inputName = document.getElementById('cityNameInput').value;
  const headerCityName = document.getElementById('headerCityName');
  state.city = inputName;
  headerCityName.textContent = state.city;

};

const resetCityName = () => {
  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.value = 'Los Angeles';
  changeCityName();
};
const convertKelvinToFahrenheit = (temp) => {
  return Math.round((temp - 273.15) * (9 / 5) + 32);
};

const findLatAndLong = async () => {
  await axios .get(`${URL}/location`, {
      params: { 
        q: state.city,
      },
    })
    .then((response) => {
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      getWeather();
    })
    .catch((error) => {
      console.log('Error finding the latitude and longitude:', error.response);
    });
};

const getWeather = async () => {
  await axios .get(`${URL}/weather`, {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      const weather = response.data;
      state.temp = convertKelvinToFahrenheit(weather.main.temp);
      colorReaction();
      const tempValue  = document.querySelector('#tempValue');
      tempValue.textContent = `${state.temp} °F`;
    })
    .catch((error) => {
      console.log('Error getting the weather:', error);
    });
};

const updateSky = () => {
  const skyContainer = document.getElementById('sky');
  const choiceSky = document.getElementById('skySelect').value;
  let skyDisplay = 'Cloudy';
  if (choiceSky === 'Cloudy') {
    skyContainer.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    skyDisplay = 'cloudy';
   } else if (choiceSky === 'Snowy') {
    skyContainer.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
      skyDisplay = 'snowy';
   } else if (choiceSky === 'Rainy') {
    skyContainer.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
      skyDisplay = 'rainy';
  } else if (choiceSky === 'Sunny') {
    skyContainer.textContent = '☁️     ☁️   ☁️ ☀️ ☁️  ☁️';
    skyDisplay = 'sunny';
  } 
  const gardenContent = document.getElementById('gardenContent');
  gardenContent.classList = `garden__content ${skyDisplay}`;
};



const registerEventHandlers = () => {
  showTemp();
  const currentTempButton = document.getElementById('tempReset');
  currentTempButton.addEventListener('click', findLatAndLong);
  const increaseTempControl = document.getElementById('increaseTempControl');
  increaseTempControl.addEventListener('click', increaseTemp);

  const decreaseTempControl = document.getElementById('decreaseTempControl');
  decreaseTempControl.addEventListener('click', decreaseTemp);

  updateSky();
  const skySelect = document.getElementById('skySelect');
  skySelect.addEventListener('change', updateSky);

  changeCityName();
  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.addEventListener('input', changeCityName);

  const cityNameResetBtn = document.getElementById('cityNameReset');
  cityNameResetBtn.addEventListener('click', resetCityName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
