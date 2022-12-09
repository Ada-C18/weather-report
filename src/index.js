import axios from "axios";

const state = {
  temperature: 72,
}

const loadControls = () => {
  tempChange();

  const increasedTempButton = document.getElementById("increaseTemp");
  increasedTempButton.addEventListener("click", increasedTemp);

  const decreasedTempButton = document.getElementById("decreaseTemp");
  decreasedTempButton.addEventListener("click", decreasedTemp);

  console.log("loaded successfully");
}

const tempChange() => {
  const temp = document.getElementById("displayedTemp");
  temp.textContent = String(state.temp)
  
  console.log("clicked");
}

const increasedTemp = () => {
  state.temperature += 1;
  tempChange();
}

const decreasedTemp = () => {
  state.temperature -= 1;
  tempChange();
}

document.addEventListener("DOMContentLoaded", loadControls);