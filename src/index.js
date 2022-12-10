const state = {
  city: 'Seattle',
  lat: 47.6038321,
  long: -122.3300624,
  temp: 73,
};
const convertKtoF = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32;
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
      getWeather();
    })
    .catch((error) => {
      console.log('Error finding the latitude and longitude:', error.response);
      const tempError = document.getElementById('tempError');
      tempError.textContent = "Couldn't find temperature for this city!";
    });
};

const clearError = () => {
  const tempError = document.getElementById('tempError');
  tempError.textContent = '';
};

const getWeather = () => {
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
      clearError();
      formatTempAndGarden();
    })
    .catch((error) => {
      console.log('Error getting the weather:', error);
      const tempError = document.getElementById('tempError');
      tempError.textContent = "Couldn't find temperature for this city!";
    });
};

const updateCityName = () => {
  const inputName = document.getElementById('cityNameInput').value;
  const headerCityName = document.getElementById('headerCityName');
  state.city = inputName;
  headerCityName.textContent = state.city;
  clearError();
};

const resetCityName = () => {
  const cityNameInput = document.getElementById('cityNameInput');
  cityNameInput.value = 'Seattle';
  clearError();
  updateCityName();
};

const formatTempAndGarden = () => {
  let temp = state.temp;
  let color = 'red';
  let landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  let landscapeImg = null;
  if (temp > 80) {
    color = 'red';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    landscapeImg = 'images/veryhot.webp';
  } else if (temp > 70) {
    color = 'orange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    landscapeImg = 'images/spring.webp';
  } else if (temp > 60) {
    color = 'yellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    landscapeImg = 'images/fall.webp';
  } else if (temp > 50) {
    color = 'green';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    landscapeImg = 'images/winter.webp';
  } else {
    color = 'teal';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    landscapeImg = 'images/winter.webp';
  }

  const newLandscape = document.getElementById('landscape');
  newLandscape.textContent = landscape;
  const newLandscapeImg = document.getElementById('landscapeImg');
  newLandscapeImg.src = landscapeImg;
  const temperature = document.getElementById('tempValue');
  temperature.className = color;
  temperature.textContent = String(state.temp);
};

const increaseTemp = () => {
  state.temp += 1;
  formatTempAndGarden();
};

const decreaseTemp = () => {
  state.temp -= 1;
  formatTempAndGarden();
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

  const currentTemp = document.getElementById('currentTempButton');
  currentTemp.addEventListener('click', findLatAndLong);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
