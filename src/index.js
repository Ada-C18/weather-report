'use strict';

function increaseTemp() {
  console.log('ok');
  const tempNumber = document.getElementById('temp-number');
  console.log(tempNumber);
  state.tempNumber.innerHTML += 1;
}

function updateCityName() {
  const text = document.getElementById('city-name-input').value;
  const header = document.getElementById('city-name');
  header.innerHTML = text;
}

function resetCityName() {
  const header = document.getElementById('city-name');
  header.innerHTML = 'Austin';
  document.getElementById('city-name-input').value = 'Austin';
}
