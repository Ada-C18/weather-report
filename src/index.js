'use strict';

const state = {
  temp: 80,
  tempColor: 'red',
  city: 'seattle',
  sky: 'snowy',
};

///refactor the code above
const showTemperature = () => {
  const tempValue = document.getElementById('tempValue');
  tempValue.textContent = state.temp + '\u00B0F';
  // tempValue.style.color = ‘red’;
  console.log(tempValue);
};

const updateCity = () => {
  const updateCity = document.getElementById('city-name-input').value;
  document.getElementById('city-name').innerHTML = updateCity;
};

const resetCity = () => {
  const updateCity = document.getElementById('city-name-input');
  const cityName = document.getElementById('city-name');
  state.city = '';
  cityName.textContent = state.city;
  updateCity.value = state.city;
};

const tempColorAndLandscape = () => {
  const tempColorElement = document.getElementById('tempValue');
  const landscape = document.getElementById(
    'weather-garden-containing-landscape'
  );

  if (state.temp <= 49) {
    tempColorElement.style.color = 'teal';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (50 <= state.temp && state.temp <= 59) {
    tempColorElement.style.color = 'green';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (60 <= state.temp && state.temp <= 69) {
    tempColorElement.style.color = 'yellow';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (70 <= state.temp && state.temp <= 79) {
    tempColorElement.style.color = 'orange';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else {
    tempColorElement.style.color = 'red';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};

const changeTemp = (e) => {
  const tempContainer = document.querySelector('.temperature');

  if (e.target.id == 'tempUp') {
    state.temp += 1;
    console.log(state);
    showTemperature();
  } else if (e.target.id == 'tempDown') {
    state.temp -= 1;
    showTemperature();
  }
};

const changeSky = () => {
  let currentSky = document.getElementById('skys').value;
  let skyContainer = document.getElementById('sky-garden');

  state.sky = currentSky;
  if (state.sky === 'cloudy') {
    skyContainer.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (state.sky === 'sunny') {
    skyContainer.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (state.sky === 'rainy') {
    skyContainer.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (state.sky === 'snowy') {
    skyContainer.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

// const getWeather = async () => {
//   let latitude, longitude;

//   await axios
//     .get('http://127.0.0.1:5000/location', {
//       params: {
//         q: state.city,
//       },
//     })
//     .then((response) => {
//       latitude = response.data[0].lat;
//       longitude = response.data[0].lon;
//     })
//     .catch((error) => {
//       console.log('error in finding location!');
//     });

//   axios
//     .get('http://127.0.0.1:5000/weather', {
//       params: {
//         lat: latitude,
//         lon: longitude,
//       },
//     })
//     .then((response) => {
//       // console.log(response.data);
//       const kelvinTemperature = response.data.main.temp;
//       // console.log(kelvinTemperature);
//       const fahrenheitTemperature = Math.round(
//         (kelvinTemperature - 273.15) * 1.8 + 32
//       );
//       state.temp = fahrenheitTemperature;
//       tempValue.innerText = `${state.temp + '\u00B0F'}`;
//       tempColorAndLandscape();
//     })
//     .catch((error) => {
//       console.log('error in finding temperature!', error);
//     });
// };

const allEventHandlers = () => {
  const getRealTempBtn = document.getElementById('get-current-temp');
  getRealTempBtn.addEventListener('click', getWeather);

  const resetButton = document.getElementById('city-name-btn');
  resetButton.addEventListener('click', resetCity);
  const cityName = document.getElementById('city-name-input');
  cityName.addEventListener('input', updateCity);

  const increaseArrow = document.getElementById('tempUp');
  increaseArrow.addEventListener('click', changeTemp);
  increaseArrow.addEventListener('click', tempColorAndLandscape);

  const decreaseArrow = document.getElementById('tempDown');
  decreaseArrow.addEventListener('click', changeTemp);
  decreaseArrow.addEventListener('click', tempColorAndLandscape);

  const changeCurrentSky = document.getElementById('skys');
  changeCurrentSky.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', allEventHandlers);
