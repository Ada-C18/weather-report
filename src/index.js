'use strict';

let temperature = 0;

const increaseTemp = () => {
  temperature++;
  updatePage();
};

const decreaseTemp = () => {
  temperature--;
  updatePage();
};

const updatePage = () => {
  document.getElementById('temp').textContent = temperature;
  let newstyle = temperatureStyle(temperature);
  document.getElementById('body').style.backgroundColor = newstyle.bg_color;
  document.getElementById('landscape').textContent = newstyle.landscape;
};

const temperatureStyle = (temp) => {
  if (temp > 80) {
    return { bg_color: 'red', landscape: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂' };
  } else if (temp >= 70) {
    return { bg_color: 'orange', landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷' };
  } else if (temp >= 60) {
    return { bg_color: 'yellow', landscape: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃' };
  } else if (temp >= 50) {
    return { bg_color: 'green', landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲' };
  } else {
    return { bg_color: 'teal', landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲' };
  }
};

const cityUpdate = (event) => {
  document.getElementById('city').textContent = event.target.value;
};

function addListeners() {
  console.log('onload');
  document.getElementById('temp_increase').onclick = (event) => increaseTemp();
  document.getElementById('temp_decrease').onclick = (event) => decreaseTemp();
  document.getElementById('city_input').oninput = (event) => cityUpdate(event);
  console.log('onload executed');
}
