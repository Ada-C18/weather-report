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




//City Submit Bar

document.getElementById("submit-button").addEventListener("click", () => {
  console.debug(document.getElementById("submit-city"));
});