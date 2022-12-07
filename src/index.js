'use strict';

const changeTempNumberColor = () => {
  const tempNumber = Number(document.getElementById('temperature-value').innerText);

  const spanTempNumber = document.getElementById('temperature-value')
  // console.log(spanTempNumber)

  // console.log(tempNumber)

  if (tempNumber <= 49) spanTempNumber.className = "number-color-teal";

  else if (tempNumber < 59 ) spanTempNumber.className = "number-color-green";

  else if (tempNumber < 69 ) spanTempNumber.className = "number-color-yellow";

  else if (tempNumber < 79 ) spanTempNumber.className = "number-color-orange";

  else spanTempNumber.className = "number-color-red";

  // console.log(tempNumber.className)

};


const changeLandscape = () => {
  const tempNumber = Number(document.getElementById('temperature-value').innerText);
  let iconGround = document.getElementById('ground-icons');
  console.log(iconGround)

  console.log(tempNumber)

  if (tempNumber <= 59) iconGround.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";

  else if (tempNumber < 69 ) iconGround.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";

  else if (tempNumber < 79 ) iconGround.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";

  else iconGround.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";



};

changeLandscape()
changeTempNumberColor()
