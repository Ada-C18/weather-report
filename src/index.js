// import axios from "axios";


// alert('Hello World');
// const axios = require('axios');
// axios.get()
const tempValue = document.getElementById("tempValue");
// console.log(tempValue);

const tempRange = num => {
    // num = tempValue
    // console.log(num);
    if (num < 49) {
        return 'teal';
    } else if (num < 59) {
        return 'green';
    } else if (num < 69) {
        // console.log('yellow');
        return 'yellow';
    } else if (num < 79) {
        return 'orange';
    } else {
        return 'red';
    }
}
// console.log(tempRange);

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