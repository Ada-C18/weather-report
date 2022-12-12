const state = {
    city: "Boulder",
    temp: 55,
    lat: 40.0149856,
    lon: -105.270545,
};

const convertKtoF = (temp) => {
return (temp - 273.15) * (9 / 5) + 32;
};


const getLatAndLon = () =>{
    axios
    .get('http://127.0.0.1:5000/location', {
        params: {
            q: state.city,
        },
    })
    .then((response) => {
        console.log(response.data);
        state.lat = response.data[0].lat;
        state.lon = response.data[0].lon;
        getWeather();
    })
    .catch((error) => {
        console.log('Error finding the latitude and longitude:', error.response);
    });
};

const getWeather = () => {
    axios
    .get('http://127.0.0.1:5000/weather', {
        params: {
            lat: state.lat,
            lon: state.lon,
        },
    })
    .then((response) => {
        const weather = response.data;
        state.temp = Math.round(convertKtoF(weather.main.temp));
        tempValue.textContent = state.temp;
        updateTemp(state.temp)
        updateGardenImage(state.temp);
    })
    .catch((error) => {
        console.log('Error getting the weather:', error);
    });
};

let tempValue = 50;

const updateSky = () => {
    const inputSky = document.getElementById("skySelect").value;
    const skyContainer = document.getElementById("sky");
    let sky = "";
    if (inputSky === "Cloudy") {
        sky = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
        document.body.style.backgroundImage = "url('images/gray-gradient.jpg')";
    } else if (inputSky === "Sunny") {
        sky = "☁️     ☁️   ☁️ ☀️ ☁️  ☁️";
        document.body.style.backgroundImage = "url('images/yellow-gradient.jpg')";
    } else if (inputSky === "Rainy") {
        sky = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧";
        document.body.style.backgroundImage = "url('images/blue-gradient.jpg')";
    } else if (inputSky === "Snowy") {
        sky = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨";
        document.body.style.backgroundImage = "url('images/white-gradient.jpg')";
    }
    skyContainer.textContent = sky;
};


const updateCityName = () => {
    const inputName = document.getElementById("cityNameInput").value;
    const headerCityName = document.getElementById("headerCityName");
    headerCityName.textContent = inputName;
    state.city = inputName;
};

const resetCityName = () => {
    const cityNameInput = document.getElementById("cityNameInput");
    cityNameInput.value = "Boulder";
    updateCityName();
};


const updateTempStyles = (currentTemp) => {
    const tempValueContainer = document.getElementById("tempValue");
    let color = "teal";
    if ( currentTemp >= 80) {
        color = "red";
    } else if (currentTemp >= 70) {
        color = "orange";
    } else if (currentTemp >= 60) {
        color = "yellow";
    } else if (currentTemp >= 50) {
        color = "green";
    }
    tempValueContainer.classList = color;
}

const updateGardenImage = (currentTemp) => {
    const landscapeImageContainer = document.getElementById("landscapeImage")
    let landscapeImage = document.getElementById("landscapeImage").src="images/snowHouse.png";
    if (currentTemp >= 80){
        landscapeImage = document.getElementById("landscapeImage").src = "images/summerHouse.png";
    } else if (currentTemp >= 70){
        landscapeImage = document.getElementById("landscapeImage").src = "images/springHouse.png";
    } else if (currentTemp>=60){
        landscapeImage = document.getElementById("landscapeImage").src = "images/fallHouse.png";
    }
    landscapeImageContainer.textContent = landscapeImage;
}


const updateTemp = tempValue => {
    
    const tempValueContainer = document.getElementById("tempValue");
    tempValueContainer.textContent = tempValue;
    updateTempStyles(tempValue);
    updateGardenImage(tempValue);
}

const increaseTemp = () => {
    tempValue += 1;
    updateTemp(tempValue);
};

const decreaseTemp = () => {
    tempValue -= 1;
    updateTemp(tempValue);
};

const registerEventHandlers = () => {
    updateTemp(tempValue);

    const increaseTempControl = document.getElementById("increaseTempControl");
    increaseTempControl.addEventListener("click", increaseTemp);
    
    const decreaseTempControl = document.getElementById("decreaseTempControl");
    decreaseTempControl.addEventListener("click", decreaseTemp);

    updateCityName();
    const cityNameInput = document.getElementById("cityNameInput");
    cityNameInput.addEventListener("input", updateCityName);

    const cityNameResetBtn = document.getElementById("cityNameReset");
    cityNameResetBtn.addEventListener("click", resetCityName);

    updateSky();
    const skySelect = document.getElementById("skySelect");
    skySelect.addEventListener("change", updateSky);

    const currentTempButton = document.getElementById('realWeatherButton');
    currentTempButton.addEventListener('click', getLatAndLon);

};

document.addEventListener("DOMContentLoaded", registerEventHandlers);




