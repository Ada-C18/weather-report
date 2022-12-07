// Todays Goals:
// Have clickable buttons for temperature
// Change color of temperature according to wave-02.md
// Change landscape according to wave-02.md

// getElementById for the buttons and the temp
// Add an event listener ( onClick )for both buttons ( ^ increases by 1, v decreases by 1 )
// Add an event listener that checks temp and assigns color accordingly

// const temperature = document.getElementById("display-temp")

//Set default temp (will update with Weather API)
// window.onLoad = function() => {temperature.innerText = 50}

//Temp Buttons:
// const tempUp = document.getElementById("temp-up")
// const tempDown = document.getElementById("temp-down")
// tempUp.addEventListener('click', () => {temperature.innerText += 1})
// tempDown.addEventListener('click', () => {temperature.innerText -= 1 changeColorAndEmojis(temperature)})


//Color change (needs to be in a function): 

// const landscape = document.getElementById("ground-emoji")
// const changeColorAndEmojis = (temperature) => {
// if (temperature.innerText >= 80) {
    //temperature.style.color = 'red'
    //temperature.style.backgroundColor = someColor
    //landscape.innerText = 🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂
//}
// else if (temperature.innerText >= 70 && temperature.innerText <= 79) {
    //temperature.style.color = orange 
    //temperature.style.backgroundColor = someColor
    //landscape.innerText = 🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷
//}
// else if (temperature.innerText >= 60 && temperature.innerText <= 69) {
    //temperature.style.color = yellow
    //temperature.style.backgroundColor = someColor
    //landscape.innerText = 🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃
//}
// else if (temperature.innerText >= 50 && temperature.innerText <= 59) {
    //temperature.style.color = green
    //temperature.style.backgroundColor = someColor
    //landscape.innerText = 🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲
//}
// else {
    //temperature.style.color = teal
    //temperature.style.backgroundColor = someColor
    //landscape.innerText = 🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲
//}

// Potential switch case for color change! :
// switch(temperature.innerText){
// case >=80: 
    //REPEAT FOR CASES:
    //temperature.style.color = red 
    //temperature.style.backgroundColor = someColor
    //landscape.innerText = 🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂
    //break
// case >= 70: temperature.style.color = orange break
// case >=60: temperature.style.color = yellow break
// case >=50: temperature.style.color = green break
// default: temperature.style.color = teal break
// }

