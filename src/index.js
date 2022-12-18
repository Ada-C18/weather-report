const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    currentTempButton: null,
    tempValue: 45,
    tempDisplay: null,
    sky: null,
    landscape: null,
    cityResetButton: null,
    cityName: null,
    headerCityName: null,
};

const loadControls = () => {
    state.increaseTempControl = document.getElementById('increaseTempControl');
    state.decreaseTempControl = document.getElementById('decreaseTempControl');
    state.currentTempButton = document.getElementById('currentTempButton');
    state.tempDisplay = document.getElementById('tempValue');
    state.sky = document.getElementById('sky');
    state.landscape = document.getElementById('landscape');
    state.cityResetButton = document.getElementById('cityNameReset');
    state.cityName = document.getElementById('cityNameInput');
    state.headerCityName = document.getElementById('headerCityName');
};

const handleIncreaseTempClicked = (event) => {
    ++state.tempValue;
    state.tempDisplay.textContent = state.tempValue;
    handleChangeColor(state.tempValue);
    handleChangeLandscape(state.tempValue);
}

const handleDecreaseTempClicked = (event) => {
    --state.tempValue;
    state.tempDisplay.textContent = state.tempValue;
    handleChangeColor(state.tempValue);
    handleChangeLandscape(state.tempValue);
}

const handleChangeColor = (event) => {
    if (state.tempValue >= 80) return state.tempDisplay.className = 'red';
    
    if (state.tempValue >= 70) return state.tempDisplay.className = 'orange';

    if (state.tempValue >= 60) return state.tempDisplay.className = 'yellow';

    if (state.tempValue >= 50) return state.tempDisplay.className = 'green';

    state.tempDisplay.className = 'teal';
}

const handleChangeLandscape = (event) => {
    if (state.tempValue >= 80) return state.landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';

    if (state.tempValue >= 70) return state.landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';

    if (state.tempValue >= 60) return state.landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';

    state.landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
}

const handleResetCityClicked = (event) => {
    state.cityName.value = '';
    state.headerCityName.textContent = 'Seattle';
}

// const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const getLatLon = async (cityName) => {
    const response = await axios.get('http://127.0.0.1:5000/location', {
        params: {
            q: cityName,
        },
    });
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;

    return { lat, lon };
}

const getWeather = async (coords) => {
    const response = await axios.get('http://127.0.0.1:5000/weather', {
        params: {
            ...coords
        },
    })
    return response.data.main;
}

const handleCurrentTempClicked = async (event) => {
    const coords = await getLatLon(state.cityName.value);
    const weatherData = await getWeather(coords);

    state.tempValue = Math.floor(1.8 * (weatherData.temp - 273) + 32);
    state.tempDisplay.textContent = state.tempValue;
    
    handleChangeColor(state.tempValue);
    handleChangeLandscape(state.tempValue);
};

const registerEvents = () => {
    state.increaseTempControl.addEventListener('click', handleIncreaseTempClicked);
    state.decreaseTempControl.addEventListener('click', handleDecreaseTempClicked);
    state.cityResetButton.addEventListener('click', handleResetCityClicked);
    state.currentTempButton.addEventListener('click', handleCurrentTempClicked);
};

const onLoaded = () => {
    loadControls();
    registerEvents();
};

document.addEventListener('DOMContentLoaded', onLoaded());

////////////////wave 3\\\\\\\\\\\\\\\\\\\

const input = document.querySelector('input');

input.oninput = function () {
  state.headerCityName.innerHTML = input.value;
};

///////////////Wave 5\\\\\\\\\\\\\\\\

const iinput = document.getElementById('skySelect');

iinput.onchange = function () {
  state.sky.innerHTML = iinput.value;
};
