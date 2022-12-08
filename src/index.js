const state = {
    city: 'Seattle',
    lat: 47.6038321,
    long: -122.330062,
    temp: 0
}

const convertKtoF = (temp) => {
    return (temp - 273.15) * (9 / 5) + 32
}

const findLatAndLong = () => {
    axios
        .get()
}

const updateCityName = () => {
    const inputName = document.getElementById('inputCityName').value;
    const headerCity = document.getElementById('headerCity');
    state.city = inputName;
    headerCity.textContent = state.city;
};

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
    updateCityName();
    const cityNameInput = document.getElementById('cityNameInput');
    cityNameInput.addEventListener('input', updateCityName);
};


document.addEventListener("DOMContentLoaded", registerEventHandlers);
