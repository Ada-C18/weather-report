const DEFAULT_TEMP = 72;
const tempState = {
  displayedTemp: null,
  increaseTemp: null,
  decreaseTemp: null,
}


addEventListener()

const loadControls = () => {
  tempState.displayedTemp = document.getElementById("displayedTemp");
  tempState.increaseTemp = document.getElementById("increaseTemp");
  tempState.decreaseTemp = document.getElementById("decreaseTemp");
}


const tempChange() => {
  tempState.decreaseTemp.addEventListener("click", (event) => {
    const newTemp = tempState.displayedTemp += 1;
    tempState.displayedTemp = newTemp;
  });
  console.log("clicked");
}