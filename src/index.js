//const axios = require('axios');
//const dotenv = require('dotenv').config();
//const API_KEY = process.env.API_KEY;

//CODE FOR BUTTON:

const state = {
  tempCount: 60, //was temp
};

const addTemp = (event) => {
  state.tempCount += 1;
  console.log('the button was clicked!!!');
};

const registerEventHandlers = (event) => {
  // console.log('in registerEventHandelers:', event);
  const upButton = document.querySelector('#Up');
  console.log(upButton);
  upButton.addEventListener('click', addTemp);
};

registerEventHandlers(undefined);

//THIS WAS UNCOMMENTED. IM COMMENTING IT OUT TO GET THE BUTTONS WORKING FIRST

// ('use strict');
// //call to the flask app to get weather
// const lat = 47.6038321;
// const lon = -122.330062;
// axios
//   .get('http://127.0.0.1:5000/weather' + '?lat=' + lat + '&lon=' + lon)
//   .then((response) => {
//     var temp = response.data.main.temp;
//     temp = Math.round(((temp - 273.15) * 9) / 5 + 32); //convert to Farenheit
//     console.log(temp);
//     const appearanceHeading = document.getElementById('temperaturenumber');
//     appearanceHeading.textContent = temp + ' °F';
//   });

// async function get_temp(query) {
//   let response = await axios.get;
// }

//END UNCOMMENTED STUFF -----------

// adding temperature number
// async function f() {
//   let promise = new

// async function addTemp(event) {
//   state.tempCount += 1;
// }

// const getPromise = (time) => {
//   const timeoutTime = time * 1000;
//   const myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("It's go time!"), timeoutTime);
//   });
//   return myPromise;
// };

// state.tempCount += 1;
//   const bookCountContainer = document.querySelector("#bookCount");
//   bookCountContainer.textContent = `Book Count: ${state.bookCount}`;
// };

//registering event handler

//if loading,
