"use strict";
// const axios = require('axios')

let increaseBtn = document.getElementById("increaseBtn");
let decreaseBtn = document.getElementById("decreaseBtn");
let curTemp = document.getElementById("curTemp");
let counter = 0;


increaseBtn.addEventListener('click', ()=>{
  counter++;
  curTemp.innerHTML = counter;
});

decreaseBtn.addEventListener('click', ()=>{
  counter--;
  curTemp.innerHTML = counter
});

// const counterColor = () =>{
//   if (counter >= 80){
//     curTemp.classList.add("red");
//   } else if (counter <= 79) {
//     curTemp.classList.add("orange");
//   } else if (counter <= 69) {
//     curTemp.classList.add("yellow");
//   } else if (counter <= 59) {
//     curTemp.classList.add("green");
//   } else if (counter <= 49) {
//     curTemp.classList.add("teal");
//   }
// };

const cityName = () =>{
  const city = document.getElementById("cityInput").value;
  document.getElementById("demo") = city;
  console.log('it wors')

};

document.addEventListener('click', cityName)