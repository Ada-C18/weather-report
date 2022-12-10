"use strict";

let state = {
    startingTemp : 60,
};

const updateTemperature = state => {
  const temperatureContainer = document.getElementById("startingTemp");
  temperatureContainer.textContent = state.startingTemp;
};

const increaseTemperature = () => {
  state.startingTemp += 1;
  updateTemperature(state);
  updateColor();
  updateLandscape();
};

const decreaseTemperature = () => {
  state.startingTemp -= 1;
  updateTemperature(state);
  updateColor();
  updateLandscape();
};

const updateColor = () => {

    if (state.startingTemp >= 80) {
        document.getElementById('startingTemp').style.color = 'red';
    } else if (state.startingTemp >= 70) {
        document.getElementById('startingTemp').style.color = 'orange';
    } else if (state.startingTemp >= 60) {
        document.getElementById('startingTemp').style.color = 'yellow';
    }  else if (state.startingTemp >= 50) {
        document.getElementById('startingTemp').style.color = 'green';
    } else if (state.startingTemp < 50) {
        document.getElementById('startingTemp').style.color = 'teal';
    }
};

const updateLandscape = () => {

    if (state.startingTemp >= 80) {
        document.getElementById('landscapeIcons').textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (state.startingTemp >= 70) {
        document.getElementById('landscapeIcons').textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (state.startingTemp >= 60) {
        document.getElementById('landscapeIcons').textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    }  else if (state.startingTemp < 60) {
        document.getElementById('landscapeIcons').textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } 
};

const updateSky = () => {

    const selectSky = document.getElementById('skyChoice')

    if (selectSky.value === 'rainy') {
        document.getElementById('skyIcons').textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧';
    } else if (selectSky.value === 'sunny') {
        document.getElementById('skyIcons').textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    }  else if (selectSky.value === 'cloudy') {
        document.getElementById('skyIcons').textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    }  else if (selectSky.value === 'snowy') {
        document.getElementById('skyIcons').textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    } 
};

const updateCity = () => {
    const inputCityName = document.getElementById("inputCity");
    const cityNameInHeader = document.getElementById("cityNameHeader");
    cityNameInHeader.textContent = inputCityName.value;

};


const getLongLat = () => {
    let latitude, longitude;
    axios.get('http://127.0.0.1:5000/location', 
    {
        params: {
            q: document.getElementById("cityNameHeader").textContent
        }
        }) 
        .then((response) => {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;

        getWeather(latitude, longitude);
        })
        .catch( (error) => {
            console.log("error in finding latitude and longitude");
        });
    }
    const getWeather = (latitude, longitude) => {
        axios.get('http://127.0.0.1:5000/weather',
        {
            params: {
                lat: latitude,
                lon : longitude,
            }
        })
        .then( (response) => {
            const temperature = response.data.main.temp;
            const fahrenheit = 1.8*(temperature-273) + 32
            document.getElementById('startingTemp').textContent = Math.round(fahrenheit);
        })
        .catch ((error) => {
            console.log('error in finding weather');
        });
        
    }

const registerEventHandlers = () => {
  const increaseTemperatureButton = document.getElementById('increaseButton');
  increaseTemperatureButton.addEventListener("click", increaseTemperature);

  const decreaseTemperatureButton = document.getElementById('decreaseButton');
  decreaseTemperatureButton.addEventListener("click", decreaseTemperature);

  const selectElement = document.getElementById('skyChoice');
  selectElement.addEventListener('change',updateSky);

  const userInputCity = document.getElementById('inputCity');
  userInputCity.addEventListener('input', updateCity);

  const getRealTimeTemperature = document.getElementById('getTempButton');
  getRealTimeTemperature.addEventListener('click', getLongLat);

};

document.addEventListener("DOMContentLoaded", registerEventHandlers);






