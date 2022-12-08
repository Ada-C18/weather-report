// const axios = require('axios');

// Temperature Variables
let counterDisplayElem = document.getElementById('temp-count');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');

let landscapeElem = document.getElementById('landscape');

// Temperature Helper Function
const changeColor = (obj1, obj2) => {
  if (obj1.innerHTML < 50) {
    obj1.className = 'teal';
    obj2.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (obj1.innerHTML < 60) {
    obj1.className = 'green';
    obj2.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂';
  } else if (obj1.innerHTML < 70) {
    obj1.className = 'yellow';
    obj2.innerHTML = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (obj1.innerHTML < 80) {
    obj1.className = 'orange';
    obj2.innerHTML = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (obj1.innerHTML >= 80) {
    obj1.className = 'red';
    obj2.innerHTML = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};

// Helper for City Submit Bar
const handleSubmitButton = () => {
  let submitValue = document.getElementById('submit-city').value;
  document.getElementById('header-city-name').textContent = submitValue;
  console.log('helper function');
};

const registerEventHandlers = () => {
  // Create "handle" helper functions to put into the registereventhandler
  //Temperature
  counterPlusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML++;
    changeColor(counterDisplayElem, landscapeElem);
  });

  counterMinusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML--;
    changeColor(counterDisplayElem, landscapeElem);
  });

  // City Submit Bar
  let submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', handleSubmitButton);
  console.log('event handler');
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// Axios calls to proxy server
// const API = 'http://127.0.0.1:5000/location';

// const getInfo = (location) => {
//   axios
//     .get(API, { params: { q: location, format: 'json' } })
//     .then((result) => {
//       const lat = result.data[0].lat;
//       const lon = result.data[0].lon;
//       console.log(`${location} lat: ${lat} lon: ${lon}`);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//};

// handle get real time temp
//event listener
