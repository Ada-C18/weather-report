'use strict';

function incrementButton() {
  const element = document.getElementById('counter');
  let value = element.innerHTML;

  value++;

  temperatureColor(value);

  document.getElementById('counter').innerHTML = value;
}

function decreaseButton() {
  const element = document.getElementById('counter');
  let value = element.innerHTML;

  value--;

  temperatureColor(value);

  document.getElementById('counter').innerHTML = value;
}

function temperatureColor(temp) {
  let element = document.getElementById('counter');
  if (temp >= 80) {
    element.className = 'red';
  } else if (temp >= 70 && temp <= 79) {
    element.className = 'orange';
  } else if (temp >= 60 && temp <= 69) {
    element.className = 'yellow';
  } else if (temp >= 50 && temp <= 59) {
    element.className = 'green';
  } else if (temp <= 49) {
    element.className = 'teal';
  }
}
