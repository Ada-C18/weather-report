let state = 60;

// increase temoerature 
const updateTemmperature = state => {
// const increaseTemperature = () => {
  const temperatureContainer = document.querySelector("#startingTemp");
  temperatureContainer.textContent = state;
};

const increaseTemperature = () => {
  state += 1;
  updateTemmperature(state);
};

const decreaseTemperature = () => {
  state -= 1;
  updateTemmperature(state);
};



const registerEventHandlers = () => {
  const increaseTemperatureButton = document.getElementById('increaseButton');
  increaseTemperatureButton.addEventListener("click", increaseTemperature);

  const decreaseTemperatureButton = document.getElementById('decreaseButton');
  decreaseTemperatureButton.addEventListener("click", decreaseTemperature);


};

document.addEventListener("DOMContentLoaded", registerEventHandlers);






