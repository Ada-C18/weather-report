"use strict";

//to keep track of and to be able to modify current state
const state = {
    city: 'SanFrancisco',
    temp: 60,
    latitude: null,
    longitude: null
}

// would love to not need this and change the units in params instead
const convertKtoF = (temp) => {
    return (temp - 273.15) * (9 / 5) + 32;
  };

// function to get input city's lat and long
// still need to verify PATH is correct with TA
const getLocation = () => {
    // location = state.city
    // from axios documentation, the get request has a PATH and then otional params, more info: https://github.com/axios/axios
    axios.get('http://localhost:5000/location', {
        params: {q: state.city}
    }) //ASK TA!!!
    .then(response => {
    // see test replit I invited you to to check out what the response data looks like
    // per axios documentation:`data` is the response that was provided by the server \\data: {}
    //store current lon and lat in state
    state.latitude = response.data[0].lat;
    state.longitude = response.data[0].lon;
    getWeather();
    })
    .catch(error =>{
        console.log("Location error: ", error.response.data)
    });

}

// function to get input city's weather based on its lat and long - called from getLocation
// still need to verify PATH is correct with TA, and complete .then clause
const getWeather = () => {
    // latitude, longitude = current state
    axios.get('http://localhost:5000/weather', {
        params: {lat: state.latitude, lon: state.longitude}
    }) //ASK TA!!!
    .then(response => {
    // check out how a response looks: https://openweathermap.org/current#geo or the replit I shared
    const weather = response.data.main.temp
    console.log(weather)
    // couldn't get adding a unit (fahrenheit) param to work for temperature, there is an option in the docs
    state.temp = Math.round(convertKtoF(weather));
    changeTempColorAndLandscape();
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

    // new registration for getting the temp
    const tempRightNow = document.getElementById('temperature_btn');
    tempRightNow.addEventListener('click', getLocation);
}


// wait for DOM to load before the events
document.addEventListener('DOMContentLoaded', registerEventHandlers);
