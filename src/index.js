const state = { temp: 42 };

const increaseTemp = () => {
  const tempDisplay = document.getElementById('temp');
  state.temp += 1;
  tempDisplay.textContent = state.temp;
};

const upButton = document.getElementById('up');

const registerEventHandlers = () => {
  upButton.addEventListener('click', increaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
