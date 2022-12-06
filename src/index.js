const state = {
  defaultTemp: 45,
};

const addTemp = (event) => {
  state.defaultTemp += 1;
  const tempControl = document.querySelector('#currentTemp');
  tempControl.textContent = state.defaultTemp;
};

const minusTemp = (event) => {
  state.defaultTemp -= 1;
  const tempControl = document.querySelector('#currentTemp');
  tempControl.textContent = state.defaultTemp;
};

const registerEventHandlers = (event) => {
  const decreaseTempButton = document.querySelector('#decreaseTemp');
  decreaseTempButton.addEventListener('click', minusTemp);

  const increaseTempButton = document.querySelector('#increaseTemp');
  increaseTempButton.addEventListener('click', addTemp);
  console.log('click click!!');
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
