'use strict';

let holup = Array();

let state = {
  temp: 0, // kelvin
  city: 'Seattle',
  condition: 'sleepless',
  sky: 'the color of a television tuned to a dead channel',
};

const tempF = () => Math.round(1.8 * (state.temp - 273) + 32);
const tempC = () => Math.round(state.temp - 273);

const renderPage = () => {
  const temperatureStyle = (F) => {
    if (F > 80) {
      return { bgColor: 'red', landscape: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂' };
    } else if (F >= 70) {
      return { bgColor: 'orange', landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷' };
    } else if (F >= 60) {
      return { bgColor: 'yellow', landscape: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃' };
    } else if (F >= 50) {
      return { bgColor: 'green', landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲' };
    } else {
      return { bgColor: 'teal', landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲' };
    }
  };

  document.getElementById('temp').textContent = tempF(); // TODO add pref
  const newStyle = temperatureStyle(tempF());
  const newSky = skyStyle();
  document.getElementById('sky_input').value = state.sky;
  document.getElementById('body').style.backgroundColor = newStyle.bgColor;
  document.getElementById('landscape').textContent = newStyle.landscape;
  document.getElementById('sky').textContent = newSky.skyType;
};

const finishTyping = (target, delay) => {
  state.city = target.value;
  document.getElementById('city').textContent = state.city;
  clearTimeout(holup[target.id]);
  return new Promise(
    (resolve) => (holup[target.id] = setTimeout(resolve, delay))
  );
};

const increaseTemp = () => {
  state.temp++;
  renderPage();
};

const decreaseTemp = () => {
  state.temp--;
  renderPage();
};

const updateLocation = async () => {
  const latlon = await getLocation(state.city);
  const weather = await getWeather(...latlon);
  state.temp = weather.main.temp; // kelvin
  state.condition = weather.weather[0].description;
  renderPage();
};

const getLocation = async (placeName) => {
  const response = await axios.get('http://localhost:5000/location', {
    params: {
      q: placeName,
    },
  });
  const lat = response.data[0].lat;
  const lon = response.data[0].lon;
  return [lat, lon];
};

const getWeather = async (lat, lon) => {
  const response = await axios.get('http://localhost:5000/weather', {
    params: { lat, lon },
  });
  return response.data;
};

const skyStyle = () => {
  const conditionIs = (word) => state.condition.indexOf(word) != -1;
  if (conditionIs('rain') || conditionIs('mist')) {
    state.sky = 'rainy';
  } else if (conditionIs('clouds')) {
    state.sky = 'cloudy';
  } else if (conditionIs('snow')) {
    state.sky = 'snowy';
  } else {
    state.sky = 'sunny';
  }
  return selectSky(state.sky);
};

const selectSky = (sky) => {
  if (sky == 'sunny') {
    return { skyType: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️' };
  } else if (sky == 'cloudy') {
    return { skyType: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️' };
  } else if (sky == 'rainy') {
    return { skyType: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧' };
  } else if (sky == 'snowy') {
    return { skyType: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨' };
  }
};

const skyUpdate = (sky) => {
  document.getElementById('sky').textContent = sky;
};

function addListeners() {
  document.getElementById('city_input').oninput = (event) =>
    finishTyping(event.target, 500).then(updateLocation);
  document.getElementById('sky_input').oninput = (event) => {
    document.getElementById('sky').textContent = selectSky(
      event.target.value
    ).skyType;
  };
  document.getElementById('temp_increase').onclick = increaseTemp;
  document.getElementById('temp_decrease').onclick = decreaseTemp;
  document.getElementById('reset').onclick = () => {
    state.city = 'Seattle';
    document.getElementById('city_input').value = state.city;
    document.getElementById('city').textContent = state.city;
    updateLocation();
  };
}
