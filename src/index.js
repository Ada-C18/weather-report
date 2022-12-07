const state = {
  Temperature: 0
};

const increaseTemp = (event) => {
  const tempContainer = document.querySelector("#Temperature");
  tempContainer.textContent = `${state.Temperature + 1}`;
};

const decreaseTemp = (event) => {
  const tempContainer = document.querySelector("#Temperature");
  tempContainer.textContent = `${state.Temperature - 1}`;
};

const registerEventHandlers = (event) => {
  const increaseTempButton = document.querySelector("#increaseTempButton");
  const decreaseTempButton = document.querySelector("#decreaseTempButton");
  increaseTempButton.addEventListener("click", increaseTemp);
  decreaseTempButton.addEventListener("click", decreaseTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);