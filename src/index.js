'use strict';

function incrementButton() {
  console.log('hello world');
  var element = document.getElementById('counter');
  var value = element.innerHTML;

  ++value;

  console.log(value);
  document.getElementById('counter').innerHTML = value;
}

function decreaseButton() {
  var element = document.getElementById('counter');
  var value = element.innerHTML;

  --value;

  console.log(value);
  document.getElementById('counter').innerHTML = value;
}

const state = { temperature: temperature };

for (let temp of state.temperature) {
  if (temp >= 80) {
    let red = document.getElementById('red');
  } else if (temp >= 70 && temp <= 79) {
    let orange = document.getElementById('orange');
  } else if (temp >= 60 && temp <= 69) {
    let yellow = document.getElementById('yellow');
  } else if (temp >= 50 && temp <= 59) {
    let green = document.getElementById('green');
  } else if (temp <= 49) {
    let teal = document.getElementById('teal');
  }
}
