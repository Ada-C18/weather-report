// const state = {
    
// }

// const updateCityName = () => {
//     const inputName = document.getElementById('cityNameInput').value;
//     const headerCity = document.getElementById('headerCity');
//     state.city = inputName;
//     headerCity.textContent = state.city;
// };

// updateCityName();
// const cityNameInput = document.getElementById('cityNameInput');
// cityNameInput.addEventListener('input', updateCityName);

let i = 0;
let currentTemp = document.getElementById("tempValue");
currentTemp.innerHTML = i;

const increaseTemp = () => {
    i++;
    currentTemp.innerHTML = i;
};

const decreaseTemp = () => {
    i--;
    currentTemp.innerHTML = i;
};

const registerEventHandlers = () => {
    const addTemp = document.getElementById("increaseTemp");
    addTemp.addEventListener("click", increaseTemp);
    const lowerTemp = document.getElementById("decreaseTemp");
    lowerTemp.addEventListener("click", decreaseTemp);
};


document.addEventListener("DOMContentLoaded", registerEventHandlers);
