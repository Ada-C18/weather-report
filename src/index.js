// import axios from "axios";
const axios = require("axios");
let temperature = document.getElementById('display-temp');
let cityName = document.getElementById('city-name');
let defaultCity = 'Seattle'

const urlLocation ='http://127.0.0.1:5000/location'
const urlWeather = 'http://127.0.0.1:5000/weather'

let getRealtimeTemp = (cityName) => {
    axios
    .get(urlLocation, {
        params: {
            q: cityName
        }
    })
    .then(response => {
        let lat = response.data[0].lat
        let lon = response.data[0].lon
        console.log(lat, lon)
        return axios.get(urlWeather, {
            params: {
                lat: lat,
                lon: lon,
                units: 'imperial'
            }
        })
    })
    .then(response => {
        temperature.innerHTML = response.main.temp
    })
    .catch(err => {
        console.log(err)
    })
}


window.onload = () => {
  temperature.innerHTML = 50;
};
window.onload(cityName.innerHTML = defaultCity)
window.onload(getRealtimeTemp(cityName))

const landscape = document.getElementById('ground-emoji');
const tempUp = document.getElementById('temp-up');
const tempDown = document.getElementById('temp-down');

let inputCity = document.getElementById('input-city');


tempUp.addEventListener('click', () => {
  let tempHTML = Number(temperature.innerHTML);
  tempHTML += 1;
  temperature.innerHTML = tempHTML;
  changeColorAndEmojis(temperature);
});
tempDown.addEventListener('click', () => {
  let tempHTML = Number(temperature.innerHTML);
  tempHTML -= 1;
  temperature.innerHTML = tempHTML;
  changeColorAndEmojis(temperature);
});

const changeColorAndEmojis = (temperature) => {
  if (temperature.innerText >= 80) {
    temperature.style.color = 'red';
    temperature.style.backgroundColor = 'white';
    landscape.innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature.innerText >= 70 && temperature.innerText <= 79) {
    temperature.style.color = 'orange';
    temperature.style.backgroundColor = 'white';
    landscape.innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature.innerText >= 60 && temperature.innerText <= 69) {
    temperature.style.color = 'yellow';
    temperature.style.backgroundColor = 'white';
    landscape.innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature.innerText >= 50 && temperature.innerText <= 59) {
    temperature.style.color = 'green';
    temperature.style.backgroundColor = 'white';
    landscape.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    temperature.style.color = 'teal';
    temperature.style.backgroundColor = 'white';
    landscape.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const changeCity = (inputCity) => {
  cityName.innerHTML = inputCity.value;
};
inputCity.addEventListener('change', () => {
  changeCity(inputCity);
});

let selectSky = document.getElementById('sky');
let sky = document.getElementById('sky-emoji');

// const changeSky = (selectedSky) => {
//   if (selectedSky === 'Sunny') {
//     sky.innerHTML = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
//   } else if (selectSky.options[selectSky.selectedIndex].value === 'Cloudy') {
//     sky.innerHTML = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
//   } else if (selectSky.value === 'Rainy') {
//     sky.innerHTML = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
//   } else if (selectSky.value === 'Snowy') {
//     sky.innerHTML = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
//   }
// };
selectSky.addEventListener('change', () => {
  console.log(selectSky.options[selectSky.selectedIndex].value);
  changeSky(selectSky.options[selectSky.selectedIndex].value);
});
const changeSky = (selectedSky) => {
    if (selectedSky === 'sunny') {
      sky.innerHTML = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    } else if (selectedSky === 'cloudy') {
      sky.innerHTML = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    } else if (selectedSky === 'rainy') {
      sky.innerHTML = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    } else if (selectedSky === 'snowy') {
      sky.innerHTML = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    }
  };

const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', () => {
    cityName.innerHTML = defaultCity
})