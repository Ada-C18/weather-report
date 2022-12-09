'use strict';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let temperature = 0;
let holup = Array();

const updatePage = () => {
  document.getElementById('temp').textContent = temperature;
  let newstyle = temperatureStyle(temperature);
  document.getElementById('body').style.backgroundColor = newstyle.bg_color;
  document.getElementById('landscape').textContent = newstyle.landscape;
};

const temperatureStyle = (temp) => {
  if (temp > 80) {
    return { bg_color: 'red', landscape: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂' };
  } else if (temp >= 70) {
    return { bg_color: 'orange', landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷' };
  } else if (temp >= 60) {
    return { bg_color: 'yellow', landscape: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃' };
  } else if (temp >= 50) {
    return { bg_color: 'green', landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲' };
  } else {
    return { bg_color: 'teal', landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲' };
  }
};

const cityUpdate = async (event) => {
  document.getElementById('city').textContent = event.target.value;
  holup.push(() => updateWeather());
  await wait(500);
  let action = holup.pop();
  if (holup.length == 0) {
    console.log('wait stack down, executing action');
    action();
  } else {
    console.log('wait stack remains', holup.length, 'no execution');
  }
};

const updateWeather = async () => {
  const placeName = document.getElementById('city').textContent;
  console.log('updateWeather', placeName);
  const latlon = await getLocation(placeName);
  const weather = await getWeather(...latlon);
  console.log(weather);
  temperature = weather.temp;
  updatePage();
};

const getLocation = async (placeName) => {
  const response = await axios.get('http://localhost:5000/location', {
    params: {
      q: placeName,
    },
  });
  console.log('getLocation', response);
  const lat = response.data[0].lat;
  const lon = response.data[0].lon;
  return [lat, lon];
};

const getWeather = async (lat, lon) => {
  console.log('getWeather', { lat, lon });
  const response = await axios.get('http://localhost:5000/weather', {
    params: { lat, lon },
  });
  console.log('getWeather response', response);
  return response.data.main;
};

function addListeners() {
  console.log('onload');
  document.getElementById('city_input').oninput = (event) => cityUpdate(event);
  console.log('onload executed');
}
