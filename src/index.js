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
// 1. clickable elements
// add event listeners
// 1. increase
// 2. decrease

// increase
// const addDegree = () => {

// };

let temp = 85;

// descrease
const subtractDegree = () => {
  //   const temp = document.createElement(''); // temp from API
  return (temp += 1);
};

const registerEventHandlers = () => {
  const decreaseTemp = document.querySelector('#down-arrow');
  decreaseTemp.addEventListener('click', subtractDegree);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers); //?

// 2. temp ranges
// -- number color changes
// -- where to change color? css

// 3. Landscape
// - id=weather garden
// - emojis, background color change
// - 1 landscape at a time
