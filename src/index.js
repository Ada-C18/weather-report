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

//logic for temperture color to change
const changeTempNumColor = () => {
  let temp = state.defaultTemp;
  if (temp >= 80) {
    document.getElementById('currentTemp').className = 'red';
  } else if (temp >= 70 && temp <= 79) {
    document.getElementById('currentTemp').className = 'orange';
  } else if (temp >= 60 && temp <= 69) {
    document.getElementById('currentTemp').className = 'yellow';
  } else if (temp >= 50 && temp <= 59) {
    document.getElementById('currentTemp').className = 'green';
  } else {
    document.getElementById('currentTemp').className = 'teal';
  }
};

// event handlers and listeners
const registerEventHandlers = (event) => {
  const decreaseTempButton = document.querySelector('#decreaseTemp');
  decreaseTempButton.addEventListener('click', minusTemp);

  const increaseTempButton = document.querySelector('#increaseTemp');
  increaseTempButton.addEventListener('click', addTemp);
  console.log('click click!!');
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
