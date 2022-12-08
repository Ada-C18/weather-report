// Temperature Variables
let counterDisplayElem = document.getElementById('temp-count');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');

let landscapeElem = document.getElementById('landscape');

// Temperature Helper Function
const changeColor = (obj1, obj2) => {
  if (obj1.innerHTML < 50) {
    obj1.className = 'teal';
    obj2.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (obj1.innerHTML < 60) {
    obj1.className = 'green';
    obj2.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂';
  } else if (obj1.innerHTML > 70) {
    obj1.className = 'yellow';
    obj2.innerHTML = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (obj1.innerHTML < 80) {
    obj1.className = 'orange';
    obj2.innerHTML = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (obj1.innerHTML > 80) {
    obj1.className = 'red';
    obj2.innerHTML = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};

// City Submit Bar Variables
const inputSubmitButton = document.getElementById('submit-button');

const registerEventHandlers = () => {
  //Temperature
  counterPlusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML++;
    changeColor(counterDisplayElem, landscapeElem);
  });

  counterMinusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML--;
    changeColor(counterDisplayElem, landscapeElem);
  });

  // City Submit Bar
  inputSubmitButton.addEventListener('click', () => {
    console.log(document.getElementById('submit-city'));
    console.log('you clicked submit');
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
