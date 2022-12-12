"use strict";

const state = {
  temp: 0, // starting temp
  humidity: 0, // starting humidity
  city: "Chattanooga", // default city
  clicked: false, // whether the temp increase button is in clicked state
};

const forecastState  = {
  1: {day: "", main: "", temp: 0, humidity: 0,},
  2: {day: "", main: "", temp: 0, humidity: 0,},
  3: {day: "", main: "", temp: 0, humidity: 0,},
  4: {day: "", main: "", temp: 0, humidity: 0,},
  5: {day: "", main: "", temp: 0, humidity: 0,},
};

// EVENT HANDLERS
// INCREASE TEMP BY 1 DEGREE
const increaseDreamTemp = () => {
  const dreamTemp = document.getElementById("dream-temp-number");
  state.temp += 1;
  dreamTemp.textContent = state.temp;
};

// INCREASE HUMIDITY BY 1 PERCENT
const increaseDreamHumidity = () => {
  const dreamHumidity = document.getElementById("dream-humidity-percent");
  state.humidity += 1;
  dreamHumidity.textContent = state.humidity;
};

// DECREASE TEMP BY 1 DEGREE
const decreaseDreamTemp = () => {
  const dreamTemp = document.getElementById("dream-temp-number");
  state.temp -= 1;
  dreamTemp.textContent = state.temp;
};

// DECREASE HUMIDITY BY 1 DEGREE
const decreaseDreamHumidity = () => {
  const dreamHumidity = document.getElementById("dream-humidity-percent");
  state.humidity -= 1;
  dreamHumidity.textContent = state.humidity;
};

// UPDATE TEMP TEXT AND CIRCLE COLOR DEPENDING ON TEMP RANGE
const updateDreamTempColor = () => {
  const dreamTemp = document.querySelector("#dream-temp-number");
  const tempCircle = document.querySelector("#circle");

  if (state.temp >= 80) {
    dreamTemp.style.color = "#E0392D";
    tempCircle.style.backgroundColor = "#E0392D";
  } else if (70 <= state.temp && state.temp <= 79) {
    dreamTemp.style.color = "#E0571D";
    tempCircle.style.backgroundColor = "#E0571D";
  } else if (60 <= state.temp && state.temp <= 69) {
    dreamTemp.style.color = "#F09104";
    tempCircle.style.backgroundColor = "#F09104";
  } else if (50 <= state.temp && state.temp <= 59) {
    dreamTemp.style.color = "blue";
    tempCircle.style.backgroundColor = "blue";
  } else if (state.temp <= 49) {
    dreamTemp.style.color = "purple";
    tempCircle.style.backgroundColor = "purple";
  }
};

// CHANGE THE CITY NAME IN TITLE AND SEARCH BAR INPUT SIMULTANEOUSLY
const changeCityNameWithInput = () => {
  const cityTitle = document.getElementById("city-title");
  const cityInput = document.getElementById("search-bar").value;
  cityTitle.textContent = cityInput;
};

// AXIOS REQUEST
// REQUEST LOCATION AND WEATHER FOR CITY FROM WEATHER PROXY SERVER
const getCurrentWeather = () => {
  let cityInput = state.city;

  if (document.getElementById("search-bar").value) {
    cityInput = document.getElementById("search-bar").value;
  };

  return axios.get('http://127.0.0.1:5000/location', {params: {q: cityInput}
  })
  .then(location => {
    // console.log("location:", location);
    // console.log("lat", location.data[0].lat);
    // console.log("lon", location.data[0].lon)
    return {
      lat: location.data[0].lat,
      lon: location.data[0].lon
    }
  })
  .then(coordinates => {
    // console.log("coordinates.lat:", coordinates.lat);
    // console.log("coordinates.lon:", coordinates.lon)
    return axios.get('http://127.0.0.1:5000/weather', {
                      params: 
                      {lat: coordinates.lat,
                      lon: coordinates.lon}
                    })
  })
  .then(weather => {
    // console.log("weather.data.main:", weather.data.main)
    return weather.data.main;
  })
};

// STORE CURRENT WEATHER REPORT AFTER ONE CALL
const saveCurrentWeather = () => {
    getCurrentWeather()
    .then(weather => {
    state.temp = Math.floor(weather.temp);
    state.humidity = weather.humidity;
    updateTemp()
    updateHumidity()
  });
};

