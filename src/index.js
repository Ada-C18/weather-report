// Temperature Variables
let counterDisplayElem = document.getElementById('temp-count');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');

// Temperature Helper Function
const changeColor = (obj) => {
  if (obj.innerHTML < 50) {
    obj.className = 'teal';
  } else if (obj.innerHTML < 60) {
    obj.className = 'green';
  } else if (obj.innerHTML > 70) {
    obj.className = 'yellow';
  } else if (obj.innerHTML < 80) {
    obj.className = 'orange';
  } else if (obj.innerHTML > 80) {
    obj.className = 'red';
  }
};

// City Submit Bar Variables
const inputSubmitButton = document.getElementById('submit-button');

const registerEventHandlers = () => {
  //Temperature 
  counterPlusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML++;
    changeColor(counterDisplayElem);
  });

  counterMinusElem.addEventListener('click', () => {
    counterDisplayElem.innerHTML--;
    changeColor(counterDisplayElem);
  });

  // City Submit Bar
  inputSubmitButton.addEventListener('click', () => {
    console.log(document.getElementById('submit-city'));
    console.log('you clicked submit');
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
