"use strict";



const state = {temperature: 75};
const tempVal = document.getElementById("temp-value");
const decButton = document.getElementById("decrease-temp");
const incButton = document.getElementById("increase-temp");
const cityName = document.getElementById("city-name");
let userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit");
const skyImg = document.getElementById("sky-image");
const skyDropdown = document.getElementById("sky-dropdown");
let landscape = document.getElementById("landscape-image");
const resetButton = document.getElementById("reset")

const updateCityName = () => {
  cityName.innerHTML = userInput.value;
};

const updateSky = () => {
  const skyOption = document.getElementById('sky-dropdown').value
  if (skyOption == 'Sunny'){
    skyImg.src = './src/images/sunny-sky.jpg'
  }
  else if (skyOption == 'Rainy'){
    skyImg.src = './src/images/rainy-sky.jpg'
  }
  else if (skyOption == 'Cloudy'){
    skyImg.src = './src/images/cloudy-sky.jpg'
  }
  else if (skyOption == 'Snowy'){
    skyImg.src = './src/images/snowy-sky.jpg'
  }
}

const tempColor = (temp) => {
  if (temp <= 50){
    landscape.src = './src/images/cold-landscape.jpg';
    skyImg.src = './src/images/snowy-sky.jpg'
    return 'blue';
  }
  else if (temp <= 60){
    landscape.src = './src/images/cool-landscape.jpg';
    skyImg.src = './src/images/cloudy-sky.jpg'
    return 'lightblue';
  }
  else if (temp <= 70){
    landscape.src = './src/images/warm-landscape.jpg';
    skyImg.src = './src/images/cloudy-sky.jpg'
    return 'lightgreen';
  }
  else if (temp <= 80){
    landscape.src = './src/images/warm-landscape.jpg';
    skyImg.src = './src/images/sunny-sky.jpg'
    return 'yellow';
  }
  else {
    landscape.src = './src/images/hot-landscape.jpg';
    skyImg.src = './src/images/sunny-sky.jpg'
    return 'red';
  }
}

const registerEventHandlers = () => { 
  decButton.addEventListener("click", () => {
    tempVal.innerHTML = state.temperature;
    state.temperature -= 1;
    tempVal.style.color = tempColor(state.temperature);
  });
  
  incButton.addEventListener("click", () => {
    tempVal.innerHTML = state.temperature;
    state.temperature += 1;
    tempVal.style.color = tempColor(state.temperature);
  });
  
  updateCityName();
  userInput.addEventListener("input", updateCityName);

  submitButton.addEventListener("click", () =>{
    getWeatherByLoc();
    console.log("Almost There!");
  });

  updateSky();
  skyDropdown.addEventListener("change", updateSky)

  resetButton.addEventListener("click", () => {
    userInput.value = "Detroit";
    updateCityName();
  })
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);



// API Calls
const getWeatherByLoc = (userInput) => {
  const getLocation = () => {
    axios
    .get ('http://127.0.0.1:5000/location'), {
      params: {
        key: 'pk.b8aab1a85295b2c1f6e71a4ed20c3120',
        q: userInput.value,
        format: 'json'
      }
    }
    .then (function(response){
      let lat = response.data[0]["lat"];
      let lon = response.data[0]["lon"];
      getWeather(lat, lon);
    })
    .catch (function(error) {
      console.error('error in getlocation!');
    })
  }

  const getWeather = (lat, lon) => {
    axios
    .get ('http://127.0.0.1:5000/weather'), {
      params: {
        appid: '76d80595e856e8e068fcdd93241e2622',
        lat: lat,
        lon: lon
      }
    }
    .then (function(response){
      let tempK = response.data['main']['temp'];
      let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
      tempVal.innerText = tempF
    })
    .catch (function(error) {
      console.error('error in getWeather');
    })
  }
}