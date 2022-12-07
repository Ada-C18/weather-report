'use strict';
const state = {
  temp: 80,
  tempColor: 'red',
};
// const tempValue = document.getElementById(‘tempValue’);
// tempValue.textContent = state.temp;
// const increaseTemp = () => {
//   state.temp++;
//   console.log(state);
//   const increaseValue = document.getElementById(‘tempValue’);
//   increaseValue.textContent = `${state.temp}`;
// };
// const decreaseTemp = () => {
//   state.temp--;
//   console.log(state);
//   const decreaseValue = document.getElementById(‘tempValue’);
//   decreaseValue.textContent = `${state.temp}`;
// };
///refactor the code above
const showTemperature = () => {
  const tempValue = document.getElementById('tempValue');
  tempValue.textContent = state.temp + '\u00B0F';
  // tempValue.style.color = ‘red’;
  console.log(tempValue);
};

const tempColor = () => {
  const tempColorElement = document.getElementById('tempValue');
  if (state.temp <= 49) {
    tempColorElement.style.color = 'teal';
  } else if (50 <= state.temp && state.temp <= 59) {
    tempColorElement.style.color = 'green';
  } else if (60 <= state.temp && state.temp <= 69) {
    tempColorElement.style.color = 'yellow';
  } else if (70 <= state.temp && state.temp <= 79) {
    tempColorElement.style.color = 'orange';
  } else {
    tempColorElement.style.color = 'red';
  }
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
  increaseArrow.addEventListener('click', tempColor);

  const decreaseArrow = document.getElementById('tempDown');
  decreaseArrow.addEventListener('click', changeTemp);
  decreaseArrow.addEventListener('click', tempColor);
};
document.addEventListener('DOMContentLoaded', allEventHandlers);
