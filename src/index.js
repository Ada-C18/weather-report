const state = {
  temperature: 70,
};

const increaseTemp = (event) => {
  const tempDisplay = document.querySelector('#temperature');

  state.temperature++;
  tempDisplay.textContent = `${state.temperature}`;

  changeTemperatureColor(state.temperature, tempDisplay);
};

const decreaseTemp = (event) => {
  const tempDisplay = document.querySelector('#temperature');

  state.temperature--;
  tempDisplay.textContent = `${state.temperature}`;

  changeTemperatureColor(state.temperature, tempDisplay);
};

const changeTemperatureColor = (temp, tempDisplay) => {
  if (temp > 80) {
    tempDisplay.style.color = 'red';
  } else if (temp > 70) {
    tempDisplay.style.color = 'orange';
  } else if (temp > 60) {
    tempDisplay.style.color = 'yellow';
  } else if (temp > 50) {
    tempDisplay.style.color = 'lightgreen';
  } else if (temp <= 49) {
    tempDisplay.style.color = 'white';
  }
};

const registerEventHandlers = (event) => {
  console.log('registerEventHandlers called');
  const increaseButton = document.querySelector('#increase-temp');
  increaseButton.addEventListener('click', increaseTemp);

  const decreaseButton = document.querySelector('#decrease-temp');
  decreaseButton.addEventListener('click', decreaseTemp);
};

if (document.readyState !== 'loading') {
  registerEventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', registerEventHandlers);
}
