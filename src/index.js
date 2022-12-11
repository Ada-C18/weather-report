// import axios from 'axios';
'use strict';

const state = {
  clickCount: 0, // # of clicks
  clicked: false, // whether the click me box is in its clicked state
};

// we could add references to the various elements to our state
// add look them up only once, rather than every time each
// function is called!

const plusClickCount = () => {
  const plusContainer = document.getElementById('Temperature');
  state.clickCount += 1;
  plusContainer.textContent = state.clickCount;
  changeColor();
  changeLandscape();
};

const minusClickCount = () => {
  const minusContainer = document.getElementById('Temperature');
  state.clickCount -= 1;
  minusContainer.textContent = state.clickCount;
  changeColor();
  changeLandscape();
};

//making text color different
const changeColor = () => {
  const tempColor = document.querySelector('#Temperature');
  if (state.clickCount < 49) {
    tempColor.classList.add('teal');
  } else if (state.clickCount >= 50 && state.clickCount < 59) {
    tempColor.classList.add('green');
  } else if (state.clickCount >= 60 && state.clickCount < 69) {
    tempColor.classList.add('yellow');
  } else if (state.clickCount >= 70 && state.clickCount < 79) {
    tempColor.classList.add('orange');
  } else if (state.clickCount >= 80) {
    tempColor.classList.add('red');
  }
};
// change landscape
const changeLandscape = () => {
  // Create a new image and set its attribute
  const newLS = document.createElement('img');
  const newLandscape = document.querySelector('#landscape');

  if (state.clickCount < 59) {
    newLS.src = `assets/cold.jpeg`;
  } else if (state.clickCount >= 60 && state.clickCount < 69) {
    newLS.src = `assets/cool.jpeg`;
  } else if (state.clickCount >= 70 && state.clickCount < 79) {
    newLS.src = `assets/warm.jpeg`;
  } else if (state.clickCount >= 80) {
    newLS.src = `assets/hot.jpeg`;
  }

  newLandscape.prepend(newLS);
};
const input = document.querySelector('input');
const log = document.getElementById('values');

input.addEventListener('input', updateValue);

function updateValue(e) {
  log.textContent = e.target.value;
}

const registerEventHandlers = () => {
  const hotterButton = document.getElementById('plusButton');
  hotterButton.addEventListener('click', plusClickCount);
  const coolerButton = document.getElementById('minusButton');
  coolerButton.addEventListener('click', minusClickCount);
  // const reset = document.getElementById('resetButton');
  // reset.addEventListener('click', resetClickCount);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
