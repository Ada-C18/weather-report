let state = {temp: 42};

const upButton = document.querySelector("#up");

const increaseTemp  = () => {
  const tempDisplay = document.querySelector("#temp");
  state.temp += 1;
  tempDisplay.textContent = `${state.temp}`
}

const registerEventHandlers = () => {
  const upButton = document.querySelector('#up');
  upButton.addEventListener("click", increaseTemp);
}