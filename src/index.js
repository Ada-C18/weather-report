const state = {
  temp: 0,
  city: 'Seattle',
  sky: '~',
};
// add temp
const addTemp = (event) => {
  state.temp += 1;
  console.log('state temp', state.temp);
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = state.temp;
  changeColorAndLandscape();
};
// decrease temp
const decTemp = (event) => {
  state.temp -= 1;
  console.log('state temp', state.temp);
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = state.temp;
  changeColorAndLandscape();
};
// update city name
const updateCityName = (event) => {
  // find the button
  let city = document.querySelector('#city-name');
  // get the content inside it
  let tempCity = city.value;
  let printtableString = 'For the lovely city of: ' + tempCity;
  let topCity = document.querySelector('#city');
  topCity.textContent = printtableString;
  state.city = tempCity;
};
// reset city name
const resetCity = (event) => {
  // find the button
  let resetButton = (document.querySelector('#city-name').value = '');
  updateCityName();
  const resetTemp = document.querySelector('#temp');
  resetTemp.textContent = 0;
};
// change sky
const changeSky = (event) => {
  // find the button
  let sky = document.querySelector('#myList');
  // get the content inside it
  let skyWeather = sky.value;
  state.sky = skyWeather;
  if (state.sky === 'Sunny') {
    document.getElementById('sky-emojis').innerText = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (state.sky === 'Cloudy') {
    document.getElementById('sky-emojis').innerText =
      '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (state.sky === 'Rainy') {
    document.getElementById('sky-emojis').innerText = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (state.sky === 'Snowy') {
    document.getElementById('sky-emojis').innerText = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};
// change color and landscape
const changeColorAndLandscape = (event) => {
  if (state.temp > 80) {
    document.getElementById('temp').style.color = 'red';
    document.getElementById('emojis').innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70 && state.temp <= 79) {
    document.getElementById('temp').style.color = 'orange';
    document.getElementById('emojis').innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 60 && state.temp <= 69) {
    document.getElementById('temp').style.color = 'yellow';
    document.getElementById('emojis').innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp >= 50 && state.temp <= 59) {
    document.getElementById('temp').style.color = 'green';
    document.getElementById('emojis').innerText =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temp <= 49) {
    document.getElementById('temp').style.color = 'teal';
    document.getElementById('emojis').innerText = '🌲🌲⛄️🌲⛄️';
  }
};
// find latitude and longitude
// const LOCATIONIQ_KEY = process.env['api_key'];

const findLatitudeAndLongitude = (query) => {
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        // key: LOCATION_KEY,
        q: state.city,
        format: 'json',
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);

      // make the next API call here!
      findLocation(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });
};
// find weather
const findLocation = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: { lat: latitude, lon: longitude },
    })
    .then((response) => {
      console.log('success in findLocation!', response.data);
      const kelvin = response.data.main.temp;
      const fahrenheit = Math.round(((kelvin - 273.15) * 9) / 5 + 32);
      state.temp = fahrenheit;
      const tempContainer = document.querySelector('#temp');
      tempContainer.textContent = fahrenheit;
      changeColorAndLandscape();
    })
    .catch((error) => {
      console.log('error in findLocation!');
    });
};

// register
const registerEventHandlers = (event) => {
  const upArrow = document.querySelector('#Increase-temp');
  upArrow.addEventListener('click', addTemp);
  const downArrow = document.querySelector('#Decrease-temp');
  downArrow.addEventListener('click', decTemp);
  const color = document.querySelector('#temp');
  color.addEventListener('click', changeColorAndLandscape);
  const landscape = document.querySelector('#emojis');
  color.addEventListener('click', changeColorAndLandscape);
  const updateCity = document.querySelector('#city-name');
  updateCity.addEventListener('input', updateCityName);
  const weather = document.querySelector('#get-realtime-temp');
  weather.addEventListener('click', findLatitudeAndLongitude);
  const sky = document.querySelector('#myList');
  sky.addEventListener('change', changeSky);
  const reset = document.querySelector('#reset-button');
  reset.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
