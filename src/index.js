const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: 45,
    tempDisplay: null,
    landscape: null,
    cityResetButton: null,
    cityName: null,
    headerCityName: null,
};

const loadControls = () => {
    state.increaseTempControl = document.getElementById('increaseTempControl');
    state.decreaseTempControl = document.getElementById('decreaseTempControl');
    state.tempDisplay = document.getElementById('tempValue');
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
    if (state.tempValue >= 80) {
        state.tempDisplay.className = 'red';
        return;
    }
    
    if (state.tempValue >= 70) {
        state.tempDisplay.className = 'orange';
        return;
    }

    if (state.tempValue >= 60) {
        state.tempDisplay.className = 'yellow';
        return;
    }

    if (state.tempValue >= 50) {
        state.tempDisplay.className = 'green';
        return;
    }

    state.tempDisplay.className = 'teal';
}

const handleChangeLandscape = (event) => {
    if (state.tempValue >= 80) {
        state.landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
        return;
    }

    if (state.tempValue >= 70) {
        state.landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
        return;
    }

    if (state.tempValue >= 60) {
        state.landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
        return;
    }

    state.landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
}

const handleResetCityClicked = (event) => {
    state.cityName.value = '';
    state.headerCityName.textContent = 'Seattle';
}

const registerEvents = () => {
    state.increaseTempControl.addEventListener('click', handleIncreaseTempClicked);
    state.decreaseTempControl.addEventListener('click', handleDecreaseTempClicked);
    state.cityResetButton.addEventListener('click', handleResetCityClicked);
};

const onLoaded = () => {
    loadControls();
    registerEvents();
};

onLoaded();

////////////////wave 3\\\\\\\\\\\\\\\\\\\

const input = document.querySelector('input');

input.oninput = function () {
  state.headerCityName.innerHTML = input.value;
};

///////////////Wave 5\\\\\\\\\\\\\\\\

const iinput = document.getElementById('skySelect');
const p = document.getElementById('gardenContent');

iinput.onchange = function () {
  p.innerHTML = iinput.value;
};
