// 'use strict';

const state = {
    temp: 50,
    city: 'New York',
    lat: 40.7127281,
    lon: -74.0060152,
};

const value = document.querySelector("#value");
// const feelsLike = document.querySelector("#feels-like");
const tempDisplay = document.querySelector("#temp");

const ktoF = (temperature) => { //returns kelvin to fahrenheit
    return (temperature - 273.15) * (9/5) + 32;
};

const getLocation  = () => {
    axios.get(("http://127.0.0.1:5000/location"), {
        params: {q: state.city},
    })
    .then((response) => {
        // console.log(response.data);
        console.log(response.data[0].lat);
        state.lon = response.data[0].lon;
        getWeather();
    })
    .catch((error) => {
        console.log('lat/lon error:', error);
    });
};

const getWeather = () => {
    axios.get("http://127.0.0.1:5000/weather", {
        params: {lat: state.lat, lon: state.lon}
    })
    .then((response) => {
        // const weather = response.data;
        console.log(weather);
        state.temp = Math.round(ktoF(weather.main.temp));
        value.textContent = state.temp;
        updateTemp();
    })
    .catch((error) => {
        console.log("weather response data error:", error);
    });
};

const registerAPIHandlers = () => {
    const newTemp = document.querySelector("#search-button");
    newTemp.addEventListener("click", getLocation);
};

const updateTemp = () => {
    const snoopyPic = document.querySelector("#snoopy-image");
    if (state.temp >= 80) {
        tempDisplay.className = "eighties";
        outside.textContent = "🌞🌻🔥😎🦂🥵🌵🏜️🌞🌻🔥😎🦂🥵🌵🏜️";
        snoopyPic.src = 'assets/eighties-snoopy.gif'
    } else if (state.temp >= 70 && state.temp < 80) {
        tempDisplay.className = "seventies";
        outside.textContent = "💨🌸🌻🌤️🥵🔥☘️🐍💨🌸🌻🌤️🥵🔥☘️🐍💨";
        snoopyPic.src = 'assets/seventies-snoopy.gif'
    } else if (state.temp >= 60 && state.temp < 70) {
        tempDisplay.className = "sixties";
        outside.textContent = "🌾🌾🌸🌿🌼🍃🪨🛤🌾🌸🌸🍃🌾🌾🌸🌿";
        snoopyPic.src = 'assets/sixties-snoopy.gif'
    }  else if (state.temp >= 50 && state.temp < 60) {
        tempDisplay.className = "fifties";
        outside.textContent = "🍂🍁🍃🏕️🤧🌧️🍂🍁🍃🏕️🤧🌧️🍂🍁🍃🏕️";
        snoopyPic.src = 'assets/fifties-snoopy.gif'
    } else {
        tempDisplay.className = "fourties";
        outside.textContent = "🥶🤧❄️😰☃️⛄️☁️🌲🌲⛄️🌲⛄️🥶🤧❄️😰☃️⛄️☁️";
        snoopyPic.src = 'assets/fourties-snoopy.gif'
    }
};

const increaseTemp = () => {
    state.temp += 1;
    value.textContent = state.temp;
    updateTemp();
};

const decreaseTemp = () => {
    state.temp -= 1;
    value.textContent = state.temp;
    updateTemp();
};

const registerTempHandlers = () => {
    const increase = document.querySelector("#increase");
    increase.addEventListener("click", increaseTemp);

    const decrease = document.querySelector("#decrease");
    decrease.addEventListener("click", decreaseTemp);
};

const changeCityName = () => {
    const cityInput = document.querySelector("#city-search").value;
    const cityName = document.querySelector("#city-name");
    cityName.textContent = state.city;
    state.city = cityInput;
};

const resetName  = () => {
    const cityNameInput = document.querySelector("#city-search");
    cityNameInput.value = 'New York';
    changeCityName();
};

const registerCityHandlers = () => {
    const cityNameInput = document.querySelector("#city-search");
    cityNameInput.addEventListener("input", changeCityName);

    const cityResetButton = document.querySelector("#reset");
    cityResetButton.addEventListener("click", resetName);
};

const setSky = () => {
    const skyColor = document.querySelector("#sky-options").value;
    const skyPic = document.querySelector("#sky-pic");
    let sky = " ";
    if (skyColor === "Sunny") {
        sky = '🔆 🔆 🔆 🔆';
    } else if (skyColor === "Cloudy") {
        sky = '☁️ ☁️ ☁️ ☁️'
    } else if (skyColor === "Rainy") {
        sky = '🌧 🌧 🌧 🌧'
    } else if (skyColor === "Snowy") {
        sky = '❄️ ❄️ ❄️ ❄️'
    };
    skyPic.textContent = sky;
};

const registerSkyHandlers = () => {
    // setSky();
    const pickSky = document.querySelector('#sky-options');
    pickSky.addEventListener("change", setSky)
};

const registerEventHandlers = () => {
    registerCityHandlers();
    registerTempHandlers();
    registerAPIHandlers();
    registerSkyHandlers();
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);