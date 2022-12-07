import axios from 'axios';

const state = {
    
}

const updateCityName = () => {
    const inputName = document.getElementById('cityNameInput').value;
    const headerCity = document.getElementById('headerCity');
    state.city = inputName;
    headerCity.textContent = state.city;
};

updateCityName();
const cityNameInput = document.getElementById('cityNameInput');
cityNameInput.addEventListener('input', updateCityName);