// AXIOS REQUEST
// REQUEST LOCATION AND FORECAST FOR CITY FROM WEATHER PROXY SERVER
const getFiveDayForecast = () => {
  let cityInput = state.city;

  if (document.getElementById("search-bar").value) {
    cityInput = document.getElementById("search-bar").value;
  };

  return axios.get('http://127.0.0.1:5000/location', {params: {q: cityInput}
  })
  .then(location => {
    console.log("location:", location);
    console.log("lat", location.data[0].lat);
    console.log("lon", location.data[0].lon)
    return {
      lat: location.data[0].lat,
      lon: location.data[0].lon
    }
  })
  .then(coordinates => {
    console.log("coordinates.lat:", coordinates.lat);
    console.log("coordinates.lon:", coordinates.lon)
    return axios.get('http://127.0.0.1:5000/forecast', {
                      params: 
                      {lat: coordinates.lat,
                      lon: coordinates.lon}
                    })
  })
  .then(forecast => {
    // console.log("forecast.data.list:", forecast.data.list);
    const fiveDayForecast = [];
    for (let day of forecast.data.list) {
      let time = day.dt_txt.substring(11);
      if (time === "12:00:00") {
        fiveDayForecast.push(
          {
            date: day.dt_txt,
            main: day.weather[0].main,
            temp: day.main.temp,
            humidity: day.main.humidity,
          }
        );
      }
    };
    console.log(fiveDayForecast);
    return fiveDayForecast;
  })
};

// STORE CURRENT FIVE DAY FORECAST AFTER ONE CALL
const saveFiveDayForecast= () => {
  getFiveDayForecast()
  .then(forecast => {
    for (let i = 0; i < forecast.length; i++) {
      forecastState[i+1] = {
        day: forecast[i].date,
        main: forecast[i].main,
        temp: forecast[i].temp,
        humidity: forecast[i].humidity
      }
    };
    console.log(forecastState);
  });
};

// UPDATE TEMP TO CURRENT TEMP FROM WEATHER RESULT
const updateTemp = () => {
  const defaultTemp = document.getElementById("dream-temp-number");
  defaultTemp.textContent = state.temp;
  updateDreamTempColor();
};

// UPDATE HUMIDITY TO CURRENT HUMIDITY FROM WEATHER RESULT
const updateHumidity = () => {
  const defaultHumidity = document.getElementById("dream-humidity-percent");
  defaultHumidity.textContent = state.humidity;
};

// UPDATE WEATHER PANELS
const updateWeatherPanels = () => {
  // loop 5 times (total of panels)
  // use i to determine which panel
  // update name, temp and humidity for each panel
  // grab from forecastState

  for (let i = 1; i <= 5; i++) {
    panel = document.getElementById(`panel-${i}`);
    temp = document.getElementById(`panel-${i}`);
    humidity = document.getElementById(`panel-${i}`);
  }
};

// REGISTER EVENT HANDLERS
const registerEventHandlers = () => {
  const tempIncreaseButton = document.getElementById("temp-increase-button");
  tempIncreaseButton.addEventListener("click", increaseDreamTemp);
  tempIncreaseButton.addEventListener("click", updateDreamTempColor);

  const humidityIncreaseButton = document.getElementById("humidity-increase-button");
  humidityIncreaseButton.addEventListener("click", increaseDreamHumidity);

  const tempDecreaseButton = document.getElementById("temp-decrease-button");
  tempDecreaseButton.addEventListener("click", decreaseDreamTemp);
  tempDecreaseButton.addEventListener("click", updateDreamTempColor);

  const humidityDecreaseButton = document.getElementById("humidity-decrease-button");
  humidityDecreaseButton.addEventListener("click", decreaseDreamHumidity);
  
  const searchBar = document.getElementById("search-bar");
  searchBar.addEventListener("input", changeCityNameWithInput);
  
  const searchButton = document.getElementById("search-button");
  // searchButton.addEventListener("click", getFiveDayForecast);
  searchButton.addEventListener("click", updateTemp);
  searchButton.addEventListener("click", updateHumidity);

  window.addEventListener("load", saveCurrentWeather);
  window.addEventListener("load", saveFiveDayForecast);
};

// DOM listener
document.addEventListener("DOMContentLoaded", registerEventHandlers);