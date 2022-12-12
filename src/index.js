const state = {
  temp: 50,
  city: 'Seattle',
  sky: 'Sunny',
  city_input: '',
};

const displayTemp = document.getElementById('display-temp');
displayTemp.textContent = `${state.temp}°  F`;

const displayCity = document.getElementById('city');
displayCity.textContent = `Weather report for the lovely city of ${state.city}`;

const increaseTemp = () => {
  const displayTemp = document.getElementById('display-temp');
  state.temp += 1;
  displayTemp.textContent = `${state.temp}°  F`;
  tempColor(state.temp);
  gardenDisplayer(state.temp);
};

const decreaseTemp = () => {
  const displayTemp = document.getElementById('display-temp');
  state.temp -= 1;
  displayTemp.textContent = `${state.temp}°  F`;
  tempColor(state.temp);
  gardenDisplayer(state.temp);
};

const tempColor = (temp) => {
  const tempBG = document.getElementById('temperature');
  if (temp >= 80) {
    tempBG.style.backgroundColor = 'red';
  } else if (70 <= temp && temp < 80) {
    tempBG.style.backgroundColor = 'orange';
  } else if (60 <= temp && temp < 70) {
    tempBG.style.backgroundColor = 'yellow';
  } else if (50 <= temp && temp < 60) {
    tempBG.style.backgroundColor = 'green';
  } else if (temp <= 49) {
    tempBG.style.backgroundColor = 'teal';
  }

  // switch(temp) {
  //     case temp >= 80:
  //         tempBG.style.backgroundColor = 'red';
  //     case 70 <= temp < 80:
  //         tempBG.style.backgroundColor = 'orange';
  //     case 60 <= temp < 70:
  //         tempBG.style.backgroundColor = 'yellow';
  //     case 50 <= temp < 60:
  //         tempBG.style.backgroundColor = 'green';
  //     case temp <= 49:
  //         tempBG.style.backgroundColor = 'teal';

  // }
};

const gardenDisplayer = (temp) => {
  const gardenPics = document.getElementById('garden-pics');
  if (temp >= 80) {
    gardenPics.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (70 <= temp && temp < 80) {
    gardenPics.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (60 <= temp && temp < 70) {
    gardenPics.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (50 <= temp && temp < 60) {
    gardenPics.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (temp < 50) {
    gardenPics.textContent = '❄️☃️⛄️🌨️❄️🥶❄️🧊🧊❄️❄️🥶⛄️❄️❄️❄️';
  }
};

function updateCity(e) {
  const city = document.getElementById('city');
  state.city = e.target.value;
  city.textContent = `Weather report for the lovely city of ${state.city}`;
}

function updateSky(e) {
  const skySelection = document.getElementById('skyDropdown').value;
  state.sky = e.target.value;
  skyDisplayer(skySelection);
}

const skyDisplayer = (sky) => {
  const skyPics = document.getElementById('sky-pics');
  if (sky === 'Sunny') {
    skyPics.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (sky === 'Cloudy') {
    skyPics.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (sky === 'Rainy') {
    skyPics.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (sky === 'Snowy') {
    skyPics.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const resetCityName = () => {
  const city = document.getElementById('city');
  state.city = 'Seattle';
  city.textContent = `Weather report for the lovely city of ${state.city}`;
  const cityInput = document.getElementById('city-input');
  cityInput.value = '';
};

const citySearch = () => {
  // const city = document.getElementById('city-input').value;
  // state.city_input = city;
  const city = state.city;
  console.log(city);
  findLatandLong(city);
};

const findLatandLong = (city) => {
  let latitude, longitude;
  // let APItemp;

  axios
    .get('http://127.0.0.1:5000/location', (config = { params: { q: city } }))
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log(`latitude of ${state.city}: ${latitude}`);
      console.log(`longitude of ${state.city}: ${longitude}`);
      findWeather(latitude, longitude);
    })
    .catch((error) => {
      console.log("There's been an error!");
    });
};

const findWeather = (latitude, longitude) => {
  let temperature;
  const displayTemp = document.getElementById('display-temp');
  axios
    .get(
      'http://127.0.0.1:5000/weather',
      (config = { params: { lat: latitude, lon: longitude } })
    )
    .then((response) => {
      temperature = response.data['main']['temp'];
      temperature = Math.round(1.8 * (temperature - 273) + 32);
      displayTemp.textContent = `${temperature}°  F`;
      state.temp = temperature;
      console.log(`state.temp: ${state.temp}`);
      tempColor(state.temp);
      gardenDisplayer(state.temp);
    })
    .catch((error) => {
      console.log("There's been an error!");
    });
};

const registerEventHandlers = () => {
  const increaseButton = document.getElementById('increaseButton');
  increaseButton.addEventListener('click', increaseTemp);
  const decreaseButton = document.getElementById('decreaseButton');
  decreaseButton.addEventListener('click', decreaseTemp);
  const input = document.getElementById('city-lookup');
  input.addEventListener('input', updateCity);
  const skyDropdown = document.getElementById('skyDropdown');
  skyDropdown.addEventListener('change', updateSky);
  const resetCityButton = document.getElementById('resetCityButton');
  resetCityButton.addEventListener('click', resetCityName);

  const RTweatherButton = document.getElementById('real-time-weather');
  RTweatherButton.addEventListener('click', citySearch);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
document.addEventListener('DOMContentLoaded', tempColor(state.temp));
document.addEventListener('DOMContentLoaded', gardenDisplayer(state.temp));
document.addEventListener('DOMContentLoaded', displayCity);
document.addEventListener('DOMContentLoaded', skyDisplayer(state.sky));
