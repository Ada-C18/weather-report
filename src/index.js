// import axios from 'axios';
'use strict';

const state = {
  clickCount: 0, // # of clicks
  clicked: false, // whether the click me box is in its clicked state
};

// we could add references to the various elements to our state
// add look them up only once, rather than every time each
// function is called!

const plusClickCount = () => {
  const plusContainer = document.getElementById('Temperature');
  state.clickCount += 1;
  plusContainer.textContent = state.clickCount;
};

const minusClickCount = () => {
  const minusContainer = document.getElementById('Temperature');
  state.clickCount -= 1;
  minusContainer.textContent = state.clickCount;
};

//making range different

//   const parrot = document.querySelector('#parrot');
//   if (state.clickCount >= 10) {
//     parrot.classList.add('large');
//   }
// };

const registerEventHandlers = () => {
  const hotterButton = document.getElementById('plusButton');
  hotterButton.addEventListener('click', plusClickCount);
  const coolerButton = document.getElementById('minusButton');
  coolerButton.addEventListener('click', minusClickCount);
  // const reset = document.getElementById('resetButton');
  // reset.addEventListener('click', resetClickCount);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
