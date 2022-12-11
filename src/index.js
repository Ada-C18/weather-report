// import axios from "axios";

const state = {
  temp: 72,
  city: "Seattle",
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
  let landscape = "hot!"
  if (temp > 80) {
    landscape = "hot hot!";
  } else if (temp > 70) {
    landscape = "warmm";
  } else if (temp > 60) {
    landscape = "nice";
  } else if (temp > 50) {
    landscape = "cool";
  } else {
    landscape = "**shiver shiver**";
  }

  const updatedLandscape = document.getElementById("skyAndLandscape");
  updatedLandscape.textContent = landscape;
}

const increasedTemp = () => {
  state.temp += 1;
  tempChange();
  landscapeChange();
}

const decreasedTemp = () => {
  state.temp -= 1;
  tempChange();
  landscapeChange();
}

const cityNameChange = () => {
  let currentCity = document.getElementById("currentCity");
  let newCity = document.getElementById("newCity").value;
  state.city = newCity;
  currentCity.textContent = state.city;
  console.log("inputted city");
}

const resetCity = () => {
  let newCityInput = document.getElementById("newCity");
  newCityInput.value = "Seattle";
  cityNameChange();
}

const registerEventHandlers = () => {
  tempChange();
  landscapeChange();
  cityNameChange();

  const increasedTempButton = document.getElementById("increaseTemp");
  increasedTempButton.addEventListener("click", increasedTemp);

  const decreasedTempButton = document.getElementById("decreaseTemp");
  decreasedTempButton.addEventListener("click", decreasedTemp);

  const cityNameChangeInput = document.getElementById("newCity");
  cityNameChangeInput.addEventListener("input", cityNameChange);

  const resetCityButton = document.getElementById("changeCity");
  resetCityButton.addEventListener("click", resetCity);

  console.log("loaded successfully");
}

document.addEventListener('DOMContentLoaded', registerEventHandlers);