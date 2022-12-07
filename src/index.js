let counterDisplayElem = document.querySelector('.count');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');

let count = 0;

const registerEventHandlers = () => {
  counterPlusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML++;
  });

  counterMinusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML--;
  });
};

//City Search Bar

// document.getElementById('submit-button').addEventListener('click', () => {
//   console.log(document.getElementById('submit-city'));
// });

document.addEventListener('DOMContentLoaded', registerEventHandlers);
