//const axios = require('axios');
//const dotenv = require('dotenv').config();
//const API_KEY = process.env.API_KEY;

('use strict');
//call to the flask app to get weather
const lat = 47.6038321;
const lon = -122.330062;

//later, change
axios
  .get('http://127.0.0.1:5000/weather' + '?lat=' + lat + '&lon=' + lon)
  .then((response) => {
    var temp = response.data.main.temp;
    temp = Math.round(((temp - 273.15) * 9) / 5 + 32); //convert to Farenheit
    console.log(temp);
    const appearanceHeading = document.getElementById('temperaturenumber');
    appearanceHeading.textContent = temp + ' °F';
  });

const state = {
  tempCount: temp,
};

// adding temperature number
// async function f() {
//   let promise = new

// async function addTemp(event) {
//   state.tempCount += 1;
// }

const addTemp = (event) => {
  state.tempCount += 1;
};
const registerEventHandlers = (event) => {
  // console.log('in registerEventHandelers:', event);
  const upButton = document.querySelector('#Up');
  upButton.addEventListener('click', addtemp);
};

// state.tempCount += 1;
//   const bookCountContainer = document.querySelector("#bookCount");
//   bookCountContainer.textContent = `Book Count: ${state.bookCount}`;
// };

//registering event handler

//if loading,
