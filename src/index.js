const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: 45,
    tempDisplay: null
};

const loadControls = () => {
    state.increaseTempControl = document.getElementById("increaseTempControl");
    state.decreaseTempControl = document.getElementById("decreaseTempControl");
    state.tempDisplay = document.getElementById("tempValue");
};

const handleIncreaseTempClicked = (event) => {
    ++state.tempValue;
    state.tempDisplay.textContent = state.tempValue;
    handleChangeColor(state.tempValue);
}

const handleDecreaseTempClicked = (event) => {
    --state.tempValue;
    state.tempDisplay.textContent = state.tempValue;
    handleChangeColor(state.tempValue);
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

const registerEvents = () => {
    state.increaseTempControl.addEventListener("click", handleIncreaseTempClicked);
    state.decreaseTempControl.addEventListener("click", handleDecreaseTempClicked);
    // state.tempValue.addEventListener("change", handleChangeColor)
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
