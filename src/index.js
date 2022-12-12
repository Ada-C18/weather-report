
const state = {
    temperature: 68,
    cityName: "Atlanta",
    lat: 33.7489924,
    lon: -84.3902644,
};

const tempValue = document.getElementById("tempValue");

// Wave 4: Calling APIs
const convertKtoF = (temp) => {
  return (temp - 273.15) * (9 / 5) + 32;
};

const findLatAndLong = () => {
  //let lat, long;
  axios
    .get('http://localhost:5000/location', {
      params: {
        q: state.cityName,
      },
    })
    .then((response) => {
      // console.log(response.data);
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
    .get('http://localhost:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      const weather = response.data;
      // console.log(weather);
      state.temperature = Math.round(convertKtoF(weather.main.temp));
      // console.log(state.temperature);
      tempValue.textContent = state.temperature;
      changeColors();
      changeLandscape();
    })
    .catch((error) => {
      console.log('Error getting the weather:', error);
    });
};

// Wave 2: Increase and Decrease Temperature
const increaseTempValue = () => {
    state.temperature += 1;
    tempValue.textContent = state.temperature;
    changeColors();
    changeLandscape();
}

const decreaseTempValue = () => {
    state.temperature -= 1;
    tempValue.textContent = state.temperature;
    changeColors();
    changeLandscape();
}

const changeColors = () => {
    if (state.temperature >= 80) {
        tempValue.className = "red";
    } else if (state.temperature >= 70 && state.temperature < 80) {
        tempValue.className = "orange";
    } else if (state.temperature >= 60 && state.temperature < 70) {
        tempValue.className = "yellow";
    } else if (state.temperature >= 50 && state.temperature < 60) {
        tempValue.className = "green";
    } else if (state.temperature < 50) {
        tempValue.className = "teal";
    } 
}

const landscape = document.getElementById("landscape");

const changeLandscape = () => {
    if (state.temperature >= 80) {
        landscape.textContent = '🌵🐫🌵🐫🌵🐫🌵🐫🌵';
    } else if (state.temperature >= 70 && state.temperature < 80) {
        landscape.textContent = '🌻🌿🌻🌿🌻🌿🌻🌿🌻';
    } else if (state.temperature >= 60 && state.temperature < 70) {
        landscape.textContent = '🍁🌾🍁🌾🍁🌾🍁🌾🍁';
    } else if (state.temperature < 60) {
        landscape.textContent = '🌲⛄🌲⛄🌲⛄🌲⛄🌲';
    }
}

// Wave 3: Naming the City
const currentCity = document.getElementById("headerCityName");

const changeCityName = () => {
    const inputCity = document.getElementById("city-name").value;
    state.cityName = inputCity;
    currentCity.textContent = state.cityName;
}

// Wave 5: Selecting the Sky
const changeSky = () => {
  const inputSky = document.getElementById("skySelect").value;
  const gardenSky = document.getElementById("sky");
  let sky = "";
  let skyColor = "";
  if (inputSky === "Sunny") {
    sky = "☀️🌤☀️🌤☀️🌤☀️🌤☀️";
    skyColor = "sunny";
  } else if (inputSky === "Cloudy") {
    sky = "☁️🌥☁️🌥☁️🌥☁️🌥☁️";
    skyColor = "cloudy";
  } else if (inputSky === "Rainy") {
    sky = "🌧⛈🌧⛈🌧⛈🌧⛈🌧";
    skyColor = "rainy";
  } else if (inputSky === "Snowy") {
    sky = "🌨❄️🌨❄️🌨❄️🌨❄️🌨";
    skyColor = "snowy";
  }
  gardenSky.textContent = sky;
  const myGarden = document.getElementById("garden");
  myGarden.classList = `garden ${skyColor}`;
}

// Wave 6: Resetting the City Name
const resetCityName = () => {
    currentCity.textContent = "Atlanta";
    state.cityName = "Atlanta";
}

// register events
const registerEventHandlers = () => {
    const increase = document.getElementById("increaseTemp");
    increase.addEventListener("click", increaseTempValue);

    const decrease = document.getElementById("decreaseTemp");
    decrease.addEventListener('click', decreaseTempValue);

    const citySubmit = document.getElementById("search");
    citySubmit.addEventListener("click", changeCityName);
    citySubmit.addEventListener("click", findLatAndLong);

    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetCityName);
    resetButton.addEventListener("click", findLatAndLong);

    const currentTemp = document.getElementById("realtimeTemp");
    currentTemp.addEventListener('click', findLatAndLong);

    const skySelect = document.getElementById("skySelect");
    skySelect.addEventListener("change", changeSky);
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);

