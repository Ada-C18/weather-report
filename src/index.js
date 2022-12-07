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

const addDegree = (event) => {
  // Crab Count Behavior
  state.temp += 1;
  console.log('state temp', state.temp);

  const tempContainer = document.querySelector('#degrees'); // output: null
  // console.log('temp container', tempContainer); // null

  tempContainer.textContent = state.temp;
  updateColors();
};

// 2. decrease
const subtractDegree = (event) => {
  // Crab Count Behavior
  state.temp -= 1;
  console.log('state temp', state.temp);

  const tempContainer = document.querySelector('#degrees'); // output: null
  // console.log('temp container', tempContainer); // null

  tempContainer.textContent = state.temp;
  updateColors();
};

// 2. temp ranges
// -- number color changes
const updateColors = () => {
  if (state.temp > 80) {
    document.getElementById('degrees').style.color = 'red';
  } else if (state.temp >= 70 && state.temp <= 79) {
    document.getElementById('degrees').style.color = 'orange';
  } else if (state.temp >= 60 && state.temp <= 69) {
    document.getElementById('degrees').style.color = 'yellow';
  } else if (state.temp > 50 && state.temp <= 59) {
    document.getElementById('degrees').style.color = 'green';
  } else if (state.temp < 49) {
    document.getElementById('degrees').style.color = 'teal';
  }
};

// registers all handles once DOM loaded
const registerHandlers = (event) => {
  //  TODO: set state temp default value
  // setup #degree when page is first loaded

  const downArrow = document.querySelector('#down-arrow');
  downArrow.addEventListener('click', subtractDegree);

  const upArrow = document.querySelector('#up-arrow');
  upArrow.addEventListener('click', addDegree);

  const changeTempColor = document.querySelector('#degrees');
  changeTempColor.addEventListener('click', updateColors); // is 'click' the rigth event?
};

document.addEventListener('DOMContentLoaded', registerHandlers);

// if temp > 80, red
// 70-79, orange
// 60-69, yellow
// 50-59, green
// temp < 49, teal

// 3. Landscape
// - id=weather garden
// - emojis, background color change
// - 1 landscape at a time
