'use strict';
let temperature = 50;

const increaseTemp = () => {
  // let arrowDown = document.querySelector('#arrow-down');
  const spanTempNumber = document.getElementById('temperature-value');

  temperature += 1;
  changeLandscape();
  changeTempNumberColor();
  spanTempNumber.textContent = `${temperature}`;
  // else temperature -= 1;
  console.log('inside of increase', spanTempNumber.textContent);
};

const increaseTempOnClick = () => {
  let arrowUp = document.querySelector('#arrow-up');
  arrowUp.addEventListener('click', increaseTemp);
};

// decrease temp
const decreaseTemp = () => {
  const spanTempNumber = document.getElementById('temperature-value');

  temperature -= 1;
  changeLandscape();
  changeTempNumberColor();
  spanTempNumber.textContent = `${temperature}`;

  console.log('inside of decrease', spanTempNumber.textContent);
};

const decreaseTempOnClick = () => {
  let arrowDown = document.querySelector('#arrow-down');
  arrowDown.addEventListener('click', decreaseTemp);
};

const changeTempNumberColor = () => {
  const tempNumber = Number(
    document.getElementById('temperature-value').innerText
  );

  const spanTempNumber = document.getElementById('temperature-value');
  // console.log(spanTempNumber)

  // console.log(tempNumber)

  if (tempNumber <= 49) spanTempNumber.className = 'number-color-teal';
  else if (tempNumber < 59) spanTempNumber.className = 'number-color-green';
  else if (tempNumber < 69) spanTempNumber.className = 'number-color-yellow';
  else if (tempNumber < 79) spanTempNumber.className = 'number-color-orange';
  else spanTempNumber.className = 'number-color-red';

  // console.log(tempNumber.className)
};

const changeLandscape = () => {
  const tempNumber = Number(
    document.getElementById('temperature-value').innerText
  );
  let iconGround = document.getElementById('ground-icons');
  // console.log(iconGround);

  // console.log(tempNumber);

  if (tempNumber <= 59)
    iconGround.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  else if (tempNumber < 69) iconGround.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  else if (tempNumber < 79) iconGround.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  else iconGround.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
};
// changeTemp();
// changeLandscape();
// changeTempNumberColor();
// changeTempOnClick();
document.addEventListener('DOMContentLoaded', increaseTempOnClick);
document.addEventListener('DOMContentLoaded', decreaseTempOnClick);
