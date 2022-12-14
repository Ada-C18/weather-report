//GET THE AXIOS CALL WORKING
//LOOK AT THE 7-WONDERS CODE TO TRY TO GET THE PROMISE AND THE ASYNC AND AWAIT FUNCTION WORKING.

//CODE FOR BUTTON:

const state = {
  tempCount: 60, //was temp
};

var tempCountContainer = document.querySelector('#tempCount');
tempCountContainer.textContent = state.tempCount;

const addTemp = (event) => {
  state.tempCount += 1;
  tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = state.tempCount;
};

const subtractTemp = (event) => {
  state.tempCount -= 1;
  tempCountContainer = document.querySelector('#tempCount');
  tempCountContainer.textContent = state.tempCount;
};

const registerEventHandlers = (event) => {
  // console.log('in registerEventHandelers:', event);
  const upButton = document.querySelector('#upButton');
  const downButton = document.querySelector('#downButton');
  console.log(upButton);
  upButton.addEventListener('click', addTemp);
  downButton.addEventListener('click', subtractTemp);
  console.log(downButton);
};

registerEventHandlers(undefined);

//AXIOS CODE

// ('use strict');
//call to the flask app to get weather
const lat = 47.6038321;
const lon = -122.330062;
axios
  .get('http://127.0.0.1:5000/weather' + '?lat=' + lat + '&lon=' + lon)
  .then((response) => {
    var temp = response.data.main.temp;
    temp = Math.round(((temp - 273.15) * 9) / 5 + 32); //convert to Farenheit
    console.log(temp);
    const appearanceHeading = document.getElementById('tempCount'); //change this to query selector?
    appearanceHeading.textContent = temp + ' °F';
  })
  .catch((error) => {
    console.log(`there has been an error in the axios call.  Cause: ${error}`);
  });

// async function get_temp(query) {
//   let response = await axios.get;
// }

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
