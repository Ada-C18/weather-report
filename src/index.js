'use strict';

// make body background reactive to state of temp counter

const state = {
  tempCount: 0,
};

const changeTempColor = () => {
  let temp = state.tempCount;
  if (temp <= 49) {
    document.getElementById('tempCounter').style.color = 'teal';
  } else if (temp <= 59) {
    document.getElementById('tempCounter').style.color = 'green';
  } else if (temp <= 69) {
    document.getElementById('tempCounter').style.color = 'yellow';
  } else if (temp <= 79) {
    document.getElementById('tempCounter').style.color = 'orange';
  } else {
    document.getElementById('tempCounter').style.color = 'red';
  }
};

const changeBackground = () => {
  let temp = state.tempCount;
  if (temp <= 59) {
    document.body.style.backgroundImage = "url('./assets/59_or_below.jpeg')";
  } else if (temp <= 69) {
    document.body.style.backgroundImage = "url('./assets/69_or_below.jpeg')";
  } else if (temp <= 79) {
    document.body.style.backgroundImage = "url('./assets/79_or_below.jpeg')";
  } else {
    document.body.style.backgroundImage = "url('./assets/80_and_above.png')";
  }
};

const addDegree = () => {
  state.tempCount += 1;
  const tempCounter = document.querySelector('#tempCounter');
  tempCounter.textContent = `${state.tempCount} \u00B0`;
  changeTempColor();
  changeBackground();
  console.log(state.tempCount);
};
const removeDegree = () => {
  state.tempCount -= 1;
  const tempCounter = document.querySelector('#tempCounter');
  tempCounter.textContent = `${state.tempCount} \u00B0`;
  changeTempColor();
  changeBackground();
};

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', addDegree);
  // increaseTempButton.addEventListener('click', changeBackground);

  const decreaseTempButton = document.querySelector('#decreaseTempButton');
  decreaseTempButton.addEventListener('click', removeDegree);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
