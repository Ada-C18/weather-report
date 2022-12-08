const state = {
    temp: 50,
    city: "Seattle"
}

const displayTemp = document.getElementById("display-temp");
    displayTemp.textContent = `${state.temp}°  F`;

const displayCity = document.getElementById("city");
  displayCity.textContent = `Weather report for the lovely city of ${state.city}`;



const increaseTemp = () => {
    const displayTemp = document.getElementById("display-temp");
    state.temp += 1;
    displayTemp.textContent = `${state.temp}°  F`;
    tempColor(state.temp);
    gardenDisplayer(state.temp);
}

const decreaseTemp = () => {
    const displayTemp = document.getElementById("display-temp");
    state.temp -= 1;
    displayTemp.textContent = `${state.temp}°  F`;
    tempColor(state.temp);
    gardenDisplayer(state.temp);
}

const tempColor = (temp) => {
    const tempBG = document.getElementById("temperature");
    if (temp >= 80) {
        tempBG.style.backgroundColor = 'red';
    } else if (70 <= temp && temp < 80) {
        tempBG.style.backgroundColor = 'orange';
    } else if (60 <= temp && temp < 70) {
        tempBG.style.backgroundColor = 'yellow';
    } else if (50 <= temp && temp < 60) {
        tempBG.style.backgroundColor = 'green';
    } else if (temp <= 49) {
        tempBG.style.backgroundColor = 'teal';
    }
    
    // switch(temp) {
    //     case temp >= 80:
    //         tempBG.style.backgroundColor = 'red';
    //     case 70 <= temp < 80:
    //         tempBG.style.backgroundColor = 'orange';
    //     case 60 <= temp < 70:
    //         tempBG.style.backgroundColor = 'yellow';
    //     case 50 <= temp < 60:
    //         tempBG.style.backgroundColor = 'green';
    //     case temp <= 49: 
    //         tempBG.style.backgroundColor = 'teal';
        
    // }

}

const gardenDisplayer = (temp) => {
    const gardenPics = document.getElementById("garden-pics");
    if (temp >= 80) {
        gardenPics.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
    } else if (70 <= temp && temp < 80) {
        gardenPics.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    } else if (60 <= temp && temp < 70) {
        gardenPics.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    } else if (50 <= temp && temp < 60) {
        gardenPics.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
    };
}

function updateCity(e) {
    const city = document.getElementById('city');
    state.city = e.target.value
    city.textContent = `Weather report for the lovely city of ${state.city}`;
  };


const registerEventHandlers = () => {
    const increaseButton = document.getElementById("increaseButton");
    increaseButton.addEventListener("click", increaseTemp)
    const decreaseButton = document.getElementById("decreaseButton");
    decreaseButton.addEventListener("click", decreaseTemp)
    const input = document.getElementById('city-lookup');
    input.addEventListener('input', updateCity);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);
document.addEventListener("DOMContentLoaded", tempColor(state.temp));
document.addEventListener("DOMContentLoaded", gardenDisplayer(state.temp));
document.addEventListener("DOMContentLoaded", displayCity)