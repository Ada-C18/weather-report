"use strict";



const state = {
    temp : 75,
    sky : "sunny"
}
// let tempValue = 71;
// Elements Selectors 
const tempValue = document.getElementById('tempValue');

const increaseTempControl = document.getElementById('increaseTempControl');

const decreaseTempControl = document.getElementById('decreaseTempControl');

const skySelect = document.getElementById('skySelect');

// Functions 
const increaseTemp = () => {
    state.temp ++;
    tempValue.innerHTML = state.temp;
} 

const decreaseTemp = () => {
    state.temp --;
    tempValue.innerHTML = state.temp;
}

const skySelector = () => {
    state.sky ;
    skySelect.innerHTML = state.sky
    if (state.sky == "sunny")
    state.
}

// Listeners 

increaseTempControl.addEventListener("click", increaseTemp);

decreaseTempControl.addEventListener("click", decreaseTemp);

// skySelect.addEventListener("select", )





    // Element Selectors

    // const resetInput = () => {
    //     cityName.innerHTML = "Indianapolis, IN";
    //     userInput.value='';
    //     sky.Select.value="sunny";

    //     // helper function needed
    //     makeItSunny();
    //     actualTempNumber.innerText='';
    // }
