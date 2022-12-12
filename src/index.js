"use strict";

const state = {
  temp: 72,
  city: "Seattle",
  lat:  "47.6038321",
  lon: "-122.330062",
}

// display changes

const tempChange = () => {
  let color = "red";
  let temp = state.temp
  if (temp > 80) {
    color = "red";
  } else if (temp > 70) {
    color = "orange";
  } else if (temp > 60) {
    color = "yellow";
  } else if (temp > 50) {
    color = "green";
  } else {
    color = "blue";
  }

  temp = document.getElementById("displayedTemp");
  temp.className = color;
  temp.textContent = String(state.temp)

  console.log("clicked");
}

const landscapeChange = () => {
  let temp = state.temp;
  let landscape = "hot!"
  if (temp > 80) {
    landscape = "hot hot!";
  } else if (temp > 70) {
    landscape = "warmm";
  } else if (temp > 60) {
    landscape = "nice";
  } else if (temp > 50) {
    landscape = "cool";
  } else {
    landscape = "**shiver shiver**";
  }

  const updatedLandscape = document.getElementById("skyAndLandscape");
  updatedLandscape.textContent = landscape;
}

const increasedTemp = () => {
  state.temp += 1;
  tempChange();
  landscapeChange();
}

const decreasedTemp = () => {
  state.temp -= 1;
  tempChange();
  landscapeChange();
}

const cityNameChange = () => {
  let currentCity = document.getElementById("currentCity");
  let newCity = document.getElementById("newCity").value;
  state.city = newCity;
  currentCity.textContent = state.city;
  console.log("inputted city");
}

const resetCity = () => {
  let newCityInput = document.getElementById("newCity");
  newCityInput.value = "Seattle";
  cityNameChange();
  console.log("reset city");
}

// API Calls

const toFahrenheit = (k) => (k - 273.15) * (9 / 5) + 32;

const getWeather = () => {
  axios
    .get("http://127.0.0.1:5000/weather", {
      params: {
        lat: state.lat,
        lon: state.lon,
      }
    })
    .then( (response) => {
      const weather = response.data;
      const cityTemp = Math.round(toFahrenheit(weather.main.temp));
      state.temp = cityTemp
      console.log("success!!", response.status);
      tempChange();
      landscapeChange();
    })
    .catch( (error) => {
      console.log("weather error", 
      error.status, error.response);
    })
}

const getLatAndLon = () => {
  let lat, lon;
  axios
    .get("http://127.0.0.1:5000/location", {
      params: {
        q: state.city,
        format: "json",
      }
    })
    .then( (response) => {
      lat = response.data[0].lat;
      lon = response.data[0].lon;
      console.log("success!!", response.status);
      state.lat = lat;
      state.lon = lon;
      getWeather();
    })
    .catch( (error) => {
      console.log("location error", 
      error.status, error.response);
    })
}

// Event Listeners

const registerEventHandlers = () => {
  tempChange();
  landscapeChange();
  cityNameChange();

  const increasedTempButton = document.getElementById("increaseTemp");
  increasedTempButton.addEventListener("click", increasedTemp);

  const decreasedTempButton = document.getElementById("decreaseTemp");
  decreasedTempButton.addEventListener("click", decreasedTemp);

  const cityNameChangeInput = document.getElementById("newCity");
  cityNameChangeInput.addEventListener("input", cityNameChange);

  const resetCityButton = document.getElementById("changeCity");
  resetCityButton.addEventListener("click", resetCity);

  const realTimeTemp = document.getElementById("tempRequest");
  realTimeTemp.addEventListener("click", getLatAndLon);

  console.log("loaded successfully");
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);