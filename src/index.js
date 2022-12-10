
const state = { temp: 42, city: cityInput, lat : 0, lon : 0};
const thingToConnectToAPI = { temp: 46 };

const increaseTemp = () => {
  const tempDisplay = document.getElementById('temp');
  state.temp += 1;
  tempDisplay.textContent = state.temp;
  changeTempColor(state.temp);
};

const decreaseTemp = () => {
  const tempDisplay = document.getElementById('temp');
  state.temp -= 1;
  tempDisplay.textContent = state.temp;
  changeTempColor(state.temp);
};

const currentTemp = () => {
  const tempDisplay = document.getElementById('temp');
  tempDisplay.textContent = thingToConnectToAPI.temp;
  changeTempColor(thingToConnectToAPI.temp);
};

const changeTempColor = (temp) => {
  const tempDisplay = document.getElementById('temp_display');
  const groundVis = document.getElementById('ground_vis');
  if (temp >= 80) {
    tempDisplay.className = 'red';
    groundVis.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    tempDisplay.className = 'orange';
    groundVis.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    tempDisplay.className = 'yellow';
    groundVis.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 50) {
    tempDisplay.className = 'green';
    groundVis.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempDisplay.className = 'teal';
    groundVis.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const changeSkyViewer = () => {
  const skyVis = document.getElementById('sky_vis');
  const sky_selection = document.getElementById('sky_select');
  let sky = sky_selection.value;
  if (sky === 'sunny') {
    skyVis.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (sky === 'cloudy') {
    skyVis.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (sky === 'rainy') {
    skyVis.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (sky === 'snowy') {
    skyVis.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

const changeCity = () => {
  const userInput = document.getElementById('cityInput');
  const currentCity = document.getElementById('city');
  let cityInput = userInput.value;
  state.city = cityInput;
  currentCity.textContent = state.city;
  getLonAndLat(state.city)
  console.log(state.lon, state.lat)
};

const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const centerButton = document.getElementById('current');
const cityButton = document.getElementById('change_city');
const skySelect = document.getElementById('sky_select');

const registerEventHandlers = () => {
  upButton.addEventListener('click', increaseTemp);
  downButton.addEventListener('click', decreaseTemp);
  centerButton.addEventListener('click', currentTemp);
  cityButton.addEventListener('click', changeCity);
  skySelect.addEventListener('change', changeSkyViewer);
};




const getLonAndLat = (query) => {
  
  let lattitude, longitude;
  // get lat and lon of city
  axios.get('http://127.0.0.1:5000/location',{
    params : {q: query}
  })
  .then( (response) => {
    lattitude = response.data[0].lat;
    longitude = response.data[0].lon;
    console.log(lattitude, longitude)
  })
  .catch( (error) => {
    console.log(error)
  })

  state.lat = lattitude,
  state.lon = longitude



document.addEventListener('DOMContentLoaded', registerEventHandlers);
