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
  updateColorsAndEmojis();
};

// 2. decrease
const subtractDegree = (event) => {
  // Crab Count Behavior
  state.temp -= 1;
  console.log('state temp', state.temp);

  const tempContainer = document.querySelector('#degrees'); // output: null
  // console.log('temp container', tempContainer); // null

  tempContainer.textContent = state.temp;
  updateColorsAndEmojis();
};

// 2. temp ranges
// -- number color changes
const updateColorsAndEmojis = () => {
  if (state.temp > 80) {
    document.getElementById('degrees').style.color = 'red';
    document.getElementById('emojis').innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70 && state.temp <= 79) {
    document.getElementById('emojis').innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    // document.getElementById('emojis').
  } else if (state.temp >= 60 && state.temp <= 69) {
    document.getElementById('degrees').style.color = 'yellow';
    document.getElementById('emojis').innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp > 50 && state.temp <= 59) {
    document.getElementById('degrees').style.color = 'green';
    document.getElementById('emojis').innerText = '🌲🌲';
  } else if (state.temp < 59) {
    document.getElementById('degrees').style.color = 'teal';
    document.getElementById('emojis').innerText =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
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
  changeTempColor.addEventListener('click', updateColorsAndEmojis); // is 'click' the rigth event?
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
