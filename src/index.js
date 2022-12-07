let counterDisplayElem = document.querySelector('.count');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');
// City Search Bar
const inputSubmitButton = document.getElementById('submit-button');

let count = 0;

const registerEventHandlers = () => {
  counterPlusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML++;
  });

  counterMinusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML--;
  });

  // City Search Bar
  inputSubmitButton.addEventListener('click', () => {
    console.log(document.getElementById('submit-city'));
    console.log('you clicked submit');
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
