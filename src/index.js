
const { default: axios } = require("axios");


// alert('Hello World');

const tempValue = document.getElementById("tempValue");
const landType = document.getElementById("landscape");

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

//////////// changing background ////////////
// https://code.likeagirl.io/js-set-a-background-using-code-1cc26cf96ce4

// const images = {
//     sun: "url('/images/hot_sun.jpg')",
//     rain: "url('/images/rainy.jpg')",
//     clouds: "url('/images/cloud.jpg')",
//     blossoms: "url('/images/blossoms.jpg')",
//     snow: "url('/images/snowy.jpg')",
//     poppy: "url('/images/orange_flowers.jpg')"
// };

// const setBackground = (image) => {
//     document.body.style.background = images[image];
// };

// if (tempRange === 'orange') {
//     setBackground('blossoms');
// }


