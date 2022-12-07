const state = { temp: 42 };
const thingToConnectToAPI = {temp: 46};


const increaseTemp = () => {
  const tempDisplay = document.getElementById('temp');
  state.temp += 1;
  tempDisplay.textContent = state.temp
  changeTempColor(state.temp);
};

const decreaseTemp = () => {
  const tempDisplay = document.getElementById('temp');
  state.temp -= 1;
  tempDisplay.textContent = state.temp;
  changeTempColor(state.temp);
};

const currentTemp = () => {
  const tempDisplay = document.getElementById('temp');
  tempDisplay.textContent = thingToConnectToAPI.temp;
  changeTempColor(state.temp);
};

const changeTempColor = (temp) => {
    const tempDisplay = document.getElementById('temp_display');
    if (temp >= 80) {
        tempDisplay.className = 'red';
    }
  else if (temp >= 70) {
     tempDisplay.className = "orange";
    }
  else if (temp >= 60) {
        tempDisplay.className = "yellow";
    }
  else if (temp >= 50) {
    tempDisplay.className = "green";
    }
  else {
    tempDisplay.className = "teal";
  }
};

const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const centerButton = document.getElementById('current');

const registerEventHandlers = () => {
  upButton.addEventListener('click', increaseTemp);
  downButton.addEventListener('click', decreaseTemp);
  centerButton.addEventListener('click', currentTemp);
};


document.addEventListener('DOMContentLoaded', registerEventHandlers);
