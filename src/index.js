'use strict';

let x = 65;
const registerEventHandlers = () => {
  const value = document.querySelector('#temp_value');
  const increment = document.getElementById('increase_temp');
  const decrement = document.getElementById('decrease_temp');

  increment.addEventListener('click', function () {
    value.textContent = x++;
  });

  decrement.addEventListener('click', function () {
    value.textContent = x--;
  });
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);


