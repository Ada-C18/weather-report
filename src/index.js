'use strict';

const state = {
  temp: 65,
  city: "Seattle",
  lat: 47.6038321,
  long: -122.330062
};


const increaseTemp = () => {
  state.temp++;
  changeTempColorAndGardenLandscape();
};


const decreaseTemp = () => {
  state.temp--;
  changeTempColorAndGardenLandscape();
}


const changeTopCityName = () => {
  const inputCityName = document.getElementById("name").value;
  const topCityName = document.getElementById("city_name");
  state.city = inputCityName;
  topCityName.textContent = state.city;
};


const resetCityInput = () => {
  const cityNameInput = document.getElementById("name");
  cityNameInput.value = "Seattle";
  changeTopCityName();
};


const changeTempColorAndGardenLandscape = () => {
  let temp = state.temp;
  let tempColor = "";
  let landscape = "";
  if (temp > 80) {
    tempColor = "red-text";
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp > 70) {
    tempColor = "orange-text";
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp > 60) {
    tempColor = "yellow-text";
    landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (temp > 50) {
    tempColor = "green-text";
    landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else {
    tempColor = "teal-text";
    landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  }

  const currentTemp = document.getElementById('temp_value');
  currentTemp.textContent = state.temp
  currentTemp.className = tempColor;

  const currentLandscape = document.getElementById('landscape');
  currentLandscape.textContent = landscape;
};


const changeSkyImage = () => {
  let skyDisplay = "";
  let backgroundColor = "orange-background";
  const selectedSky = document.getElementById('select_sky').value;
  const currentSkyImage = document.getElementById('sky_image');
  const currentGarden = document.getElementById('garden_pic');
  if (selectedSky === 'sunny') {
    skyDisplay = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
    backgroundColor = "orange-background";
  } else if (selectedSky === 'cloudy') {
    skyDisplay = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️"; 
    backgroundColor = "gray-background";
  } else if (selectedSky === 'rainy') {
    skyDisplay = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
    backgroundColor = "green-background";
  } else if (selectedSky === 'snowy') {
    skyDisplay = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
    backgroundColor = "pink-background";
  }

  currentSkyImage.textContent = skyDisplay;
  currentGarden.className = backgroundColor;
}


const findLocLatAndLon = () => {
  axios.get("http://127.0.0.1:5000/location", {
    params: {
      q: state.city
    }
  })
  .then((response) => {
    state.lat = response.data[0].lat;
    state.long = response.data[0].lon;
    retrieveWeather();
  })
  .catch((error) => {
    console.log("Error: Cannot retrieve latitude and longitude");
    console.log(error);
  });
};

const retrieveWeather = () => {
  axios.get("http://127.0.0.1:5000/weather", {
    params: {
      lat: state.lat,
      lon: state.long
    }
  })
  .then((response) => {
    const currentWeather = response.data;
    console.log(currentWeather);
    state.temp = Math.round(tempUnitConvert(currentWeather.main.temp));
    changeTempColorAndGardenLandscape();
  })
  .catch((error) => {
    console.log("Error: Cannot retrieve weather");
    console.log(error);
  })
};


const tempUnitConvert = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32; 
}



const registerEventHandlers = (event) => {
  const increaseButton = document.querySelector("#increase_temp");
  increaseButton.addEventListener('click', increaseTemp);

  const decreaseButton = document.querySelector('#decrease_temp');
  decreaseButton.addEventListener('click', decreaseTemp);

  const changeCityNameInHeader = document.querySelector('#name');
  changeCityNameInHeader.addEventListener('input', changeTopCityName);

  const resetCityNameBackToSeattle = document.getElementById('reset_button');
  resetCityNameBackToSeattle.addEventListener('click', resetCityInput);

  const getRealTimeTemp = document.getElementById('realtime_temp');
  getRealTimeTemp.addEventListener('click', findLocLatAndLon);

  const changeSkyDisplay = document.getElementById('select_sky');
  changeSkyDisplay.addEventListener('change', changeSkyImage)
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);