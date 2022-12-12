
'use strict';

//Calling the API// 

const state = {
  temp: 70,
  city: 'Atlanta',
  lat: 33.7489924,
  lon: -84.3902644,
};

const tempValue = document.getElementById ("tempValue");

const convertKtoF = (temp) => {
  return (temp - 273.15) * (9/5) + 32;
}; 

const latAndLong = () => {
  axios.get('http://127.0.0.1:5000/location',{
    params: {
      q: state.city
    },
  })
  .then((response) => {
    // Get the latitude and longitude from the LocationIQ API response
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon;
    getWeather();
  })
  .catch((error) => {
    console.log('Error finding the latitude and longitude:', error.response);
  });
};

const getWeather = () => {
  // Use the latitude and longitude to make a request to the OpenWeatherMap API
  axios.get(`http://127.0.0.1:5000/weather`,{
    params: {
      lat: state.lat,
      lon: state.lon
    },
  })
  .then((response) => {
    const weather = response.data;
    state.temp = Math.round(convertKtoF(weather.main.temp)); 
    tempValue.textContent = state.temp; 
    changeColors()
    //ADD change landscape
  })
  .catch((error) => {
    console.log('Error getting the weather:, error');
  });
}; 

const registerAPIHandlers = () => {
  const currentTemp = document.getElementById ("weatherButton");
  currentTemp.addEventListener('click', latAndLong);
};


// Change Temp Colors

const changeColors = () => {
  const newLs = document.getElementById("landscape-image");
  if (state.temp >= 80) {
  tempValue.className = "red";
  newLs.src = "assets/summer.png";
  } else if (state.temp >= 70 && state.temp < 80) {
  tempValue.className = "orange";
  newLs.src = "assets/spring.png";
  } else if (state.temp >= 60 && state.temp < 70) {
  tempValue.className = "yellow";
  newLs.src = "assets/fall.png";
  } else if (state.temp >= 50 && state.temp < 60) {
  tempValue.className = "green";
  newLs.src = "assets/winter.png";
  } else if (state.temp < 50) {
  tempValue.className = "blue";
  newLs.src = "assets/winter.png";
  } 
  }

// MANUALLY INCREASE AND DECREASE TEMPERATURE//

const increaseTemp = () => {
  state.temp += 1;
  tempValue.textContent = state.temp;
  changeColors()
  //CHANGE LANDSCAPE
};

const decreaseTemp = () => {
  state.temp -= 1;
  tempValue.textContent = state.temp;
  changeColors()
  //CHANGE LANDSCAPE
};

const registerTempHandlers = () => {
  
    const increaseTempControl = document.getElementById("increaseTempControl");
    increaseTempControl.addEventListener("click", increaseTemp);
    
    const decreaseTempControl = document.getElementById("decreaseTempControl");
    decreaseTempControl.addEventListener("click", decreaseTemp);
};

// CHANGE AND RESET CITY NAME//

const updateCityName = () => {
  const inputName = document.getElementById("city-input").value;
  const headerCityName = document.getElementById("city-name");
  state.city = inputName;
  headerCityName.textContent = state.city;
};

const resetCityName = () => {
  const cityNameInput = document.getElementById("city-input");
  cityNameInput.value = "Atlanta";
  updateCityName();
};

const registerCityHandlers = () => {
const cityNameInput = document.getElementById("city-input");
cityNameInput.addEventListener("input", updateCityName);

const cityNameResetBtn = document.getElementById("cityNameReset");
cityNameResetBtn.addEventListener("click", resetCityName);}; 

//CHANGE BACKGROUND AND IMG// 

const updateSkyColor = () => {
  const newSkyColor = document.getElementById("skySelect").value;
  const newImg = document.getElementById("weather-image");

  if (newSkyColor === "Cloudy") {
    document.body.style.background = "#D3D3D3";
    newImg.src = "assets/cloudy.png";
  }
  if (newSkyColor === "Sunny"){
    document.body.style.background = "#ADE2FF";
    newImg.src = "assets/sunny.png";}
  if (newSkyColor === "Rainy"){
      document.body.style.background = "#92BAD2";
      newImg.src = "assets/rainy.png";}
  if (newSkyColor === "Snowy"){
        document.body.style.background = "#7CD6D5"
        newImg.src = "assets/snowy.png";}

};

const registerSkyHandlers = () =>{updateSkyColor();
    const skySelect = document.getElementById("skySelect");
    skySelect.addEventListener("change", updateSkyColor);}


const registerEventHandlers = () => {
  registerCityHandlers();
  registerTempHandlers();
  registerSkyHandlers();
  registerAPIHandlers();
  }; 


document.addEventListener("DOMContentLoaded", registerEventHandlers);

