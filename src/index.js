'use strict';
const state = {
    city: 'Los Angeles',
    temperature: 76,
    };


const tempNumber = document.getElementById('temp-number');
tempNumber.textContent = `${state.temperature} f`;
const gardColor=document.getElementById('gardenia');

//cit-name
//header-city-name

//const newCity=document.getElementById('cit-name')
const headerCity=document.getElementById('header-city-name');

const changeCity=()=>{
    const newCity=document.getElementById('cit-name').value;
    //const headerCity=document.getElementById('header-city-name');
    state.city=newCity;
    headerCity.textContent=`${state.city}`;
};


//const newnew=document.getElementById('reset-butt')
const resetCity = () => {
    const newnew=document.getElementById('cit-name')
    newnew.value = 'Los Angeles';
    changeCity();
};



const gardColorz=()=>{
    const tempz=state.temperature;
    if (tempz> 80) {
        gardColor.textContent='🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
    } else if (tempz > 70) {
        gardColor.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (tempz > 60) {
        gardColor.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (tempz > 50) {
        gardColor.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else {
        gardColor.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }


};


const tempColor=()=>{
    const tempz=state.temperature;
    if (tempz> 80) {
        tempNumber.style.color = 'red';
    } else if (tempz > 70) {
        tempNumber.style.color = 'orange';
    } else if (tempz > 60) {
        tempNumber.style.color = 'yellow';
    } else if (tempz > 50) {
        tempNumber.style.color = 'green';
    } else {
        tempNumber.style.color = 'teal';
    }


};

const incTempNumber = () => {
    //console.log("anything")
    state.temperature += 1;
    tempNumber.textContent = `${state.temperature}° f`;
    tempColor();
    gardColorz();
};
const decTempNumber = function () {
    state.temperature -= 1;
    tempNumber.textContent = `${state.temperature}° f`;
    tempColor();
    gardColorz();
};



const registerEventHandlers = (event) => {
    const incTheTemp = document.getElementById('inc-temp');
    incTheTemp.addEventListener('click', incTempNumber);
    const decTheTemp = document.querySelector('#dec-temp');
    decTheTemp.addEventListener('click', decTempNumber);
    const tempColor=document.getElementById('temp-number');
    tempColor.addEventListener('click',tempColor);
    const changeCt=document.getElementById('cit-name');
    changeCt.addEventListener('input',changeCity);
    const citcit=document.getElementById('reset-butt');
    citcit.addEventListener('click',resetCity);
    
    





};


document.addEventListener('DOMContentLoaded', registerEventHandlers);













