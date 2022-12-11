// import axios from "axios";

const state = {
  temp: 72,
}

const tempChange = () => {
  let color = "red";
  let temp = state.temp
  if (temp > 80) {
    color = "red";
  } else if (temp > 70) {
    color = "orange";
  } else if (temp > 60) {
    color = "yellow";
  } else if (temp > 50) {
    color = "green";
  } else {
    color = "blue";
  }

  temp = document.getElementById("displayedTemp");
  temp.className = color;
  temp.textContent = String(state.temp)

  console.log("clicked");
}

const landscapeChange = () => {
  let temp = state.temp;

}

const increasedTemp = () => {
  state.temp += 1;
  tempChange();
}

const decreasedTemp = () => {
  state.temp -= 1;
  tempChange();
}

const registerEventHandlers = () => {
  tempChange();

  const increasedTempButton = document.getElementById("increaseTemp");
  increasedTempButton.addEventListener("click", increasedTemp);

  const decreasedTempButton = document.getElementById("decreaseTemp");
  decreasedTempButton.addEventListener("click", decreasedTemp);

  console.log("loaded successfully");
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);