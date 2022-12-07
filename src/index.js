"use strict";

// const state = {
//     weatherCount: 0,
//   };

//   state.weatherCount += 1;
//   const weatherCountContainer = document.querySelector("#crabCount")
//   weatherCountContainer.textContent = `Crab Count: ${state.weatherCount}`;
// ;

// button.addEventListener("click", function() {
//     var increment = document.getElementById("count");
//     increment.innerText = count;
//     count++;
//   });
// const registerEventHandlers = () => {
//     const increaseButton = document.querySelector("#increaseButton");
//     increaseButton.addEventListener("click", addCrab);


//     ocument.addEventListener("DOMContentLoaded", registerEventHandlers);

// Select increment and decrement buttons

// let displayTemperature = parseInt(document.querySelector('.displayTemperature'));


let number = parseInt(document.querySelector('.number').innerHTML);
const plus = document.querySelector('.plus_minus'),
  minus = document.querySelector('.minus_plus');
  
plus.addEventListener('click',() => {
    number++ ;
    document.querySelector('.number').innerHTML = number;
   });

minus.addEventListener('click',() => {
    number--;
    document.querySelector('.number').innerHTML = number;
   });
