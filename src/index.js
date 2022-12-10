import axios from "axios";

const state = {
  temp: 72,
}

const tempChange = () => {
  const temp = document.getElementById("displayedTemp");
  temp.textContent = String(state.temp)
  
  console.log("clicked");
}

const loadControls = () => {
  tempChange();

  const increasedTempButton = document.getElementById("increaseTemp");
  increasedTempButton.addEventListener("click", increasedTemp);

  const decreasedTempButton = document.getElementById("decreaseTemp");
  decreasedTempButton.addEventListener("click", decreasedTemp);

  console.log("loaded successfully");
}

const increasedTemp = () => {
  state.temp += 1;
  tempChange();
}

const decreasedTemp = () => {
  state.temp -= 1;
  tempChange();
}

document.addEventListener("DOMContentLoaded", loadControls);