// "use strict";
// import axios from "axios";
// const { default: axios } = require("axios");


const tempDisplay = document.querySelector("#temp-display");
const state = {temperature: 0};

const incButton = document.querySelector("#increase-temp");
const decButton = document.querySelector("#decrease-temp");

const increaseTemp = () => {
  state.temperature += 1;
  console.log("It's working!");
  tempDisplay.innerText = state.temperature;
}

const registerEventHandlers = () => {
  const incButton = document.getElementById("#increase-temp");
  incButton.addEventListener("click", increaseTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);

// API Calls
const weatherLoc = (cityName) => {
  const getLocation = () => {
    axios
    .get ('http://127.0.0.1:5000/location'), {
      params: {
        key: 'pk.b8aab1a85295b2c1f6e71a4ed20c3120',
        q: cityName,
        format: 'json'
      }
    }
    .then (function(response){
      let lat = response.data[0]["lat"];
      let lon = response.data[0]["lon"];
      getWeather(lat, lon);
    })
    .catch (function(error) {
      console.error(error);
    })
  }

  const getWeather = (lat, lon) => {
    axios
    .get ('http://127.0.0.1:5000/weather'), {
      params: {
        appid: '76d80595e856e8e068fcdd93241e2622',
        lat: lat,
        lon: lon
      }
    }
    .then (function(response){
      let kelvinTemp = response.data['main']['temp'];
      let farhTemp = Math.round((kelvinTemp - 273.15) * 1.8) + 32;
      // VARIABLE.innerText = farhTemp
    })
    .catch (function(error) {
      console.error(error);
    })
  }
}