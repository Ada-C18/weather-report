const state = {
    city: 'Ann Arbor',
    lat: 42.279594,
    long: -83.732124,
    temp: 25,
    displayName: 'Ann Arbor, MI',
};

const convertKtoF = (temp) => {
    return (temp - 273.15) * (9 / 5) + 32;
};

const getLatLon = () => {
    axios
        .get('http://127.0.0.1:5000/location', {
            params: {
                q: state.city,
        },
    })
    .then((response) => {
        console.log(response.data[0]);
        state.lat = response.data[0].lat;
        state.long = response.data[0].lon;
        state.displayName = response.data[0].display_name;
        getWeather();
    })
    .catch((error) => {
        console.log('Error finding the latitude and longitude:', error.response);
    });
};

const getWeather = () => {
    axios.get('http://127.0.0.1:5000/weather', {
        params: {
            lat: state.lat,
            lon: state.long,
            displayName: state.displayName,
        },
    })
    .then((response) => {
        console.log(response.data)
        const weather = response.data;
        state.temp = Math.round(convertKtoF(weather.main.temp));
        formatTempAndGarden();
    })
    .catch((error) => {
        console.log('Error getting the weather:', error);
    });
};

const updateSky = () => {
    const inputSky = document.getElementById('skySelect').value;
    const skyContainer = document.getElementById('sky');
    let sky = '';
    let skyColor = '';
    if (inputSky === 'Cloudy') {
        sky = '☁️👽☁️ ☁️ ☁️👽☁️ ☁️ 🌤 ☁️ ☁️👽☁️';
        skyColor = 'cloudy';
    } else if (inputSky === 'Sunny') {
        sky = '☁️  🤖   ☁️ 🤖 ☁️ ☀️ ☁️ 🤖 ☁️';
        skyColor = 'sunny';
    } else if (inputSky === 'Rainy') {
        sky = '🧟‍♀️🌈⛈🌧🧟‍♀️💧⛈🌧🌦🧟‍♀️💧🌧🧟‍♀️';
        skyColor = 'rainy';
    } else if (inputSky === 'Snowy') {
        sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
        skyColor = 'snowy';
    }
    skyContainer.textContent = sky;
    const gardenContent = document.getElementById('gardenContent');
    gardenContent.classList = `garden__content ${skyColor}`;
};

    const updateCityName = () => {
        const inputName = document.getElementById('cityNameInput').value;
        const headerCityName = document.getElementById('headerCityName');
        state.city = inputName;
        headerCityName.textContent = state.city;
};

const resetCityName = () => {
    const cityNameInput = document.getElementById('cityNameInput');
    cityNameInput.value = 'Ann Arbor';
    updateCityName();
};
const updateDisplayName = () => {
    let displayName = document.getElementById('weatherDisplayName');
    displayName.textContent = state.displayName;
};

const resetDisplay = () => {
    const cityNameInput = document.getElementById('weatherDisplayName');
    cityNameInput.textContent = 'Ann Arbor, MI';
    updateDisplayName();
};


const formatTempAndGarden = () => {
    let temp = state.temp;
    let color = 'red';
    let landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    if (temp > 80) {
        color = 'red';
        landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (temp > 70) {
        color = 'orange';
        landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (temp > 60) {
        color = 'yellow';
        landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    }   else if (temp > 50) {
        color = 'green';
        landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else {
        color = 'teal';
        landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }

    const newLandscape = document.getElementById('landscape');
    newLandscape.textContent = landscape;
    const temperature = document.getElementById('tempValue');
    temperature.className = color;
    temperature.textContent = String(state.temp);
};

const increaseTemp = () => {
    state.temp += 1;
    formatTempAndGarden();
};

const decreaseTemp = () => {
    state.temp -= 1;
    formatTempAndGarden();
};

const registerEventHandlers = () => {
    formatTempAndGarden();

    const currentTempButton = document.getElementById('currentTempButton');
    currentTempButton.addEventListener('click', getLatLon);

    const increaseTempControl = document.getElementById('increaseTempControl');
    increaseTempControl.addEventListener('click', increaseTemp);

    const decreaseTempControl = document.getElementById('decreaseTempControl');
    decreaseTempControl.addEventListener('click', decreaseTemp);

    updateCityName();
    const cityNameInput = document.getElementById('cityNameInput');
    cityNameInput.addEventListener('input', updateCityName);
    
    const cityNameResetBtn = document.getElementById('cityNameReset');
    cityNameResetBtn.addEventListener('click', resetCityName);
    
    updateDisplayName();
    const cityDisplayName = document.getElementById('currentTempButton');
    cityDisplayName.addEventListener('click', updateDisplayName);
    
    const cityDisplayNameReset = document.getElementById('cityNameReset');
    cityDisplayNameReset.addEventListener('click', resetDisplay);

    updateSky();
    const skySelect = document.getElementById('skySelect');
    skySelect.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);