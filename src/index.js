// logic to change temperature using the buttons
const state = {
  temp: 45,
  city: "Seattle",
};

//Creating addTemp and minus Temp events
const addTemp = (event) => {
  state.temp += 1;
  const tempControl = document.querySelector('#currentTemp');
  tempControl.textContent = state.temp;
  changeTempNumColor();
};

const minusTemp = (event) => {
  state.temp -= 1;
  const tempControl = document.querySelector('#currentTemp');
  tempControl.textContent = state.temp;
  changeTempNumColor();
};

//HELPER FUNCTION logic for temperture to change color font, landscape and sky
const changeTempNumColor = () => {
  let temp = state.temp;
  const skyElement = document.querySelector('#sky');
  const landScapeElement = document.querySelector('#gardenlandscape');

  if (temp >= 80) {
    document.getElementById('currentTemp').className = 'red';
    skyElement.textContent = '🔥🥵🌞🔥🥵🌞🔥🥵🌞';
    landScapeElement.textContent = '👙🩳⛱🏝🌊👙🩳⛱🏝🌊👙🩳⛱🏝🌊'
  } else if (temp >= 70 && temp <= 79) {
    document.getElementById('currentTemp').className = 'orange';
    skyElement.textContent = '🌤☁️🌤☁️🌤☁️🌤☁️🌤☁️';
    landScapeElement.textContent = '🌻🌹🍉🌻🌹🍉🌻🌹🍉🌻🌹🍉🌻🌹🍉'
  } else if (temp >= 60 && temp <= 69) {
    document.getElementById('currentTemp').className = 'yellow';
    skyElement.textContent = '☁️🌥☁️🌥☁️🌥☁️🌥☁️🌥';
    landScapeElement.textContent = '🌧☔️🌈🌧☔️🌈🌧☔️🌈🌧☔️🌈'
  } else if (temp >= 50 && temp <= 59) {
    document.getElementById('currentTemp').className = 'green';
    skyElement.textContent = '☁️☁️☁️☁️🌥☁️☁️☁️☁️';
    landScapeElement.textContent = '🍁🍂🌲🌳🍁🍂🌲🌳🍁🍂🌲🌳'
  } else {
    document.getElementById('currentTemp').className = 'teal';
    skyElement.textContent = '☁️🌧❄️☁️🌧❄️☁️🌧❄️☁️🌧❄️';
    landScapeElement.textContent = '☃️🧤🥶🏔☃️🧤🎄🥶🏔☃️🧤🥶🏔'
  }
};


////Creating an event to update headerCityName
const updateCityName = (event) => {
  const updatedCityName = document.getElementById('headerCityName');
  updatedCityName.textContent = event.target.value;
};

////Registering Event handlers and add event listeners
const registerEventHandlers = (event) => {
  const decreaseTempButton = document.querySelector('#decreaseTemp');
  decreaseTempButton.addEventListener('click', minusTemp);

  const increaseTempButton = document.querySelector('#increaseTemp');
  increaseTempButton.addEventListener('click', addTemp);
  console.log('click click!!');

  const input = document.querySelector('input');
  input.addEventListener('input', updateCityName);

};


document.addEventListener('DOMContentLoaded',registerEventHandlers);
