const state = {
  temperature: 70,
};

const tempUp = () => {
  state.temperature += 1;
  changeTempAndLandscape();
};

const tempDown = () => {
  state.temperature -= 1;
  changeTempAndLandscape();
};

const changeTempAndLandscape = () => {
  const temp = state.temperature;

  let color;
  let landscape;
  if (temp >= 80) {
    color = 'red';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    color = 'orange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    color = 'yellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 50) {
    color = 'green';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    color = 'lightblue';
    landscape = '🌲🌲⛄️🌲⛄️🥶🌲🌲🌲🌲⛄️🥶🌲';
  }

  const tempContainer = document.getElementById('temp-value');
  tempContainer.textContent = temp;
  tempContainer.style.color = color;

  const landscapeContainer = document.getElementById('landscape');
  landscapeContainer.textContent = landscape;
};

const changeSky = () => {
  const skyValue = document.getElementById('sky-emojis').value;

  let skyEmojis;
  if (skyValue === 'Cloudy') {
    skyEmojis = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyValue === 'Sunny') {
    skyEmojis = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (skyValue === 'Rainy') {
    skyEmojis = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyValue === 'Snowy') {
    skyEmojis = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }

  const skyContainer = document.getElementById('sky');
  skyContainer.textContent = skyEmojis;
};

const registerEventHandlers = () => {
  const increaseTemp = document.getElementById('temp-up');
  increaseTemp.addEventListener('click', tempUp);

  const decreaseTemp = document.getElementById('temp-down');
  decreaseTemp.addEventListener('click', tempDown);

  const selectSky = document.getElementById('sky-emojis');
  selectSky.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

const changeCityName = () => {
    const newName = document.getElementById("cityname").value;
    document.getElementById("greeting").innerHTML = `For the lovely city of ${newName}!`;
};

const resetCityName = () => {
    document.getElementById("greeting").innerHTML = "Input a city below for a custom experience!"
}