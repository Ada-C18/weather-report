'use strict';

// make body background reactive to state of temp counter

const state = {
  tempCount: 0,
};

const addDegree = () => {
  state.tempCount += 1;
  const tempCounter = document.querySelector('#tempCounter');
  tempCounter.textContent = `${state.tempCount} \u00B0`;
};
const removeDegree = () => {
  state.tempCount -= 1;
  const tempCounter = document.querySelector('#tempCounter');
  tempCounter.textContent = `${state.tempCount} \u00B0`;
};

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', addDegree);

  const decreaseTempButton = document.querySelector('#decreaseTempButton');
  decreaseTempButton.addEventListener('click', removeDegree);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
