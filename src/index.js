const state = {
    temp: 69,
}

const increaseTemp = () => {
    const displayTemp = document.getElementById("display-temp");
    state.temp += 1;
    displayTemp.textContent = `${state.temp}°  F`;
}

const decreaseTemp = () => {
    const displayTemp = document.getElementById("display-temp");
    state.temp -= 1;
    displayTemp.textContent = `${state.temp}°  F`;
}

const registerEventHandlers = () => {
    const increaseButton = document.getElementById("increaseButton");
    increaseButton.addEventListener("click", increaseTemp)
    const decreaseButton = document.getElementById("decreaseButton");
    decreaseButton.addEventListener("click", decreaseTemp)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);