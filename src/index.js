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
// -- 2 clickable elements
// add event listeners

// 1. increase
let state = {
  temp: 60,
};

// set state temp value in #degrees
// setup

const addDegree = (event) => {
  // Crab Count Behavior
  state.temp += 1;
  console.log('state temp', state.temp);

  const tempContainer = document.querySelector('#degrees'); // output: null
  // console.log('temp container', tempContainer); // null

  tempContainer.textContent = state.temp;
};

// 2. decrease
const subtractDegree = (event) => {
  // Crab Count Behavior
  state.temp -= 1;
  console.log('state temp', state.temp);

  const tempContainer = document.querySelector('#degrees'); // output: null
  // console.log('temp container', tempContainer); // null

  tempContainer.textContent = state.temp;
};

// registers all handles once DOM loaded
const registerHandlers = (event) => {
  const downArrow = document.querySelector('#down-arrow');
  downArrow.addEventListener('click', subtractDegree);

  const upArrow = document.querySelector('#up-arrow');
  upArrow.addEventListener('click', addDegree);
};

document.addEventListener('DOMContentLoaded', registerHandlers);

// 2. temp ranges
// -- number color changes
// -- where to change color? css

// 3. Landscape
// - id=weather garden
// - emojis, background color change
// - 1 landscape at a time
