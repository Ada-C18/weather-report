// Todays Goals:
// Have clickable buttons for temperature
// Change color of temperature according to wave-02.md
// Change landscape according to wave-02.md

// getElementById for the buttons and the temp
// Add an event listener ( onClick )for both buttons ( ^ increases by 1, v decreases by 1 )
// Add an event listener that checks temp and assigns color accordingly

let temperature = document.getElementById("display-temp")

//Set default temp (will update with Weather API using proxy server)
window.onload = () => {temperature.innerHTML = 50}

//Temp Buttons:
const tempUp = document.getElementById("temp-up")
const tempDown = document.getElementById("temp-down")
tempUp.addEventListener('click', () => {
    let tempHTML = Number(temperature.innerHTML)
    tempHTML += 1;
    temperature.innerHTML = tempHTML;
    changeColorAndEmojis(temperature)
})
tempDown.addEventListener('click', () => {
    let tempHTML = Number(temperature.innerHTML)
    tempHTML -= 1;
    temperature.innerHTML = tempHTML;
    changeColorAndEmojis(temperature)
})

const landscape = document.getElementById("ground-emoji")
const changeColorAndEmojis = (temperature) => {

    if (temperature.innerText >= 80) {
        temperature.style.color = 'red'
        temperature.style.backgroundColor = 'white'
        landscape.innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
    }
    else if (temperature.innerText >= 70 && temperature.innerText <= 79) {
        temperature.style.color = 'orange'
        temperature.style.backgroundColor = 'white'
        landscape.innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'
    }
    else if (temperature.innerText >= 60 && temperature.innerText <= 69) {
        temperature.style.color = 'yellow'
        temperature.style.backgroundColor = 'white'
        landscape.innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'
    }
    else if (temperature.innerText >= 50 && temperature.innerText <= 59) {
        temperature.style.color = 'green'
        temperature.style.backgroundColor = 'white'
        landscape.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    }
    else {
        temperature.style.color = 'teal'
        temperature.style.backgroundColor = 'white'
        landscape.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
    }
    // switch(Number(temperature.innerHTML)){
    //     case Number(temperature.innerHTML) >= 80:
    //         temperature.style.color = 'red'
    //         temperature.style.backgroundColor = 'red'
    //         landscape.innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
    //         break;
    //     case Number(temperature.innerHTML) >= 70:
    //         temperature.style.color = 'orange' 
    //         temperature.style.backgroundColor = 'orange'
    //         landscape.innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'
    //         break;
    // }
}

let inputCity = document.getElementById("input-city")

let cityName = document.getElementById("city-name")
const changeCity = (inputCity) => {
    cityName.innerHTML = inputCity.value
}
inputCity.addEventListener('change', () => {changeCity(inputCity)})