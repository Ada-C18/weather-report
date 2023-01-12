const state = {
    temp: 72,
    city: 'San Luis Obispo',
    lat: 35.2828,
    lon: -120.6596,
};

// WAVE 1 //
let tempValue = state.temp;
const tempControl = document.querySelector('#tempValue');
const tempStyleControl = document.querySelector('#tempStyle');

const changeTempColor = () => {
    let color = '';
    if (tempStyleControl.textContent.includes('°F')) {
        if (tempValue >= 85) {
            color = 'crimson';
        } else if (tempValue >= 70) {
            color = 'coral';
        } else if (tempValue >= 55) {
            color = 'peru';
        } else if (tempValue >= 33) {
            color = 'olive';
        } else if (tempValue <= 32) {
            color = 'steelblue';
        }
    } else {
        if (tempValue >= 30) {
            color = 'crimson';
        } else if (tempValue >= 21) {
            color = 'coral';
        } else if (tempValue >= 13) {
            color = 'peru';
        } else if (tempValue >= 1) {
            color = 'olive';
        } else if (tempValue <= 0) {
            color = 'steelblue';
        }
    }
    tempControl.style.color = color;
    tempStyleControl.style.color = color;
};

const increaseTemp = () => {
    tempValue += 1;
    tempControl.textContent = `${tempValue}`;
    changeTempColor();
    changeLandscape();
};

const decreaseTemp = () => {
    tempValue -= 1;
    tempControl.textContent = `${tempValue}`;
    changeTempColor();
    changeLandscape();
};

// WAVE 2 //
const landscapeContainer = document.querySelector('#landscape');

const changeLandscape = () => {
    const landscapeContainer = document.getElementById('landscape')
    
    let landscape = '';
    if (tempStyleControl.textContent.includes('°F')) {
        if (tempValue >= 85) {
            landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
        } else if (tempValue >= 65) {
            landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
        } else if (tempValue >= 40) {
            landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        } else if (tempValue <= 39) {
            landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        }
    } else {
        if (tempValue >= 30) {
            landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
        } else if (tempValue >= 18) {
            landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
        } else if (tempValue >= 5) {
            landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        } else if (tempValue <= 4) {
            landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        }
    }
    landscapeContainer.textContent = landscape
};

// Wave 3 //
let city = state.city;
const cityName = document.querySelector('#cityName');

const changeCity = () => {
    const changeCityInput = document.querySelector('#inputCity');
    state.city = changeCityInput.value;
    cityName.textContent = state.city;
};

// Wave 4 //
const kelvinToFahrenheit = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32;
};

const getLiveTemp = async () => {
    const response = await axios.get('https://stevie-weather-server.herokuapp.com/weather', {
        params: {
            lat: state.lat,
            lon: state.lon,
        },
    });
    const weather = kelvinToFahrenheit(response.data.main.temp);

    tempValue = Math.round(weather);
    tempControl.textContent = `${tempValue}`;
    changeTempColor();
    changeLandscape();
};

const getLatLon = async () => {
    const response = await axios.get('https://stevie-weather-server.herokuapp.com/location', {
        params: {
            q: state.city,
        },
    });
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon;

    getLiveTemp();
};

// Wave 5 //
const changeSky = () => {
    const inputSky = document.getElementById('sky-select').value;
    const skyContainer = document.querySelector('#sky');
    let sky = '';
    let skyColor = '';
    if (inputSky === 'Sunny') {
        sky = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
        skyColor = 'sunny';
    } else if (inputSky === 'Cloudy') {
        sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
        skyColor = 'cloudy';
    } else if (inputSky === 'Rainy') {
        sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
        skyColor = 'rainy';
    } else if (inputSky === 'Snowy') {
        sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
        skyColor = 'snowy';
    }
    skyContainer.style.color = sky;
    skyContainer.textContent = sky
    const landscape = document.getElementById('gardenContent');
    landscape.classList = `garden__content ${skyColor}`;
};

// Wave 6  //
const resetCity = () => {
    const changeCityInput = document.querySelector('#inputCity');
    changeCityInput.value = 'San Luis Obispo';
    cityName.textContent = 'San Luis Obispo';
    state.city = 'San Luis Obispo';
    getLatLon();
};

// Optional Enhancements //
const fahrenheitToCelsius = () => {
    return (tempValue - 32) * (5 / 9);
};

const celsiusToFahrenheit = () => {
    return (tempValue * (9 / 5)) + 32;
};

const convertTemperature = () => {
    const convertButton = document.querySelector('#convertTemp');
    if (convertButton.textContent.includes('Convert to Celsius')) {
        const weather = fahrenheitToCelsius();
        tempValue = Math.round(weather);
        tempControl.textContent = `${tempValue}`;
        tempStyleControl.textContent = '°C';
        convertTemp.textContent = 'Convert to Fahrenheit';
    } else if (convertButton.textContent.includes('Convert to Fahrenheit')) {
        const weather = celsiusToFahrenheit();
        tempValue = Math.round(weather);
        tempControl.textContent = `${tempValue}`;
        tempStyleControl.textContent = '°F';
        convertTemp.textContent = 'Convert to Celsius';
    }
};


// Register Event Handlers //
const registerEventHandlers = () => {
    getLiveTemp();

    const increaseTempControl = document.getElementById('increaseTempControl');
    increaseTempControl.addEventListener('click', increaseTemp)

    const decreaseTempControl = document.getElementById('decreaseTempControl');
    decreaseTempControl.addEventListener('click', decreaseTemp)

    changeCity();
    const inputCity = document.querySelector('#inputCity');
    inputCity.addEventListener('input', changeCity);

    const currentTempButton = document.querySelector('#currentTempButton');
    currentTempButton.addEventListener('click', getLatLon);

    changeSky();
    const skySelect = document.getElementById('sky-select');
    skySelect.addEventListener('change', changeSky);

    const resetCityButton = document.getElementById('resetCityButton');
    resetCityButton.addEventListener('click', resetCity);

    const convertTemp = document.getElementById('convertTemp');
    convertTemp.addEventListener('click', convertTemperature);
    };

document.addEventListener("DOMContentLoaded", registerEventHandlers);