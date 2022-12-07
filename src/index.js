//const { default: axios } = require("axios");
'use strict';

axios;

var clicks = 32;

function changeColor(el, el2) {
  let color = 'black';
  if (clicks <= 49) {
    color = 'teal';
  } else if (clicks <= 59) {
    color = 'green';
  } else if (clicks <= 69) {
    color = 'yellow';
  } else if (clicks <= 79) {
    color = 'orange';
  } else if (clicks > 79) {
    color = 'red';
  }
  el.style.color = color;
  el2.style.color = color;
}

function clicksUpTemp() {
  clicks += 1;
  document.getElementById('tempNumber').innerHTML = clicks;
  changeColor(
    document.getElementById('tempNumber'),
    document.getElementById('tempHeader')
  ); //connecting colorchanging Temp header and Temp Number to clicks
}

function clicksDownTemp() {
  clicks -= 1;
  document.getElementById('tempNumber').innerHTML = clicks;
  changeColor(
    document.getElementById('tempNumber'),
    document.getElementById('tempHeader')
  );
}

// function changeLandscape(el) {
//   let landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
// }
