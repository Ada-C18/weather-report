
const state = {
    city: 'Seattle',
    lat: 47.6038321,
    long: -122.330062,
    temp: 45
}

const convertKtoF = (temp) => {
    return (temp - 273.15) * (9 / 5) + 32;
};

const findLatandLong = () => {
    return axios.get('http://127.0.0.1:5000/location', 
    {
        params: {
            q: state.city,
    }
})
    .then ( (response) => {
        const lat = response.data[0].lat;
        const long = response.data[0].lon;
        console.log(lat, long);
        return getWeather(lat, long);
    
})
    .catch ( (error) => {
        // console.log('Error getting long and lat', error.response);
        console.log(error);
    });
};

const getWeather = (lat,long) => { 
    return axios.get('http://127.0.0.1:5000/weather',
    {
        params: {
            lat: lat,
            lon: long,
    }
})
    .then( (response) => {
        const temperature = response.data.main.temp;
        console.log(temperature)
        const newTemperature = Math.round(convertKtoF(temperature));
        return newTemperature; 

    })
    .catch( (error) => {
        console.log('Error getting weather', error);
    });
}


const updateTemp = () => {
    const tempValue = document.getElementById('tempValue')
    findLatandLong().then((newTemperature) => {
        tempValue.textContent = newTemperature
        state.temp = newTemperature
        updateTempLandscape();
    })
};


const updateCityName = () => {
    const inputName = document.getElementById('cityNameInput').value;
    const headerCity = document.getElementById('headerCity');
    state.city = inputName;
    headerCity.textContent = state.city;
};

const updateSky = () => {
    const inputSky = document.getElementById('skySelect').value;
    const skyContainer = document.getElementById('sky');
    let sky = '';
    let skyColor = '';
    if (inputSky === 'sunny') {
        sky = '☁️ ☁️ 🌞 ⛅️ ⛅️ ';
        skyColor = 'sunny';
    } else if (inputSky === 'cloudy') {
        sky = '☁️ ☁️ ☁️ ☁️ 🌥 ☁️';
        skyColor = 'cloudy';
    } else if (inputSky === 'rainy') {
        sky = '🌧 🌧 🌧 🌧 🌈 🌧';
        skyColor = 'rainy';
    } else if (inputSky === 'snowy') {
        sky = '🌨 🌨 ❄️ 🌨 ❄️ 🌨';
        skyColor = 'snowy';
    }
    skyContainer.textContent = sky;
    const gardenContainer = document.getElementById('gardenContainer');
    gardenContainer.classList = `garden-content ${skyColor}`;
}

const updateTempLandscape = () => {
    let temp = state.temp;
    let color = 'red';
    let landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    if (temp > 80) {
        color = 'red';
        landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
    }  else if (temp > 70) {
    color = 'orange';
    landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (temp > 60) {
    color = 'yellow';
    landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (temp > 50) {
    color = 'green';
    landscape = '🌿🌱🏔__🌲🌿🌱__🏔🌲🌿__🌱🏔🌲';
    } else {
    color = 'teal';
    landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }
    const newLandscape = document.getElementById('landscape');
    newLandscape.textContent = landscape;
    const temperature = document.getElementById('tempValue');
    temperature.className = color;
    temperature.textContent = state.temp
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
    updateTempLandscape();

    const newCityTemp = document.getElementById('currentTempButton');
    newCityTemp.addEventListener('click', updateTemp);

    const addTemp = document.getElementById("increaseTemp");
    addTemp.addEventListener("click", increaseTemp);

    const lowerTemp = document.getElementById("decreaseTemp");
    lowerTemp.addEventListener("click", decreaseTemp);

    const cityNameInput = document.getElementById('cityNameInput');
    cityNameInput.addEventListener('input', updateCityName);

    
    
    const skySelect = document.getElementById('skySelect');
    skySelect.addEventListener('change', updateSky);
};



document.addEventListener('DOMContentLoaded', registerEventHandlers);
