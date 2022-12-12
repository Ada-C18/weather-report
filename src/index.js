"use strict";

const current = {
  city: 'Chicago',
  temp: 65,
  skyChoice: 'cloudy',
  color: 'red',
  sky: "url('../assets/cloudySky.jpg')",
  middle: "url('../assets/snowyMiddle.jpg')",
  land: "url('../assets/snowLand.jpg')",
};

// change selected city
const changeCity = () => {
  const cityDisplay = document.getElementById('city-display');
  const searchBox = document.getElementById('searchbox')
  
  current.city = searchBox.value;
  cityDisplay.innerHTML = current.city
};

// increase temp
const increaseTemp = () => {
  current.temp++;
  setColorAndLand();
};

// decrease temp
const decreaseTemp = () => {
  current.temp--;
  setColorAndLand();
};

// change temp display, color and land
const setColorAndLand = () => {
  const tempDisplay = document.getElementById('temp-display');
  const land = document.getElementById('land');

  if (current.temp >= 90) {
    current.color = 'red';
    current.land = "url('../assets/desertLand.jpg')"
  } else if (current.temp >= 70 && current.temp < 90) {
    current.color = 'orange';
    current.land = "url('../assets/beachLand.jpg')"
  } else if (current.temp >= 55 && current.temp < 70) {
    current.color = 'yellow';
    current.land = "url('../assets/warmLand.jpg')"
  } else if (current.temp >= 40 && current.temp < 55) {
    current.color = 'green';
    current.land = "url('../assets/coldLand.jpg')"
  } else {
    current.color = 'teal';
    current.land = "url('../assets/snowLand.jpg')"
  };
  
  tempDisplay.innerHTML = current.temp;
  tempDisplay.style.color = current.color;
  land.style.backgroundImage = current.land;
};

// change sky and middle
const setSkyAndMiddle = () => {
  const skyDropdown = document.getElementById('sky-dropdown');
  const sky = document.getElementById('sky');
  const middle = document.getElementById('middle');

  console.log(skyDropdown.value)

  if (skyDropdown.value === 'Sunny') {
    current.sky = "url('../assets/sunnySky.jpg')"
    current.middle = "url('../assets/clearMiddle.jpg')"
  } else if (skyDropdown.value === 'Cloudy') {
    current.sky = "url('../assets/cloudySky.jpg')"
    current.middle = "url('../assets/cloudyMiddle.jpg')"
  } else if (skyDropdown.value === 'Rainy') {
    current.sky = "url('../assets/cloudySky.jpg')"
    current.middle = "url('../assets/rainyMiddle.jpg')"
  } else {
    current.sky = "url('../assets/cloudySky.jpg')"
    current.middle = "url('../assets/snowyMiddle.jpg')"
  };

  sky.style.backgroundImage = current.sky;
  middle.style.backgroundImage = current.middle;
};

// event listeners and triggers
const registerEventHandlers = () => {
  document.getElementById('search-btn').addEventListener("click", changeCity);
  document.getElementById('increase-temp').addEventListener("click", increaseTemp);
  document.getElementById('decrease-temp').addEventListener("click", decreaseTemp);
  document.getElementById('sky-dropdown').addEventListener("change", setSkyAndMiddle);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);