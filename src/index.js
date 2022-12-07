// temperature controls
const state = {
  temp: 39,
};

const increaseTemp = () => {
  state.temp += 1;
  const currentTemperature = document.getElementById('temperature');
  currentTemperature.textContent = `${state.temp}`;
};

const decreaseTemp = () => {
  state.temp -= 1;
  const currentTemperature = document.getElementById('temperature');
  currentTemperature.textContent = `${state.temp}`;
};

const registerEventHandlers = () => {
  //increase temp
  const increaseTempButton = document.getElementById('inc-temp');
  increaseTempButton.addEventListener('click', increaseTemp);
  //decrease temp
  const decreaseTempButton = document.getElementById('dec-temp');
  decreaseTempButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

//landscape
const tempColor = () => {
  if (state.temp) {
  }
};
