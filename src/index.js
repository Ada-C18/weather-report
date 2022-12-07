const state = { temp: 42,
              city: cityInput };
const thingToConnectToAPI = {temp: 46};


const increaseTemp = () => {
  const tempDisplay = document.getElementById('temp');
  state.temp += 1;
  tempDisplay.textContent = state.temp;
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
  changeTempColor(thingToConnectToAPI.temp);
};

const changeTempColor = (temp) => {
    const tempDisplay = document.getElementById('temp_display');
    const groundVis = document.getElementById("ground_vis");
    if (temp >= 80) {
        tempDisplay.className = 'red';
        groundVis.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    }
  else if (temp >= 70) {
     tempDisplay.className = "orange";
     groundVis.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    }
  else if (temp >= 60) {
        tempDisplay.className = "yellow";
        groundVis.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    }
  else if (temp >= 50) {
    tempDisplay.className = "green";
    groundVis.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
  else {
    tempDisplay.className = "teal";
    groundVis.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  }
};

const changeCity = () => {
    const userInput = document.getElementById("cityInput");
    const currentCity = document.getElementById('city');
    let cityInput = userInput.value;
    state.city = cityInput;
    currentCity.textContent = state.city;
};


const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const centerButton = document.getElementById('current');
const cityButton  = document.getElementById('change_city');

const registerEventHandlers = () => {
  upButton.addEventListener('click', increaseTemp);
  downButton.addEventListener('click', decreaseTemp);
  centerButton.addEventListener('click', currentTemp);
  cityButton.addEventListener('click', changeCity);
};


document.addEventListener('DOMContentLoaded', registerEventHandlers);
