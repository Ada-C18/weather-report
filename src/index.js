'use strict';

const { default: axios } = require("axios");

// State, city, temp, sky

const state = {
  city: 'Seattle',
  lat:
  long: 
  temp: 
};


const findLatAndLong = () => {
axios
  .get('', 
  params: {
    q: state.lat
  })
  .then((response) => {
    console.log(response.data);
    state.lat = response.data[0].lat;
    state.long = response.data[0].lon;


};
const findWeather = () => {
  axios
    .get('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}',{ 
    params: {
      lat: state.lat,
      lon: state.long
    })
  };


// Increase/Decrease temperature
const increaseTemp = () => {
  let count = 0;
  count++;
  const upButton = document.getElementById('up');
  const downButton = document.getElementById('down');
  let display = document.getElementById('tempNum');

  upButton.addEventListener('click', function () {
    count++;
    display.textContent = count;
  });
  downButton.addEventListener('click', function () {
    count--;
    display.textContent = count;
  });
  // increaseTemp.addEventListener("click", incrementCount);
};

// const decreaseTemp = () => {
//   i--;
//   document.getElementById('down').value = i;
// }
// Temperature number and background changes depending on number

// const tempColorChange = () => {

// }

// // Depending on what temperature it is, a different landscape should appear on the page.

// const

// // Changing landscapes should replace the existing landscape. There should only be one visible landscape at a time.

// // There must be at least four landscapes.

// // Reset city button
// const resetCity = () => {
//   formElement.reset()
// }
