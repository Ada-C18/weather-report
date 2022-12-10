const state = {
  city: 'Seattle',
  lat: 47.6038321,
  long: -122.3300624,
  temp: 72,
};

const formatTempAndGarden = () => {
  let temp = state.temp;
  let color = 'red';
  let landscapeSource = null;

  if (temp > 80) {
    color = 'red';
    landscapeSource = 'images/veryhot.webp';
    landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp > 70) {
    color = 'orange';
    landscapeSource = 'images/spring.webp';
    landscape = '🌸🌿🌼__🌷🌻🌿_🌱_🌻🌷';
  } else if (temp > 60) {
    color = 'yellow';
    landscapeSource = 'images/fall.webp';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp > 50) {
    color = 'green';
    landscapeSource = 'images/winter.webp';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    color = 'teal';
    landscapeSource = 'images/winter.webp';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
  const newLandscape = document.getElementById('landscape');
  newLandscape.textContent = landscape;
  const landscapeImage = document.getElementById('landscapeImg');
  landscapeImage.src = landscapeSource;
  const temperature = document.getElementById('tempValue');
  temperature.className = color;
  temperature.textContent = String(state.temp);
};

const increaseTemp = () => {
  state.temp += 1;
  formatTempAndGarden();
};

const decreaseTemp = () => {
  state.temp -= 1;
  formatTempAndGarden();
};

const registerEventHandlers = () => {
  formatTempAndGarden();

  const increaseTempControl = document.getElementById('increaseTempControl');
  increaseTempControl.addEventListener('click', increaseTemp);

  const decreaseTempControl = document.getElementById('decreaseTempControl');
  decreaseTempControl.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
