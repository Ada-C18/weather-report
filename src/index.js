// import axios from "axios";


// alert('Hello World');
// const axios = require('axios');
// axios.get()
const tempValue = document.getElementById("tempValue");
const landType = document.getElementById("landscape");

const images {
    sun: "url('/images/hot_sun.jpg')"
};

const tempRange = num => {
    if (num < 50) {

        landType.innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
        return 'teal';
    } else if (num < 60) {
        
        landType.innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
        return 'green';
    } else if (num < 70) {
        
        landType.innerHTML = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
        return 'yellow';
    } else if (num < 80) {
        landType.innerHTML = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
        return 'orange';
    } else {
        landType.innerHTML = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
        return 'red';
    }
}

const changeLand = num => {

}

const upButton = document.getElementById('increaseTemp');
upButton.addEventListener('click', e => {
    tempValue.innerHTML = Number(tempValue.innerHTML) + 1;
    tempValue.style.color = tempRange(Number(tempValue.innerHTML));
});

const downButton = document.getElementById('decreaseTemp');
downButton.addEventListener('click', e => {
    tempValue.innerHTML = Number(tempValue.innerHTML) - 1;
    tempValue.style.color = tempRange(Number(tempValue.innerHTML));
});