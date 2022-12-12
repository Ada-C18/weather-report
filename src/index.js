const state = {
    tempValue: 77,
    city: "Seattle",
    lat: 47.6038321,
    long: -122.3300624,
}

// wave 2
const controlTemp = () => {
    const tempValueContainer = document.getElementById("temperature_value");
    tempValueContainer.textContent = `${state.tempValue}`;
}

const TempUp = () => {
    state.tempValue += 1;
    controlTemp();
    controlTempColor();
}

const TempDown = () => {
    state.tempValue -= 1;
    controlTemp();
    controlTempColor();
}

const controlTempColor = () => {
    const tempValueContainer = document.getElementById("temperature_value");
    let temp = state.tempValue;
    let color = "red";
    let landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    
    if (temp > 80) {
        color = "red";
        landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (temp > 70) {
        color = "orange";
        landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (temp >= 60) {
        color = "yellow";
        landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (temp >= 50) {
        color = "green";
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else if (temp < 50) {
        color = "teal";
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
    // console.log(color)
    const newLandscape = document.querySelector("#garden_landscape");
    newLandscape.textContent = landscape;
    tempValueContainer.className = color;
    return color
}

//wave 3
const changeCityname = () => {
    const name = document.getElementById("cityname_input");
    const headerCityContainer = document.getElementById("header_cityname");
    state.city = name.value;
    headerCityContainer.textContent = state.city;
}

//wave 4

const getLatandLong = () => {
    axios
        .get("http://localhost:5000/location", {
            params: {
                q: state.city,
            },
        })
        .then((response) => {
            console.log(response.data);
            state.lat = response.data[0].lat;
            state.long = response.data[0].lon;
            getWeather();
            console.log(state.city)
        })
        .catch((error) => {
            console.log("error in findLatAndLong!", error.response);
        });
}

const getWeather = () => {
    axios
        .get("http://localhost:5000/weather", {
            params: {
                lat: state.lat,
                lon: state.long,
            },
        })
        .then((response) => {
            weather = response.data;
            state.tempValue = Math.round(converKtoF(weather.main.temp));
            console.log(state.tempValue)
            controlTempColor()
            controlTemp()
            
        })
        .catch((error) => {
            console.log("couldn't get the weather:", error.response);
        });
};

const converKtoF = (temp) => {
    return 1.8 * (temp -273) + 32
}

//wave 5
const skyControl = () => {
    const selectSky = document.getElementById("sky_choose").value;
    const gardenSky = document.getElementById("garden_sky");
    let sky = ""

    if (selectSky === "sunny") {
        sky = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️"
    } else if (selectSky === "cloudy") {
        sky = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️"
    } else if (selectSky === "rainy") {
        sky = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧"
    } else if (selectSky === "snowy") {
        sky = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
    }
    console.log(sky);
    gardenSky.textContent = selectSky;
}

//wave 6
const resetCityname = () => {
    const name = document.getElementById("cityname_input");
    const headerCityContainer = document.getElementById("header_cityname");
    name.value = "Seattle"
    state.city = name.value
    headerCityContainer.textContent = state.city
}

const registerEventHandlers = () => {
    const tempUpButton = document.getElementById("increase_temperature");
    tempUpButton.addEventListener("click", TempUp);

    const tempDownButton = document.getElementById("decrease_temperature");
    tempDownButton.addEventListener("click", TempDown);

    const skyChoiseButton = document.getElementById("sky_choose");
    skyChoiseButton.addEventListener("change", skyControl);

    const inputCity = document.getElementById("cityname_input");
    inputCity.addEventListener("input", changeCityname);

    const resetButton = document.getElementById("reset_city");
    resetButton.addEventListener("click", resetCityname);

    const currentTempButton = document.getElementById("realtime_temp");
    currentTempButton.addEventListener("click", getLatandLong);
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);