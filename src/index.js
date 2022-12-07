let counterDisplayElem = document.querySelector('.count');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');
let count = 0;

// Temperature
const changeColor = (obj) => {
  if (obj.value < 50) {
    // obj.cold = 'teal';
    obj.style.backgroundColor = 'teal';
    console.log('color changed');
  } else if (obj.value < 60) {
    obj.chilly = 'green';
  } else if (obj.value > 70) {
    obj.warm = 'yellow';
  } else if (obj.value < 80) {
    obj.hot = 'orange';
  } else if (obj.value > 80) {
    obj.veryHot = 'red';
  }
};

// City Search Bar
const inputSubmitButton = document.getElementById('submit-button');

const registerEventHandlers = () => {
  counterPlusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML++;
    console.log('clicked plus');
    changeColor(counterDisplayElem);
    console.log('color changed');
  });

  counterMinusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML--;
    changeColor(counterDisplayElem);
  });

  // City Search Bar
  inputSubmitButton.addEventListener('click', () => {
    console.log(document.getElementById('submit-city'));
    console.log('you clicked submit');
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
