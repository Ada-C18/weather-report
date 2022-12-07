const state = {
  currentTemp: 70
}
const increaseTemp = () => {
  const tempValue = document.querySelector("#tempValue")
  state.currentTemp += 1
  tempValue.textContent = state.currentTemp
}