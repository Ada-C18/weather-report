const tempUp = () => {
  console.log('up');
  const currentTemp = document.querySelector('#tempValue');
  currentTemp.textContent = parseInt(currentTemp.innerHTML) + 1;
};

const tempDown = () => {
  console.log('down');
  const currentTemp = document.querySelector('#tempValue');
  currentTemp.textContent = parseInt(currentTemp.innerHTML) - 1;
};

const registerEventHandlers = () => {
  const increaseTemp = document.querySelector('#tempUp');
  increaseTemp.addEventListener('click', tempUp);

  const decreaseTemp = document.querySelector('#tempDown');
  decreaseTemp.addEventListener('click', tempDown);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
