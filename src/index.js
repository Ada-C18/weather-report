
const state = {
    city: 'Seattle',
    lat: 47.6038321,
    long: -122.330062,
    temp: 0
}

const convertKtoF = (temp) => {
    return (temp - 273.15) * (9 / 5) + 32;
};

const findLatandLong = () => {
    axios.get('http://127.0.0.1:5000/location', 
    {
        params: {
            q: state.city,
    }
})
    .then ( (response) => {
        state.lat = response.data[0].lat;
        state.long = response.data[0].lon;
        getWeather();
        return (state.lat, state.long)
    
})
    .catch ( (error) => {
        console.log('Error getting long and lat', error.response);
    });
};

const getWeather = () => {
    axios.get('http://127.0.0.1:5000/weather',
    {
        params: {
            lat: state.lat,
            lon: state.long,
    }
})
    .then( (response) => {
        const temperature = response.data.main.temp;
        state.temp = Math.round(convertKtoF(temperature.current.temp));
        return (state.temp)
    })
    .catch( (error) => {
        console.log('Error getting weather', error.response);
    });
}


const updateTemp = () => {
    const newTemp = getWeather(state.city)
    const tempValue = document.getElementById(tempValue)
    state.temp = newTemp
    tempValue.textContent = state.temp
};


const updateCityName = () => {
    const inputName = document.getElementById('cityNameInput').value;
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
    const cityNameInput = document.getElementById('cityNameInput');
    cityNameInput.addEventListener('input', updateCityName);
    const newCityTemp = document.getElementById('currentTempButton');
    newCityTemp.addEventListener('click', updateTemp);
};



document.addEventListener("DOMContentLoaded", registerEventHandlers);
