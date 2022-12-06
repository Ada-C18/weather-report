const state = {
  defaultTemp: 45,
};

const addTemp = (event) => {
  state.defaultTemp += 1;
  const tempControl = document.querySelector('#currentTemp');
  tempControl.textContent = state.defaultTemp;
};

const registerEventHandlers = (event) => {
  const increaseTempButton = document.querySelector('#increaseTemp');
  increaseTempButton.addEventListener('click', addTemp);
  console.log('click!');
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
