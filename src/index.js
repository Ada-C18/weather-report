'use strict';

let holup = Array();

let state = {
  temp: 0, // kelvin
  city: 'Seattle',
  tempF: () => 1.8 * (temp - 273) + 32,
  tempC: () => temp - 273,
  tempPref: tempF,
};

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

  document.getElementById('temp').textContent = state.tempPref();
  const newStyle = temperatureStyle(state.tempF());
  document.getElementById('body').style.backgroundColor = newStyle.bgColor;
  document.getElementById('landscape').textContent = newStyle.landscape;
};

const finishTyping = (target, delay) => {
  state.city = target.value;
  document.getElementById('city').textContent = state.city;
  clearTimeout(holup[target.id]);
  return new Promise(
    (resolve) => (holup[target.id] = setTimeout(resolve, delay))
  );
};

const updateWeather = async () => {
  const latlon = await getLocation(state.city);
  const weather = await getWeather(...latlon);
  state.temp = weather.temp; // kelvin
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
  return response.data.main;
};

function addListeners() {
  document.getElementById('city_input').oninput = (event) =>
    finishTyping(event.target, 500).then(updateWeather);
}
