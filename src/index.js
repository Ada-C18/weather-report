"use strict";

const state = {
  temp: 75, // starting temp
  clicked: false // whether the temp increase button is in clicked state
};

const increaseDreamTemp = () => {
  const dreamTemp = document.getElementById("dream-temp-number");
  state.temp += 1;
  dreamTemp.textContent = state.temp;
};

const decreaseDreamTemp = () => {
  const dreamTemp = document.getElementById("dream-temp-number");
  state.temp -= 1;
  dreamTemp.textContent = state.temp;
};

const updateDreamTempColor = () => {
  const dreamTemp = document.querySelector("#dream-temp-number");
  const tempCircle = document.querySelector("#circle");

  if (state.temp >= 80) {
    dreamTemp.style.color = "#E0392D";
    tempCircle.style.backgroundColor = "#E0392D";
  } else if (70 <= state.temp && state.temp <= 79) {
    dreamTemp.style.color = "#E0571D";
    tempCircle.style.backgroundColor = "#E0571D";
  } else if (60 <= state.temp && state.temp <= 69) {
    dreamTemp.style.color = "#F09104";
    tempCircle.style.backgroundColor = "#F09104";
  } else if (50 <= state.temp && state.temp <= 59) {
    dreamTemp.style.color = "blue";
    tempCircle.style.backgroundColor = "blue";
  } else if (state.temp <= 49) {
    dreamTemp.style.color = "purple";
    tempCircle.style.backgroundColor = "purple";
  }
};

const registerEventHandlers = () => {
  const tempIncreaseButton = document.getElementById("temp-increase-button");
  tempIncreaseButton.addEventListener("click", increaseDreamTemp);
  tempIncreaseButton.addEventListener("click", updateDreamTempColor);

  const tempDecreaseButton = document.getElementById("temp-decrease-button");
  tempDecreaseButton.addEventListener("click", decreaseDreamTemp);
  tempDecreaseButton.addEventListener("click", updateDreamTempColor);

};



// DOM listener
document.addEventListener("DOMContentLoaded", registerEventHandlers);

// document.getElementById("temp-increase-button").addEventListener('click', increaseTemp);
// const increaseTemp = function increaseTemp () {
  // when increase temp button is clicked, temp += 1
  // parameter is current temp
// }