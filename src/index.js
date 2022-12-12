'use strict';

// import "./styles/index.css";
// tempUp
// - change display temperature (increase by 1 per click)
// - check current temp and if range changes, change landscape

// const upButton = document.getElementByID('temp-up');
// const downButton = document.getElementById('temp-down');

const state = {
  city: 'Seattle',
  lat: 47.6038321,
  long: -122.3300624,
  temp: 50,
};

//need funciton to get long, lat of whatever city is inputted
//need function to get the actual temperature of that city (pass info along to weather api)

//need function to update the display on the website

const getFarenheit = (kelvin) => {
  let temp;
  temp = 1.8 * (kelvin - 273) + 32;
  return temp;
};
const getLongLat = () => {
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: { q: state.city },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success!', latitude, longitude);
      state.lat = latitude;
      state.long = longitude;
      getWeather();
    })
    .catch((error) => {
      console.log(
        `error in finding the latitude and longitude of ${state.city} `
      );
    });
};

const getWeather = () => {
  let kelvin;
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: { lat: state.lat, lon: state.long },
    })
    .then((response) => {
      kelvin = response.data['main']['temp'];
      state.temp = Math.floor(getFarenheit(kelvin));
      tempGroundColorChange();
    })
    .catch((error) => {
      console.log(`error in getting weather of ${state.city}`);
    });
};

const tempUp = () => {
  state.temp += 1;
  // console.log(state.temp);
  tempGroundColorChange();
};

const tempDown = () => {
  state.temp -= 1;
  // console.log(state.temp);
  tempGroundColorChange();
};

const tempGroundColorChange = () => {
  let temp = state.temp;
  // console.log(temp);
  let color = 'green';
  let landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';

  if (temp >= 80) {
    color = 'red';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (70 <= temp && temp <= 79) {
    color = 'orange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (60 <= temp && temp <= 69) {
    color = 'brown';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (50 <= temp && temp <= 59) {
    color = 'green';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    color = 'purple';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }

  const landscapeDisplay = document.getElementById('ground-display');
  landscapeDisplay.textContent = landscape;
  const displayTemp = document.getElementById('temp');
  displayTemp.style.color = color;
  displayTemp.textContent = String(state.temp);
};

const resetName = () => {
  let cityReset = document.getElementById("city-name-input");
  cityReset.value = "Seattle";
  changeName();

  // state.city = 'Seattle';
  // let name = document.getElementById('city-name-display');
  // name.textContent = state.city;
  // let newName = document.getElementById('city-name-input');
  // newName.value = state.city;
};

const changeName = () => {
  let name = document.getElementById('city-name-display');
  let newName = document.getElementById('city-name-input'); //newName = inputName
  
  state.city = newName.value;
  name.textContent = state.city;
};

const changeSky = () => {
  const skyDisplay = document.getElementById('sky-display');
  const skyBackground = document.getElementById('landscape-display');
  const skyChoice = document.getElementById('sky-choice').value;
  let skyEmoji;
  let skyColor;

  // console.log(skyDisplay);
  // console.log(skyBackground);
  // console.log(skyChoice);

  if (skyChoice === 'Sunny') {
    skyEmoji = '☁️ ☁️ ☀️ ☁️ ☁️';
    skyColor = '#cbedfb';
  } else if (skyChoice === 'Cloudy') {
    skyEmoji = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    skyColor = '#b0e0e6';
  } else if (skyChoice === 'Rainy') {
    skyEmoji = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    skyColor = '#B0C4DE';
  } else if (skyChoice === 'Snowy') {
    skyEmoji = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    skyColor = '#F0F8FF';
  }

  skyDisplay.textContent = skyEmoji;
  skyBackground.style.backgroundColor = skyColor;
};

const registerEvents = () => {
  tempGroundColorChange();

  const upButton = document.getElementById('temp-up');
  upButton.addEventListener('click', tempUp);
  const downButton = document.getElementById('temp-down');
  downButton.addEventListener('click', tempDown);
  const getRealTime = document.getElementById('real-time-temp');
  getRealTime.addEventListener('click', getLongLat);

  changeName();
  const input = document.getElementById('city-name-input');
  input.addEventListener('input', changeName);

  const reset = document.getElementById('reset');
  reset.addEventListener('click', resetName);

  const skyElement = document.getElementById('sky-choice');
  skyElement.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEvents);
