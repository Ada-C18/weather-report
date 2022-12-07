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
  let iconGround = document.getElementById('ground-icons').innerText;

  console.log(iconGround)

  console.log(tempNumber)

  if (tempNumber <= 59) iconGround = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";

  else if (tempNumber < 69 ) iconGround = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";

  else if (tempNumber < 79 ) iconGround = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";

  else iconGround = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";

};

changeLandscape()
changeTempNumberColor()
