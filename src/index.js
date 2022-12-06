"use strict";

const currentTemp = {
    currTemp: 72, //This will be a function call in later wave
  };

const upTemp = () => {
    console.log('up')
    currentTemp.currTemp++;
    const tempContainer = document.querySelector("#temp-current");
    tempContainer.textContent = `${currentTemp.currTemp}`;
    tempColor(currentTemp.currTemp)
    landTitle()
  };

  const downTemp = () => {
    console.log('down')
    currentTemp.currTemp--;
    const tempContainer = document.querySelector("#temp-current");
    tempContainer.textContent = `${currentTemp.currTemp}`;
    tempColor(currentTemp.currTemp)
    landTitle()
  };

/*
  | 80+             | Red    |
  | 70-79           | Orange |
  | 60-69           | Yellow |
  | 50-59           | Green  |
  | 49 or below     | Teal   |
*/

  const tempColor = () => {
    const tempCurrent = document.getElementById('temp-current')
    const numericTemp = parseInt(tempCurrent.innerHTML)
    let color;
    switch (true) {
        case (numericTemp >= 80):
            color = 'red';
            break;
        case (numericTemp >= 70):
            color = 'orange';
            break;
        case (numericTemp >= 60):
            color = 'yellow';
            break;
        case (numericTemp >= 50):
            color = 'green';
            break;
        default:
            color = 'teal';
            break;
    }
    tempCurrent.className = color;
    }
    
    // | 80+             | `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`       |
    // | 70-79           | `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`      |
    // | 60-69           | `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`        |
    // | 59 or below     | `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"` |

  const landTitle = () => {
    const landStr = document.getElementById('landscape')
    const tempCurrent = document.getElementById('temp-current')
    const numericTemp = parseInt(tempCurrent.innerHTML)
    let text;
    switch (true) {
        case (numericTemp >= 80):
            text = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
            break;
        case (numericTemp >= 70):
            text = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
            break;
        case (numericTemp >= 60):
            text = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
            break;
        default:
            text = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
            break;
    }
    landStr.textContent = text;
    }

  const registerEventHandlers = () => {
    const increaseTemp = document.getElementById("temp-up");
    increaseTemp.addEventListener("click", upTemp);
    
    const decreaseTemp = document.getElementById("temp-down");
    decreaseTemp.addEventListener("click", downTemp);
    
  };
  
  document.addEventListener("DOMContentLoaded", registerEventHandlers);