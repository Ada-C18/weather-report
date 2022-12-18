"use strict";
// import axios from "axios";
// const { default: axios } = require("axios");


const state = {temperature: 75};
const tempVal = document.querySelector("#temp-value");
const decButton = document.getElementById("decrease-temp");
const incButton = document.getElementById("increase-temp");
const cityName = document.getElementById("city-name");
const userInput = document.getElementById("user-input");

const updateCityName = () => {
  cityName.innerHTML = userInput.value;
};

const tempColor = (temp) => {
  if (temp <= 50){
    // landscapeImg.innerHTML === "./images/cold-landscape.jpg"
    document.getElementById('landscape-image').src = './src/images/cold-landscape.jpg';
    return 'blue';
  }
  else if (temp <= 60){
    document.getElementById('landscape-image').src = './src/images/cool-landscape.jpg';
    return 'lightblue';
  }
  else if (temp <= 70){
    document.getElementById('landscape-image').src = './src/images/warm-landscape.jpg';
    return 'lightgreen';
  }
  else if (temp <= 80){
    document.getElementById('landscape-image').src = './src/images/warm-landscape.jpg';
    return 'yellow';
  }
  else {
    document.getElementById('landscape-image').src = './src/images/hot-landscape.jpg';
    return 'red';
  }
}

const registerEventHandlers = () => { 
  decButton.addEventListener("click", () => {
    tempVal.innerHTML = state.temperature;
    state.temperature -= 1;
    tempVal.style.color = tempColor(state.temperature);
  });
  
  incButton.addEventListener("click", () => {
    tempVal.innerHTML = state.temperature;
    state.temperature += 1;
    tempVal.style.color = tempColor(state.temperature);
  });
  
  updateCityName();
  userInput.addEventListener("input", updateCityName);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);



// // API Calls
// const weatherLoc = (userInput) => {
//   const getLocation = () => {
//     axios
//     .get ('http://127.0.0.1:5000/location'), {
//       params: {
//         key: 'pk.b8aab1a85295b2c1f6e71a4ed20c3120',
//         q: userInput,
//         format: 'json'
//       }
//     }
//     .then (function(response){
//       let lat = response.data[0]["lat"];
//       let lon = response.data[0]["lon"];
//       getWeather(lat, lon);
//     })
//     .catch (function(error) {
//       console.error('error in getlocation!');
//     })
//   }

//   const getWeather = (lat, lon) => {
//     axios
//     .get ('http://127.0.0.1:5000/weather'), {
//       params: {
//         appid: '76d80595e856e8e068fcdd93241e2622',
//         lat: lat,
//         lon: lon
//       }
//     }
//     .then (function(response){
//       let tempK = response.data['main']['temp'];
//       let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
//       tempVal.innerText = tempF
//     })
//     .catch (function(error) {
//       console.error('error in getWeather');
//     })
//   }
// }