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

const handleIncreaseTempClicked = () => {
    ++state.tempValue;
    state.tempDisplay.textContent = state.tempValue;
}

const handleDecreaseTempClicked = () => {
    --state.tempValue;
    state.tempDisplay.textContent = state.tempValue;
}

const registerEvents = () => {
    state.increaseTempControl.addEventListener("click", handleIncreaseTempClicked);
    state.decreaseTempControl.addEventListener("click", handleDecreaseTempClicked);
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
