"use strict";

// const { default: axios } = require("axios");

const state = {
  temp: 75, // starting temp
  clicked: false, // whether the temp increase button is in clicked state
  city: "Chattanooga" // default city
};

// EVENT HANDLERS

// INCREASE TEMP BY 1 DEGREE
const increaseDreamTemp = () => {
  const dreamTemp = document.getElementById("dream-temp-number");
  state.temp += 1;
  dreamTemp.textContent = state.temp;
};

// DECREASE TEMP BY 1 DEGREE
const decreaseDreamTemp = () => {
  const dreamTemp = document.getElementById("dream-temp-number");
  state.temp -= 1;
  dreamTemp.textContent = state.temp;
};

// UPDATE TEMP TEXT COLOR DEPENDING ON TEMP RANGE
const updateDreamTempColor = () => {
  const dreamTemp = document.querySelector("#dream-temp-number");
  const tempCircle = document.querySelector("#circle");

  if (state.temp >= 80) {
    dreamTemp.style.color = "#E0392D";
    tempCircle.style.backgroundColor = "#E0392D";
  } else if (70 <= state.temp && state.temp <= 79) {
    dreamTemp.style.color = "#E0571D";
    tempCircle.style.backgroundColor = "#E0571D";
  } else if (60 <= state.temp && state.temp <= 69) {
    dreamTemp.style.color = "#F09104";
    tempCircle.style.backgroundColor = "#F09104";
  } else if (50 <= state.temp && state.temp <= 59) {
    dreamTemp.style.color = "blue";
    tempCircle.style.backgroundColor = "blue";
  } else if (state.temp <= 49) {
    dreamTemp.style.color = "purple";
    tempCircle.style.backgroundColor = "purple";
  }
};

// CHANGE THE CITY NAME IN TITLE AND SEARCH BAR INPUT SIMULTANEOUSLY
const changeCityNameWithInput = () => {
  const cityTitle = document.getElementById("city-title");
  const cityInput = document.getElementById("search-bar").value;

  cityTitle.textContent = cityInput;
};

// AXIOS REQUESTS
// REQUEST LOCATION AND WEATHER FOR CITY FROM WEATHER PROXY SERVER
const getCurrentWeather = () => {
  // console.log("I'm inside getCurrentWeather!");
  const cityInput = document.getElementById("search-bar").value;
  
  return axios.get('http://127.0.0.1:5000/location', {params: {q: cityInput}
  })
  .then(location => {
    // console.log("location:", location);
    // console.log("lat", location.data[0].lat);
    // console.log("lon", location.data[0].lon)
    return {
      lat: location.data[0].lat,
      lon: location.data[0].lon
    }
  })
  .then(coordinates => {
    // console.log("coordinates.lat:", coordinates.lat);
    // console.log("coordinates.lon:", coordinates.lon)
    return axios.get('http://127.0.0.1:5000/weather', {
                                                        params: 
                                                        {lat: coordinates.lat,
                                                        lon: coordinates.lon}
                                                      })
  })
  .then(weather => {
    console.log("weather:", weather)
    return weather;
  })
};

// UPDATE DEFAULT CITY TEMP TO CURRENT TEMP FROM WEATHER RESULT
const updateDefaultTemp = () => {}


// REGISTER EVENT HANDLERS
const registerEventHandlers = () => {
  const tempIncreaseButton = document.getElementById("temp-increase-button");
  tempIncreaseButton.addEventListener("click", increaseDreamTemp);
  tempIncreaseButton.addEventListener("click", updateDreamTempColor);

  const tempDecreaseButton = document.getElementById("temp-decrease-button");
  tempDecreaseButton.addEventListener("click", decreaseDreamTemp);
  tempDecreaseButton.addEventListener("click", updateDreamTempColor);

  const searchBar = document.getElementById("search-bar");
  searchBar.addEventListener("input", changeCityNameWithInput);
  
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", getCurrentWeather);

};

// DOM listener
document.addEventListener("DOMContentLoaded", registerEventHandlers);