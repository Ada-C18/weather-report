'use strict';

const state = {
  temp: 70,
};

const tempNum = document.getElementById('tempnum');
const cityInput = document.getElementById('city-input');
const cityOutput = document.getElementById('city-output');
const skySelector = document.getElementById('sky-select');
const skyscape = document.getElementById('skyscape');

const tempColor = {
  80: 'red',
  70: 'orange',
  60: 'purple',
  50: 'teal',
  else: 'blue',
};

const landscapes = {
  80: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  70: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  60: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
  else: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
};

const skies = {
  sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
  else: '🌧🕺🏾⛈🕺🏾🌧',
};

const skyCodes = {
  200: 'rainy',
  // 300: rainy,
  // 500: rainy,
  600: 'snowy',
  700: 'else',
  800: 'sunny',
  801: 'cloudy',
};

const incrementTemp = () => {
  state.temp += 1;
  tempNum.textContent = state.temp;
  changeTempColor();
  changeLandscape();
};

const decrementTemp = () => {
  state.temp -= 1;
  tempNum.textContent = state.temp;
  changeTempColor();
  changeLandscape();
};

const changeTempColor = () => {
  const tempDegree = document.getElementById('temp-degree');
  if (state.temp >= 80) {
    tempDegree.className = tempColor['80'];
  } else if (state.temp >= 70) {
    tempDegree.className = tempColor['70'];
  } else if (state.temp >= 60) {
    tempDegree.className = tempColor['60'];
  } else if (state.temp >= 50) {
    tempDegree.className = tempColor['50'];
  } else {
    tempDegree.className = tempColor['else'];
  }
};

const changeLandscape = () => {
  const landscape = document.getElementById('landscape');
  if (state.temp >= 80) {
    landscape.textContent = landscapes['80'];
  } else if (state.temp >= 70) {
    landscape.textContent = landscapes['70'];
  } else if (state.temp >= 60) {
    landscape.textContent = landscapes['60'];
  } else {
    landscape.textContent = landscapes['else'];
  }
};

const changeSky = (s = null) => {
  console.log(`selector value: ${skySelector.value}`);

  if (!isNaN(s)) {
    // that is, if we received an id from the Open Weather API
    if (s >= 801) {
      skyscape.textContent = skies[skyCodes['801']];
    } else if (s === 800) {
      skyscape.textContent = skies[skyCodes['800']];
    } else if (s >= 700) {
      skyscape.textContent = skies[skyCodes['700']];
    } else if (s >= 600) {
      skyscape.textContent = skies[skyCodes['600']];
    } else if (s >= 200) {
      skyscape.textContent = skies[skyCodes['200']];
    }
  } else {
    // if we received a selector event
    skyscape.textContent = skies[skySelector.value];
  }
};

const getCity = (event) => {
  // use regex to limit the display to uppercase and lowercase letters and spaces
  // event.key displays all keyboard keys in the associated layout, not just alphanumeric inputs
  const re = /^[A-Za-z\s\-]{1}$/;

  // if statement checks whether event.key returns a single character (only)
  // that is a letter, a space or a hyphen
  if (event.key.match(re)) {
    // text of the h1 element will match the value of the input box (which is
    // always one keystroke behind what's actually visible on screen while typing)
    cityOutput.textContent = `${cityInput.value}${event.key}`;

    // Note that all other characters entered in the input box are still stored
    // in the input element's value property but won't be displayed in the header
    // until a valid character is typed.
  } else if (event.key === 'Backspace') {
    // checks if the backspace button is pressed

    if (!cityInput.value || cityInput.value.length === 1) {
      // if there's nothing in the input box, invoke clearInput
      clearInput();
    } else {
      // otherwise, show everything in the value property, except the newly deleted character
      let updatedInput = cityInput.value.slice(0, cityInput.value.length - 1);
      cityOutput.textContent = `${updatedInput}`;
    }
  }
};

const clearInput = () => {
  cityInput.value = null;
  cityOutput.textContent = 'Seattle';
};

const updateCityOnClick = () => {
  cityOutput.textContent = cityInput.value;

  if (!cityInput.value) {
    cityOutput.textContent = 'Seattle';
  }
};

axios;

const getLatLon = async (cityName) => {
  const response = await axios.get('http://127.0.0.1:5000/location', {
    params: {
      q: cityName,
    },
  });

  if (response.data[0]) {
    const lat = response.data[0]['lat'];
    const lon = response.data[0]['lon'];
    return { lat, lon };
  } else if (response.data.error) {
    console.log(`!!! error in getLatLon: ${response.data.error}`);
    return { lat: 90, lon: 200 };
  }
};

const kelvinToFahrenheit = (K) => Math.round(((K - 273.15) * 9) / 5 + 32);

const getTemp = async (objLatLon) => {
  if (objLatLon.lat === 90 && objLatLon.lon === 200) {
    return -40;
  }

  const response = await axios.get('http://127.0.0.1:5000/weather', {
    params: objLatLon,
  });

  if (response.data.main) {
    let cityTemp = response.data.main.temp;
    cityTemp = kelvinToFahrenheit(cityTemp);

    let cityWeather = response.data.weather[0].id;
    console.log(cityWeather);

    return [cityTemp, cityWeather];
  } else if (response.data.cod != 200) {
    // else if uses loose inequality because cod is a string
    console.log(
      `!!! error in getTemp: ${response.data.cod}: ${response.data.message}`
    );
    return [-40, 'else'];
  }
};

const cityWeather = async (cityName) => {
  const location = await getLatLon(cityName);
  const cityTempF = await getTemp(location);

  return cityTempF;
};

const displayTempSky = () => {
  const cityName = cityInput.value;

  cityWeather(cityName).then((weatherArr) => {
    const [F, sky] = weatherArr;
    console.log(`weather: ${F}, ${sky}`);

    tempNum.textContent = F;
    state.temp = F;
    changeTempColor();
    changeLandscape();
    console.log(`updated temp to ${F}°F`);

    skySelector.value = 'else';
    changeSky(sky);
  });
};

const registerEventHandlers = () => {
  const upArrow = document.getElementById('up');
  upArrow.addEventListener('click', incrementTemp);

  const downArrow = document.getElementById('down');
  downArrow.addEventListener('click', decrementTemp);

  cityInput.addEventListener('keydown', getCity);

  const goButton = document.getElementById('go');
  goButton.addEventListener('click', displayTempSky);

  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', clearInput);

  document.addEventListener('click', updateCityOnClick);

  skySelector.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
