const state = {
  currentTemp: 80
}
const increaseTemp = () => {
  state.currentTemp += 1

  const tempValue = document.getElementById("tempValue")

  tempValue.textContent = state.currentTemp
  temperatureColorCheck(state.currentTemp)  
}

const decreaseTemp = () => {
  state.currentTemp -= 1

  const tempValue = document.getElementById("tempValue")

  tempValue.textContent = state.currentTemp  
  temperatureColorCheck(state.currentTemp)  

}

const temperatureColorCheck = (temp) => {
  const tempValue = document.getElementById("tempValue")
  const landscapePicture = document.getElementById("landscapePicture")

  if (temp >= 80) {
    tempValue.className = "red"
    landscapePicture.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
  } else if (temp >= 70) {
    tempValue.className = "orange"
    landscapePicture.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
  } else if (temp >= 60) {
    tempValue.className = "yellow"
    landscapePicture.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
  } else if (temp >= 50) {
    tempValue.className = "green"
    landscapePicture.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
  } else {
    tempValue.className = "teal"
  }
}


const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById("increaseTempButton");
  increaseTempButton.addEventListener("click", increaseTemp);

  const decreaseTempButton = document.getElementById("decreaseTempButton")
  decreaseTempButton.addEventListener("click", decreaseTemp)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);