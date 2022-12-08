'use strict';

// make body background reactive to state of temp counter

const state = {
  tempCount: 49,
  city: 'Seattle',
  sky: 'Sunny',
};

const changeTempColor = () => {
  let temp = state.tempCount;
  if (temp <= 49) {
    document.getElementById('tempCounter').style.color = 'teal';
  } else if (temp <= 59) {
    document.getElementById('tempCounter').style.color = 'green';
  } else if (temp <= 69) {
    document.getElementById('tempCounter').style.color = 'yellow';
  } else if (temp <= 79) {
    document.getElementById('tempCounter').style.color = 'orange';
  } else {
    document.getElementById('tempCounter').style.color = 'red';
  }
};

const changeBackground = () => {
  let temp = state.tempCount;
  document.body.style.backgroundSize = "100% 900px";
  if (temp <= 59) {
    document.body.style.backgroundImage = "url('./assets/59_or_below.jpeg')";
  } else if (temp <= 69){
    document.body.style.backgroundImage = "url('./assets/69_or_below.jpeg')";
  } else if (temp <= 79) {
    document.body.style.backgroundImage = "url('./assets/79_or_below.jpeg')";
  } else {
    document.body.style.backgroundImage = "url('./assets/80_and_above.png')";
  }
};

const addDegree = () => {
  state.tempCount += 1;
  const tempCounter = document.querySelector('#tempCounter');
  tempCounter.textContent = `${state.tempCount} \u00B0`;
  changeTempColor();
  changeBackground();
  console.log(state.tempCount);
};
const removeDegree = () => {
  state.tempCount -= 1;
  const tempCounter = document.querySelector('#tempCounter');
  tempCounter.textContent = `${state.tempCount} \u00B0`;
  changeTempColor();
  changeBackground();
};

const updateCity = () => {
  state.city = document.querySelector('#city').value;
  const cityDisplay = document.querySelector('#cityDisplay');
  cityDisplay.textContent = `for the lovely city of ${state.city}`;
};

const changeSky = () => {
  let skyChange = document.getElementById('sky');
  let getChange = skyChange.options[skyChange.selectedIndex].value;
  
  document.body.style.backgroundSize = "100% 900px";
  if (getChange === "Sunny"){
    document.body.style.backgroundImage = "url('./assets/sunny.webp')";
  } else if (getChange === "Rainy"){
      document.body.style.backgroundImage = "url('./assets/rainy.jpeg')";
  } else if (getChange === "Cloudy") {
    document.body.style.backgroundImage = "url('./assets/cloudy.webp')";
  } else if (getChange === "Snowy"){
      document.body.style.backgroundImage = "url('./assets/snowy.jpg')";
  }
};

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', addDegree);

  const decreaseTempButton = document.querySelector('#decreaseTempButton');
  decreaseTempButton.addEventListener('click', removeDegree);

  const submitCityButton = document.querySelector('#submit');
  submitCityButton.addEventListener('click', updateCity);

  const skySelect = document.querySelector('#sky');
  skySelect.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);



