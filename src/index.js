const state = {
  currentTemp: 79,
};

// temperature
const increaseTemp = () => {
  state.currentTemp += 1;
  const tempContainer = document.querySelector('#currentTemp');
  tempContainer.textContent = `${state.currentTemp}`;
};
const decreaseTemp = () => {
  state.currentTemp -= 1;
  const tempContainer = document.querySelector('#currentTemp');
  tempContainer.textContent = `${state.currentTemp}`;
};
const changeTempColor = () => {
  const newLandscape = document.createElement('span');
  const landscapeContainer = document.querySelector('#landscapeSection');
  const box = document.getElementById('currentTemp');
  if (state.currentTemp >= 80) {
      box.style.color = 'red';
      newLandscape.textContent = "🌵";
      landscapeContainer.appendChild(newLandscape)

  }else if ( state.currentTemp >= 70 && state.currentTemp <=79){
    box.style.color = 'orange';
  }else if ( state.currentTemp >= 60 && state.currentTemp <=69){
    box.style.color = 'yellow';
  }else if ( state.currentTemp >= 50 && state.currentTemp <=59){
    box.style.color = 'green';
  }else {
    box.style.color = 'teal';
  }
};

const registerEventHandlers = () => {
  const up = document.querySelector('#up');
  const down = document.querySelector('#down');
  up.addEventListener('click', increaseTemp);
  down.addEventListener('click', decreaseTemp);
  up.addEventListener('click', changeTempColor);
  down.addEventListener('click',  changeTempColor);
};

// reset the city temperature
const resetCity = () => {
  const cityContainer = document.getElementById(citySection);
  cityContainer.value = 'Seattle';
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
