// ------------- Wave 2 ----------------------
const state = {
  temp: 60,
  city: 'Seattle',
  sky: '☁️',
};
// 1. increase temp
const addDegree = (event) => {
  state.temp += 1;
  console.log('state temp', state.temp);
  const tempContainer = document.querySelector('#degrees');
  tempContainer.textContent = state.temp;
  updateColorsAndEmojis();
};
// 2. decrease temp
const subtractDegree = (event) => {
  state.temp -= 1;
  console.log('state temp', state.temp);
  const tempContainer = document.querySelector('#degrees');
  tempContainer.textContent = state.temp;
  updateColorsAndEmojis();
};
// 2. temp ranges
const updateColorsAndEmojis = () => {
  if (state.temp > 80) {
    document.getElementById('degrees').style.color = 'red';
    document.getElementById('emojis').innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70 && state.temp <= 79) {
    document.getElementById('degrees').style.color = 'orange';
    document.getElementById('emojis').innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 60 && state.temp <= 69) {
    document.getElementById('degrees').style.color = 'yellow';
    document.getElementById('emojis').innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp > 50 && state.temp <= 59) {
    document.getElementById('degrees').style.color = 'green';
    document.getElementById('emojis').innerText = '🌲🌲';
  } else if (state.temp < 59) {
    document.getElementById('degrees').style.color = 'teal';
    document.getElementById('emojis').innerText =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};
// ------------- Wave 3 ----------------------
const updateCity = () => {
  let myTextInput = document.getElementById('search-bar');
  let cityName = myTextInput.value;
  let cityHeader = document.getElementById('city-name');
  cityHeader.textContent = `For the lovely city of: ${cityName}`;
  state.city = cityName;
};
// ------------- Wave 4 --------------------
const findLatitudeAndLongitude = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
        format: 'json',
      },
    })
    .then((response) => {
      console.log(response.data);
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);
      getWeather(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!', error);
    });
};
// -------------- Wave 5 --------------------
const getSkyChoice = () => {
  const skyDropdown = document.querySelector('select');
  const skyChoice = skyDropdown.value;
  console.log('sky choice:', skyChoice);
  state.sky = skyChoice;
  if (state.sky === 'sunny') {
    document.getElementById('sky-emojis').innerText = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (state.sky === 'cloudy') {
    document.getElementById('sky-emojis').innerText =
      '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (state.sky === 'rainy') {
    document.getElementById('sky-emojis').innerText = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (state.sky === 'snowy') {
    document.getElementById('sky-emojis').innerText = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};
// getting temperature from latitude and longitude
const getWeather = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: { lat: latitude, lon: longitude },
    })
    .then((response) => {
      console.log('success in getWeather!', response.data.main.temp);
      let kelvin = response.data.main.temp;
      let fahrenheit = Math.round(((kelvin - 273.15) * 9) / 5 + 32);
      state.temp = fahrenheit;
      const tempContainer = document.querySelector('#degrees');
      tempContainer.textContent = state.temp;
      updateColorsAndEmojis();
    })
    .catch((error) => {
      console.log('error in getWeather!');
    });
};
// ...Wave 6..............
const resetFunc = () => {
  document.querySelector('#search-bar').value = '';
  updateCity();
  const tempContainer = document.querySelector('#degrees');
  tempContainer.textContent = 0;
};
// registering event handlers
const registerHandlers = (event) => {
  const downArrow = document.querySelector('#down-arrow');
  downArrow.addEventListener('click', subtractDegree);
  const upArrow = document.querySelector('#up-arrow');
  upArrow.addEventListener('click', addDegree);
  const changeTempColor = document.querySelector('#degrees');
  const updateCityName = document.querySelector('#search-bar');
  updateCityName.addEventListener('input', updateCity);
  changeTempColor.addEventListener('click', updateColorsAndEmojis);
  const tempButton = document.querySelector('#get-temp');
  tempButton.addEventListener('click', findLatitudeAndLongitude);
  const updateSky = document.querySelector('select');
  updateSky.addEventListener('change', getSkyChoice);
  const resetCity = document.querySelector('#reset');
  resetCity.addEventListener('click', resetFunc);
};
document.addEventListener('DOMContentLoaded', registerHandlers);
