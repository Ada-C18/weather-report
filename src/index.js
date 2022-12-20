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

// access to the id=headerCityName
const headerCityName = document.getElementById('headerCityName')
// access to id=cityNameInput 
const cityNameInput = document.getElementById('cityNameInput')

const submitButton = document.getElementById('cityNameSubmit')

const resetButton = document.getElementById('cityNameReset')



// Functions 
// TEMP CHANGES
const increaseTemp = () => {
    state.temp ++;
    tempValue.innerHTML = state.temp;
} 

const decreaseTemp = () => {
    state.temp --;
    tempValue.innerHTML = state.temp;
}

// ACTUAL TEMP
const actualTempChange = () => {
    actualTempValue.innerHTML = state.actualTemp
}

// CITY HEADER
const changeCityName = () => {
    // set headerCityName = cityNameInput
    headerCityName.innerHTML = cityNameInput.value

}

// State.Location Update
const locationUpdate = () => {
    state.location = cityNameInput.value; 
    console.log(state.location)
    getLocation();
}

const resetLocation = () => {
    console.log("RESET")
    state.location = '';
    cityNameInput.value = state.location;
    changeCityName();
}

//SKY CHANGES 
const skySelector = () => {
    // state.sky ;
    // skySelect.innerHTML = state.sky
    if (state.sky.value == "sunny") {
        desiredSky.textContent = "☀️🌞☀️🌞☀️🌞☀️🌞☀️🌞☀️🌞☀️🌞"
        console.log("sunny")
    }
    else if (state.sky.value == "cloudy") {
        desiredSky.textContent = "🌥🌥🌥🌥🌥🌥🌥🌥🌥🌥🌥"
        console.log("cloudy")
    }
    else if (state.sky.value == "rainy") {
        desiredSky.textContent = "🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧"
        console.log("rainy")
    }
    else if (state.sky.value == "snowy") {
        desiredSky.textContent = "🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨"
        console.log("snowy")
    }
}

const validateSkyCondition = (skyCondition) => {
    console.log("BEFORE")
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
    

    skySelector()
    console.log("AFTER")
}

// LANDSCAPE CHANGES
const landscapeChange = () =>{
    if (state.temp >= 80){
        desiredLandscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
        bgColor.style.backgroundColor = '#E24E1B'
        console.log("80")
    } 
    else if (state.temp >= 70 ){
        desiredLandscape.textContent = "🌸🌿🌼__🌷🌻🌿_🌱_🌻🌷"
        bgColor.style.backgroundColor = '#E5B25D'
        console.log("70-79")
    }
    else if (state.temp >= 60 ){
        desiredLandscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
        bgColor.style.backgroundColor = '#D0CFEC'
        console.log("60-69")
    }
    else if (state.temp >= 50 ){
        desiredLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
        bgColor.style.backgroundColor = "#875C74"
        console.log("50")
    }
    else if (state.temp <= 40 ){
        bgColor.style.backgroundColor = "#1B4079"
        console.log("40")
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
            tempValue.innerHTML = state.temp;
            actualTempValue.innerHTML = state.temp;
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











    // Element Selectors

    // const resetInput = () => {
    //     cityName.innerHTML = "Indianapolis, IN";
    //     userInput.value='';
    //     sky.Select.value="sunny";

    //     // helper function needed
    //     makeItSunny();
    //     actualTempNumber.innerText='';
    // }
