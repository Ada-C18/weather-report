const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: 45,
    tempDisplay: null,
    gardenContent: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
};

const loadControls = () => {
    state.increaseTempControl = document.getElementById('increaseTempControl');
    state.decreaseTempControl = document.getElementById('decreaseTempControl');
    state.tempDisplay = document.getElementById('tempValue');
    state.gardenContent = document.getElementById('gardenContent');
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
        state.gardenContent.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
        return;
    }

    if (state.tempValue >= 70) {
        state.gardenContent.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
        return;
    }

    if (state.tempValue >= 60) {
        state.gardenContent.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
        return;
    }

    state.gardenContent.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
}

const registerEvents = () => {
    state.increaseTempControl.addEventListener('click', handleIncreaseTempClicked);
    state.decreaseTempControl.addEventListener('click', handleDecreaseTempClicked);
};

const onLoaded = () => {
    loadControls();
    registerEvents();
};

onLoaded();

////////////////wave 3\\\\\\\\\\\\\\\\\\\

const input = document.querySelector('input');
const log = document.getElementById('headerCityName');

input.oninput = function () {
  log.innerHTML = input.value;
};

///////////////Wave 5\\\\\\\\\\\\\\\\

const iinput = document.getElementById('skySelect');
const p = document.getElementById('gardenContent');

iinput.onchange = function () {
  p.innerHTML = iinput.value;
};
