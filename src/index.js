"use strict";
// import axios from "axios";
// const { default: axios } = require("axios");

// const state = {temperature: 75};
// const tempVal = document.querySelector("#temp-value");
// state.temperature = Number(tempVal.innerText);
// let stateTemp = state["temperature"]
const state = {temperature: 75};
const tempVal = document.querySelector("#temp-value");
state.temperature = Number(tempVal.innerText);
let stateTemp = state["temperature"]
const decButton = document.getElementById("decrease-temp");
const incButton = document.getElementById("increase-temp");

const tempColor = (temp) => {
  if (temp < 50){
    return 'lightgreen';
  }
  else if (temp < 60){
    return 'green';
  }
  else if (temp < 70){
    return 'yellow';
  }
  else if (temp < 80){
    return 'orange';
  }
  else {
    return 'red';
  }
}

const registerEventHandlers = () => { 
  decButton.addEventListener("click", () => {
    tempVal.innerHTML = stateTemp;
    stateTemp -= 1;
    tempVal.style.color = tempColor(Number(stateTemp));
  });

  incButton.addEventListener("click", () => {
    tempVal.innerHTML = stateTemp;
    stateTemp += 1;
    tempVal.style.color = tempColor(Number(stateTemp));
  });

 } 

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