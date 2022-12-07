"use strict";
const updateCityName = ()=>{
  const chosenCityInputName = document.getElementById('cityNameInput').value;
};

const resetCityName = ()=>{
  const originalNameInput = document.getElementById('cityNameInput');
  updateCityName(); //callback function
};

const updateCrabCount = () => {
  const crabCounterElement = document.querySelector('#crabCounter');
  crabCounterElement.textContent = `Total Crab: ${state.crabCount}`;
  
};




const registerEventHandlers= () =>{};