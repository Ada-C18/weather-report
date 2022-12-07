// JS TOOLS
// Handle events
// Axios
// - requests to weather API
// - then, catch

// GOALS: WED
// -- CSS code, separate sections
// -- Wave 2

// Wave 2
// REQS
// 1. 2 clickable elements
// add event listeners
// 1. increase
// 2. decrease

// increase
// const addDegree = () => {

// };

// let temp = 85;

// descrease
// BUG
// - either method
// - attributes, class or id names
// - create temp variable in js
const subtractDegree = () => {
  let temp = document.querySelector('degrees'); // grabs whole element
  console.log(temp); // need to get

  let newTemp;
  if (temp) {
    newTemp = temp.getAttribute('nav');
    // console.log(newTemp);
  }
  newTemp = newTemp.parseInt();

  newTemp = newTemp - 1;
  return newTemp;

  // let temp = document.textContent;
  // console.log(temp);
};

const registerEventHandlers = () => {
  const decreaseTemp = document.querySelector('#down-arrow');
  decreaseTemp.addEventListener('click', subtractDegree);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers); // BUG

// 2. temp ranges
// -- number color changes
// -- where to change color? css

// 3. Landscape
// - id=weather garden
// - emojis, background color change
// - 1 landscape at a time
