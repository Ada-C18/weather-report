'use strict';

const increaseTemp = () => {
  document.querySelector('#temperatureInfo');
  state.increaseTemp += 1;
  document.querySelector('#temperatureValue');
  temperatureInfo.textContent = `${state.increaseTemp}`;
};
