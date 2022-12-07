// logic to change temperature using the buttons
const state = {
  defaultTemp: 45,
};

const addTemp = (event) => {
  state.defaultTemp += 1;
  const tempControl = document.querySelector('#currentTemp');
  tempControl.textContent = state.defaultTemp;
  changeTempNumColor();
};

const minusTemp = (event) => {
  state.defaultTemp -= 1;
  const tempControl = document.querySelector('#currentTemp');
  tempControl.textContent = state.defaultTemp;
  changeTempNumColor();
};

//HELPER FUNCTION logic for temperture color to change
const changeTempNumColor = () => {
  let temp = state.defaultTemp;
  const skyElement = document.querySelector('#sky');
  const landScapeElement = document.querySelector('#gardenlandscape');

  if (temp >= 80) {
    document.getElementById('currentTemp').className = 'red';
    skyElement.textContent = '🔥🥵🌞🔥🥵🌞🔥🥵🌞';
    landScapeElement.textContent = '👙🩳⛱🏝🌊👙🩳⛱🏝🌊👙🩳⛱🏝🌊'
  } else if (temp >= 70 && temp <= 79) {
    document.getElementById('currentTemp').className = 'orange';
    skyElement.textContent = '🌤☁️🌤☁️🌤☁️🌤☁️🌤☁️';
    landScapeElement.textContent = '🌻🌹🍉🌻🌹🍉🌻🌹🍉🌻🌹🍉🌻🌹🍉'
  } else if (temp >= 60 && temp <= 69) {
    document.getElementById('currentTemp').className = 'yellow';
    skyElement.textContent = '☁️🌥☁️🌥☁️🌥☁️🌥☁️🌥';
    landScapeElement.textContent = '🌧☔️🌈🌧☔️🌈🌧☔️🌈🌧☔️🌈'
  } else if (temp >= 50 && temp <= 59) {
    document.getElementById('currentTemp').className = 'green';
    skyElement.textContent = '☁️☁️☁️☁️🌥☁️☁️☁️☁️';
    landScapeElement.textContent = '🍁🍂🌲🌳🍁🍂🌲🌳🍁🍂🌲🌳'
  } else {
    document.getElementById('currentTemp').className = 'teal';
    skyElement.textContent = '☁️🌧❄️☁️🌧❄️☁️🌧❄️☁️🌧❄️';
    landScapeElement.textContent = '☃️🧤🥶🏔☃️🧤🎄🥶🏔☃️🧤🥶🏔'
  }
};

//HELPER FUNCTION TO CHANGE SKY AND LANDSCAPE

// const changeSkyAndLandscape = () =>{
//   const skyElement = document.querySelector('#sky');
//   const landScapeElement = document.querySelector('#landscape');

//   let temp = 
// }

// event handlers and listeners
const registerEventHandlers = (event) => {
  const decreaseTempButton = document.querySelector('#decreaseTemp');
  decreaseTempButton.addEventListener('click', minusTemp);

  const increaseTempButton = document.querySelector('#increaseTemp');
  increaseTempButton.addEventListener('click', addTemp);
  console.log('click click!!');
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
