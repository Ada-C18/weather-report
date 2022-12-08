"use strict";

//to keep track of and to be able to modify current state
const state = {
    city: 'SanFrancisco',
    temp: 60
}

// function to get input city's lat and long
// still need to register event and verify PATH is correct with TA
const getLocation = (city) => {
    // location = state.city, we will input this when we call this function
    // from axios documentation, the get request has a PATH and then otional params, more info: https://github.com/axios/axios
    axios.get('http://localhost:5000/location', {
        params: {q: city}
    }) //ASK TA!!!
    .then(response => {
    // see test replit I invited you to to check out what the response data looks like
    // per axios documentation:`data` is the response that was provided by the server \\data: {},
    const latitude = response.data[0].lat;
    const longitude = response.data[0].lon;
    return {latitude, longitude}
    })
    .catch(error =>{
        console.log("Location error: ", error.response.data)
    });

}

// function to get input city's weather based on its lat and long
// still need to register event, verify PATH is correct with TA, and complete .then clause
const getWeather = (latitude, longitude) => {
    // latitude, longitude = promise from getLocation
    axios.get('http://localhost:5000/weather', {
        params: {lat: latitude, lon: longitude}
    }) //ASK TA!!!
    .then(response => {
    const weather = response.data // UNKNOWN
    return weather
    })
    .catch(error =>{
        console.log("Weather error: ", error.response.data)
    });

}

//functions to increase and decrease the temp
const increaseTemp = () => {
    state.temp += 1;
    changeTempColorAndLandscape()
  }
const decreaseTemp = () => {
    state.temp -= 1;
    changeTempColorAndLandscape()
  }

//function to change sky
const changeSkyDisplay = () => {
    //getting selected sky image
  const input = document.getElementById('sky_select').value;
// selecting the sky_image element object
  const currentSky = document.getElementById('sky_image');
  let skyDisplay =	'🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';

  if (input === 'Sunny'){
    skyDisplay =	'☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  }else if (input === 'Cloudy'){
    skyDisplay =	'☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  }else if (input === 'Rainy'){
    skyDisplay =	'🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  }else if (input === 'Snowy'){
    skyDisplay =	'🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  };
//   skyImage.textContent = skyDisplay;
  currentSky.textContent = skyDisplay;
};

//function to change the landscape and temperature value color
const changeTempColorAndLandscape = () => {
    let temperature_value = state.temp;
    let temperature_color = 'yellow';
    let landscape =	"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";

    if (temperature_value > 80) {
        landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
        temperature_color = 'red'
    } else if (temperature_value >= 70) {
        landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
        temperature_color = 'orange'
    } else if (temperature_value >= 60) {
        landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        temperature_color = 'yellow'
    } else if (temperature_value >= 50) {
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        temperature_color = 'green'
    } else {
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        temperature_color = 'teal'
    }

    // First, get element we want to alter
    // Next, set the textcontent (the string that represents the image) of that element
    const currentLandscape = document.getElementById('landscape_image');
    currentLandscape.textContent = landscape;
    // First, get element we want to alter
    // Change the classname according to the color of the range
    // Next, set the textcontent (the value literal) of that element, to be the value of the integer in current state casted to a string
    const tempValue = document.getElementById('temperature-value');
    tempValue.className = temperature_color;
    tempValue.textContent = String(state.temp);
}
//function to update City Name
const updateCityName = ()=>{
  const chosenCityInputName = document.getElementById('city_name_input').value;
  const titleCityName = document.getElementById('city');
  state.city = chosenCityInputName;
  titleCityName.textContent = state.city;
};

//function to bring back default placeholder
const resetCityName = ()=>{
  const defaultNameInput = document.getElementById('city_name_input');
  defaultNameInput.value = 'San Francisco';
  updateCityName(); //callback function...able to use state from this function
};

//register event handlers
const registerEventHandlers = () => {

    const increaseTempValue = document.getElementById('up-button');
    increaseTempValue.addEventListener('click', increaseTemp);

    const decreaseTempValue = document.getElementById('down-button');
    decreaseTempValue.addEventListener('click', decreaseTemp);

    const cityNameInput = document.getElementById('city_name_input');
    cityNameInput.addEventListener('input', updateCityName);

    const changeCityNamebtn = document.getElementById('city_name_reset');
    changeCityNamebtn.addEventListener('click', resetCityName);

    const selectSkyDisplay = document.getElementById('sky_select');
    selectSkyDisplay.addEventListener('change', changeSkyDisplay);
}


// wait for DOM to load before the events
document.addEventListener('DOMContentLoaded', registerEventHandlers);
