'use strict';

console.log('Online')

function increaseTemp() {
  console.log('ok');
  const tempDiv = document.getElementById('temp-number');
  let tempNumber = parseInt(tempDiv.textContent);
  console.log(tempNumber);
  tempNumber += 1;
  tempDiv.innerHTML = tempNumber
}

function decreaseTemp() {
  console.log('ok');
  const tempDiv = document.getElementById('temp-number');
  let tempNumber = parseInt(tempDiv.textContent);
  console.log(tempNumber);
  tempNumber -= 1;
  tempDiv.innerHTML = tempNumber
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