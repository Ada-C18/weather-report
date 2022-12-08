const state = {
  currentTemp: 80
}
const increaseTemp = () => {
  state.currentTemp += 1

  const tempValue = document.getElementById("tempValue")

  tempValue.textContent = state.currentTemp  
}

const decreaseTemp = () => {
  state.currentTemp -= 1

  const tempValue = document.getElementById("tempValue")

  tempValue.textContent = state.currentTemp  
}


const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById("increaseTempButton");
  increaseTempButton.addEventListener("click", increaseTemp);

  const decreaseTempButton = document.getElementById("decreaseTempButton")
  decreaseTempButton.addEventListener("click", decreaseTemp)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);