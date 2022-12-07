const state = {
  temperature: 70,
};

const increaseTemp = (event) => {
  const tempDisplay = document.querySelector('#temperature');

  state.temperature++;
  tempDisplay.textContent = `${state.temperature}`;
};

const decreaseTemp = (event) => {
  const tempDisplay = document.querySelector('#temperature');

  state.temperature--;
  tempDisplay.textContent = `${state.temperature}`;
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
