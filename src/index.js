'use strict';

// make body background reactive to state of temp counter

const state = {
  tempCount: 49,
  city: 'Seattle',
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
  document.body.style.backgroundSize = "100% 1000px";
  if (temp <= 59) {
    document.body.style.backgroundImage = "url('./assets/59_or_below.jpeg')";
  } else if (temp <= 69)
  {
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

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increaseTempButton');
  increaseTempButton.addEventListener('click', addDegree);

  const decreaseTempButton = document.querySelector('#decreaseTempButton');
  decreaseTempButton.addEventListener('click', removeDegree);

  const submitCityButton = document.querySelector('#submit');
  submitCityButton.addEventListener('click', updateCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
