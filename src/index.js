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
  };

  const downTemp = () => {
    console.log('down')
    currentTemp.currTemp--;
    const tempContainer = document.querySelector("#temp-current");
    tempContainer.textContent = `${currentTemp.currTemp}`;
    tempColor(currentTemp.currTemp)
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
    
  
  const registerEventHandlers = () => {
    const increaseTemp = document.getElementById("temp-up");
    increaseTemp.addEventListener("click", upTemp);
    
    const decreaseTemp = document.getElementById("temp-down");
    decreaseTemp.addEventListener("click", downTemp);
    
  };
  
  document.addEventListener("DOMContentLoaded", registerEventHandlers);