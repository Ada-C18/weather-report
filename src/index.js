'use strict';

const state = {
  temp: 80,
};

// const tempValue = document.getElementById('tempValue');
// tempValue.textContent = state.temp;

// const increaseTemp = () => {
//   state.temp++;
//   console.log(state);
//   const increaseValue = document.getElementById('tempValue');
//   increaseValue.textContent = `${state.temp}`;
// };

// const decreaseTemp = () => {
//   state.temp--;
//   console.log(state);
//   const decreaseValue = document.getElementById('tempValue');
//   decreaseValue.textContent = `${state.temp}`;
// };

///refactor the code above
const showTemperature = () => {
  const tempValue = document.getElementById('tempValue');
  tempValue.textContent = state.temp + '\u00B0F';
};

const changeTemp = (e) => {
  const tempContainer = document.querySelector('.temperature');
  if (e.target.id == 'tempUp') {
    state.temp += 1;
    console.log(state);
    showTemperature();
  } else if (e.target.id == 'tempDown') {
    state.temp -= 1;
    showTemperature();
  }
};

const allEventHandlers = () => {
  const increaseArrow = document.getElementById('tempUp');
  increaseArrow.addEventListener('click', changeTemp);

  const decreaseArrow = document.getElementById('tempDown');
  decreaseArrow.addEventListener('click', changeTemp);
};

document.addEventListener('DOMContentLoaded', allEventHandlers);
