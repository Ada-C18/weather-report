"use strict";


const state = {
    temp : 70, 
    sky : document.getElementById('skySelect'),
    location : '',
    lon : 0,
    lat : 0
}

// Elements Selectors 
const tempValue = document.getElementById('tempValue');

const actualTempValue = document.getElementById('actualValue')

const increaseTempControl = document.getElementById('increaseTempControl');

const decreaseTempControl = document.getElementById('decreaseTempControl');

const skySelect = document.getElementById('skySelect');

const desiredSky = document.getElementById('desiredSky')

const desiredLandscape = document.getElementById('landscape')

const bgColor = document.getElementById('backgroundColor')

const headerCityName = document.getElementById('headerCityName')

const cityNameInput = document.getElementById('cityNameInput')

const submitButton = document.getElementById('cityNameSubmit')

const resetButton = document.getElementById('cityNameReset')



// Functions 
// TEMP CHANGES
const increaseTemp = () => {
    state.temp ++;
    tempValue.innerHTML = state.temp + "°" ;
} 

const decreaseTemp = () => {
    state.temp --;
    tempValue.innerHTML = state.temp + "°" ;
}

// CITY HEADER
const changeCityName = () => {
    headerCityName.innerHTML = cityNameInput.value 

}

// State.Location Update
const locationUpdate = () => {
    state.location = cityNameInput.value; 
    getLocation();
}

const resetLocation = () => {
    state.location = '';
    cityNameInput.value = state.location;
    changeCityName();
}

//SKY CHANGES 
const skySelector = () => {
    if (state.sky.value == "sunny") {
        desiredSky.textContent = "☀️🌞☀️🌞☀️🌞☀️🌞☀️🌞☀️🌞☀️🌞"
    }
    else if (state.sky.value == "cloudy") {
        desiredSky.textContent = "🌥🌥🌥🌥🌥🌥🌥🌥🌥🌥🌥"
    }
    else if (state.sky.value == "rainy") {
        desiredSky.textContent = "🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧"
    }
    else if (state.sky.value == "snowy") {
        desiredSky.textContent = "🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨"
    }
}

const validateSkyCondition = (skyCondition) => {
    if (skyCondition == "Thunderstorm" || skyCondition == "Drizzle" || skyCondition == "Rain" ) {
        state.sky.value = "rainy";
    } 
    else if (skyCondition == "Clouds") {
        state.sky.value = "cloudy";
    }
    else if (skyCondition == "Snow") {
        state.sky.value = "snowy";
    }
    else {
        state.sky.value = "sunny";
    }
}

// LANDSCAPE CHANGES
const landscapeChange = () =>{
    if (state.temp >= 80){
        desiredLandscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
        bgColor.style.backgroundColor = '#E24E1B'
    } 
    else if (state.temp >= 70 ){
        desiredLandscape.textContent = "🌸🌿🌼__🌷🌻🌿_🌱_🌻🌷"
        bgColor.style.backgroundColor = '#E5B25D'
    }
    else if (state.temp >= 60 ){
        desiredLandscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
        bgColor.style.backgroundColor = '#D0CFEC'
    }
    else if (state.temp >= 50 ){
        desiredLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
        bgColor.style.backgroundColor = "#875C74"
    }
    else if (state.temp <= 40 ){
        bgColor.style.backgroundColor = "#1B4079"
    }
}

// API Calls
// Location
const getLocation = () => {
    axios
        .get('http://127.0.0.1:5000/location', {
            params: {
                q: state.location
            }
        })
        .then((response) => {
            state.lon = response.data[0].lon
            state.lat = response.data[0].lat
        })
        .then(()=> {
            getWeather();
        }) 
        .catch((error) => {
            console.log(error)
        }); 
}
// Weather
const getWeather = () => {
    axios
        .get('http://127.0.0.1:5000/weather', {
            params: {
                lat: state.lat,
                lon: state.lon
            }
        })
        .then((response) => {
            const kelvinTemp = response.data.main.temp
            const skyCondition = response.data.weather[0].main
            //     // k to f
            state.temp = Math.floor(1.8*(kelvinTemp-273) + 32)
            tempValue.innerHTML = state.temp + "°" ;
            actualTempValue.innerHTML = state.temp + "°" ;
            validateSkyCondition(skyCondition)

        })
        .then(() => {
            landscapeChange()

        })
        .catch((error) => {
            console.log(error)
        });
}


// 


// Listeners 

increaseTempControl.addEventListener("click", increaseTemp);
increaseTempControl.addEventListener("click", landscapeChange);

decreaseTempControl.addEventListener("click", decreaseTemp);
decreaseTempControl.addEventListener("click", landscapeChange);

skySelect.addEventListener("change", skySelector);

cityNameInput.addEventListener("keyup", changeCityName);

submitButton.addEventListener("click", locationUpdate);

submitButton.addEventListener("click", locationUpdate);

resetButton.addEventListener("click", resetLocation)


