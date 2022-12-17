"use strict";
// import axios from "axios";
// const { default: axios } = require("axios");

const state = {temperature: 0};
const tempValue = document.querySelector("#temp-value");
state.temperature = Number(tempValue.innerText);
const landscape = document.getElementById('#weather-landscape-section');

const tempRange = tempValue => {
  if (num < 50) {
    landscape.innerHTML = "./assests/cold-landscape.jpg"
    return 'teal'
  }
}

// const increaseTemp = () => {
//   tempValue.innerText = state.temperature;
//   state.temperature += 1;
//   console.log("It's working!");
// }
// const decreaseTemp = () => {
//   tempValue.innerText = state.temperature;
//   state.temperature -= 1;
//   console.log("It's working!");
// }

// const registerEventHandlers = () => {
//   const decButton = document.querySelector("#decrease-temp");
//   decButton.addEventListener("click", decreaseTemp);

//   const incButton = document.querySelector("#increase-temp");
//   incButton.addEventListener("click", increaseTemp);
// };


const registerEventHandlers = () => {
  const decButton = document.querySelector("#decrease-temp");
  decButton.addEventListener("click", () => {

  });

  const incButton = document.querySelector("#increase-temp");
  incButton.addEventListener("click", increaseTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);

// API Calls
const weatherLoc = (userInput) => {
  const getLocation = () => {
    axios
    .get ('http://127.0.0.1:5000/location'), {
      params: {
        key: 'pk.b8aab1a85295b2c1f6e71a4ed20c3120',
        q: userInput,
        format: 'json'
      }
    }
    .then (function(response){
      let lat = response.data[0]["lat"];
      let lon = response.data[0]["lon"];
      getWeather(lat, lon);
    })
    .catch (function(error) {
      console.error('error in getlocation!');
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
      let tempK = response.data['main']['temp'];
      let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
      tempValue.innerText = tempF
    })
    .catch (function(error) {
      console.error('error in getWeather');
    })
  }
}