let counterDisplayElem = document.querySelector('#counter-display');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');

let count = 0;
updateDisplay();

counterPlusElem.addEventListener('click', () => {
  count++;
  updateDisplay();
});

counterMinusElem.addEventListener('click', () => {
  count++;
  updateDisplay();
});

const updateDisplay = () => {
  counterDisplayElem.innerHTML = count;
};




//City Search Bar

document.getElementById("submit-button").addEventListener("click", () => {
  console.log(document.getElementById("submit-city"));
});