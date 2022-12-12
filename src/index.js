"use strict";

// current state of the page. All functions update this state and pull needed data from the state
const state = {
  city: 'Chicago',
  lat: '',
  lon: '',
  temp: 65,
  color: 'red',
  sky: "url('../assets/cloudySky.jpg')",
  middle: "url('../assets/snowyMiddle.jpg')",
  land: "url('../assets/snowLand.jpg')",
};

// functionality to change city and update weather
// 1. change selected city
const changeCity = () => {
  const cityDisplay = document.getElementById('city-display');
  const searchBox = document.getElementById('searchbox')
  
  state.city = searchBox.value;
  cityDisplay.innerHTML = state.city
  getCoordinates();
};

// 2. fetch city coordinates
const getCoordinates = () => {
  axios
  .get('http://127.0.0.1:5000/location', {
    params: {
      q: state.city,
    },
  })
  .then((response) => {
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon;
    getWeather();
  })
  .catch((error) => {
    console.log("Couldn't find coordinates for this city.");
  });
};

// 3. fetch current city weather
const getWeather = () => {
  axios
  .get('http://127.0.0.1:5000/weather', {
    params: {
      lat: state.lat,
      lon: state.lon,
    },
  })
  .then((response) => {
    const kelvin = response.data['main']['temp'];
    state.temp = Math.round(((kelvin - 273.15) * 9) / 5 + 32);
    setColorAndLand();
  })
  .catch((error) => {
    console.log("Couldn't get the temperature for this city.");
  });
};

// functionality to change elements on the screen
// increase temp
const increaseTemp = () => {
  state.temp++;
  setColorAndLand();
};

// decrease temp
const decreaseTemp = () => {
  state.temp--;
  setColorAndLand();
};

// change temp display, color and land
const setColorAndLand = () => {
  const tempDisplay = document.getElementById('temp-display');
  const land = document.getElementById('land');

  if (state.temp >= 90) {
    state.color = 'red';
    state.land = "url('../assets/desertLand.jpg')"
  } else if (state.temp >= 70 && state.temp < 90) {
    state.color = 'orange';
    state.land = "url('../assets/beachLand.jpg')"
  } else if (state.temp >= 55 && state.temp < 70) {
    state.color = 'yellow';
    state.land = "url('../assets/warmLand.jpg')"
  } else if (state.temp >= 40 && state.temp < 55) {
    state.color = 'green';
    state.land = "url('../assets/coldLand.jpg')"
  } else {
    state.color = 'teal';
    state.land = "url('../assets/snowLand.jpg')"
  };
  
  tempDisplay.innerHTML = state.temp;
  tempDisplay.style.color = state.color;
  land.style.backgroundImage = state.land;
};

// change sky and middle
const setSkyAndMiddle = () => {
  const skyDropdown = document.getElementById('sky-dropdown');
  const sky = document.getElementById('sky');
  const middle = document.getElementById('middle');

  if (skyDropdown.value === 'Sunny') {
    state.sky = "url('../assets/sunnySky.jpg')"
    state.middle = "url('../assets/clearMiddle.jpg')"
  } else if (skyDropdown.value === 'Cloudy') {
    state.sky = "url('../assets/cloudySky.jpg')"
    state.middle = "url('../assets/cloudyMiddle.jpg')"
  } else if (skyDropdown.value === 'Rainy') {
    state.sky = "url('../assets/cloudySky.jpg')"
    state.middle = "url('../assets/rainyMiddle.jpg')"
  } else {
    state.sky = "url('../assets/cloudySky.jpg')"
    state.middle = "url('../assets/snowyMiddle.jpg')"
  };

  sky.style.backgroundImage = state.sky;
  middle.style.backgroundImage = state.middle;
};

// event listeners and triggers
const registerEventHandlers = () => {
  document.getElementById('search-btn').addEventListener("click", changeCity);
  document.getElementById('increase-temp').addEventListener("click", increaseTemp);
  document.getElementById('decrease-temp').addEventListener("click", decreaseTemp);
  document.getElementById('sky-dropdown').addEventListener("change", setSkyAndMiddle);
  document.getElementById('get-realtime-temp').addEventListener("click", getWeather);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);