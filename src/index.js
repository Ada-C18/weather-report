const state = {
  tempCount: 64,
  cityName: 'Ada',
};

const updateLandscapeColor = () => {
  const tempDisplay = document.querySelector('#temperature');
  const landscape = document.querySelector('#landscape');
  if (state.tempCount <= 49) {
    tempDisplay.style.color = 'teal';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️';
  } else if (state.tempCount >= 50 && state.tempCount <= 59) {
    tempDisplay.style.color = 'green';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️';
  } else if (state.tempCount >= 60 && state.tempCount <= 69) {
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    tempDisplay.style.color = 'yellow';
  } else if (state.tempCount >= 70 && state.tempCount <= 79) {
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    tempDisplay.style.color = 'orange';
  } else if (state.tempCount >= 80) {
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    tempDisplay.style.color = 'red';
  }
};

const updateSkyscape = () => {
  const chosenSky = document.getElementById('sky').value;
  const skyDisplay = document.querySelector('#skyscape');
  if (chosenSky === 'sunny') {
    skyDisplay.textContent = '☁️ ☁️ 🌻☁️ 🌝 ☁️ 🌻☁️ ☁️';
  } else if (chosenSky === 'cloudy') {
    skyDisplay.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (chosenSky === 'rainy') {
    skyDisplay.textContent = '🌈⛈☔🌧⛈💧⛈🌧💧⛈☔🌈';
  } else if (chosenSky === 'snowy') {
    skyDisplay.textContent = '🌨❄️🌨⛄❄️🌨❄️🌨❄️❄️⛄🌨';
  } else if (chosenSky === 'stormy') {
    skyDisplay.textContent = '⛈️⚡⚡⛈️⛈️⚡⚡⛈️⛈️⚡⚡⛈️';
  } else if (chosenSky === 'apocalyptic') {
    skyDisplay.textContent = '🔥☄️⚡💥🔥☄️🔥💥☄️⚡🔥';
  } else if (chosenSky === 'magical') {
    skyDisplay.textContent = '✨🧚🏾🐲🦋🦄🌟🪐🌟🦄🦋🐲🧚🏼‍♀️✨';
  } else if (chosenSky === 'hungry') {
    skyDisplay.textContent = '✨🍕🍦✨🍔🍭🥑🍩✨🍰🌮🍭🍔✨🍕🍦✨';
  }
};

const updateTemp = (changeFactor) => {
  const tempDisplay = document.querySelector('#temperature');
  state.tempCount = state.tempCount + changeFactor;
  tempDisplay.textContent = `${state.tempCount}`;
  updateLandscapeColor();
};

const changeCity = (cityName) => {
  const cityNameDisplay = document.getElementById('city');
  state.cityName = cityName;
  cityNameDisplay.textContent = `Weather Report for the wonderful city ${state.cityName}`;
};

const getWeatherCity = async (event) => {
  // find lat and long of submitted city
  const city = document.querySelector('#cityName').value;
  const locationPath = 'http://127.0.0.1:5000//location';
  const weatherPath = 'http://127.0.0.1:5000//weather';
  const location = await axios.get(locationPath, {
    params: {
      q: city,
    },
  });
  const lat = location.data[0]['lat'];
  const lon = location.data[0]['lon'];

  // find weather in F at lat and long
  const weather = await axios.get(weatherPath, {
    params: {
      lat: lat,
      lon: lon,
    },
  });
  const farenheit = Math.round(
    ((weather.data['main']['temp'] - 273.15) * 9) / 5 + 32
  );

  // update temp
  updateTemp(farenheit - state.tempCount);
};

const resetCityDefault = () => {
  const city = document.querySelector('#cityName');
  city.value = 'Ada';
  console.log(city.value)
  changeCity('Ada');
  getWeatherCity();

}

const registerEventHandlers = (event) => {
  updateLandscapeColor();
  getWeatherCity()
  const increaseButton = document.querySelector('#increaseTemp');
  increaseButton.addEventListener('click', (event) => updateTemp(1));
  const decreaseButton = document.querySelector('#decreaseTemp');
  decreaseButton.addEventListener('click', (event) => updateTemp(-1));
  const changeCityInput = document.querySelector('#cityName');
  changeCityInput.addEventListener('input', () =>
    changeCity(changeCityInput.value)
  );
  const getWeatherButton = document.querySelector('#getWeather');
  getWeatherButton.addEventListener('click', getWeatherCity);
  const changeSkyscape = document.querySelector('#sky');
  changeSkyscape.addEventListener('change', (event) => updateSkyscape());
  const resetCityButton = document.querySelector('#resetCity');
  resetCityButton.addEventListener('click', resetCityDefault);

};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

