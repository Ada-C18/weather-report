// console.log('Hello world');
('use strict');
// const axios = require('axios');
const API_CITY = 'http://127.0.0.1:5000/location';
const API_WEATHER = 'http://127.0.0.1:5000/weather';

let temperature = 72;

// Increase temperature
const increaseTemp = () => {
  const spanTempNumber = document.getElementById('temperature-value');
  temperature += 1;
  changeLandscape();
  changeTempNumberColor();
  spanTempNumber.textContent = `${temperature}`;
  // console.log('inside of increase', spanTempNumber.textContent);
};

const increaseTempOnClick = () => {
  let arrowUp = document.querySelector('#arrow-up');
  arrowUp.addEventListener('click', increaseTemp);
};

// Decrease temperature
const decreaseTemp = () => {
  const spanTempNumber = document.getElementById('temperature-value');
  temperature -= 1;
  changeLandscape();
  changeTempNumberColor();
  spanTempNumber.textContent = `${temperature}`;
  // console.log('inside of decrease', spanTempNumber.textContent);
};

const decreaseTempOnClick = () => {
  let arrowDown = document.querySelector('#arrow-down');
  arrowDown.addEventListener('click', decreaseTemp);
};

const changeTempNumberColor = () => {
  const tempNumber = Number(
    document.getElementById('temperature-value').innerText
  );
  const spanTempNumber = document.getElementById('temperature-value');
  if (tempNumber <= 49) spanTempNumber.className = 'number-color-teal';
  else if (tempNumber < 59) spanTempNumber.className = 'number-color-green';
  else if (tempNumber < 69) spanTempNumber.className = 'number-color-yellow';
  else if (tempNumber < 79) spanTempNumber.className = 'number-color-orange';
  else spanTempNumber.className = 'number-color-red';
};

const changeLandscape = () => {
  const tempNumber = Number(
    document.getElementById('temperature-value').innerText
  );
  let iconGround = document.getElementById('ground-icons');
  if (tempNumber <= 59)
    iconGround.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  else if (tempNumber < 69) iconGround.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  else if (tempNumber < 79) iconGround.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  else iconGround.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
};

const updateCityName = (event) => {
  const cityName = document.querySelector('#city');
  cityName.textContent = event.target.value;
  console.log(cityName);
  return cityName;
};

const updateCityNameInput = () => {
  const inputCity = document.querySelector('#city-name-input');
  inputCity.addEventListener('input', updateCityName);
};

const city = document.querySelector('#city').textContent;

const getTempF = (city) => {
  axios
    .get(API_CITY, { params: { q: city, format: 'json' } })
    .then((result) => {
      const latitude = result.data[0].lat;
      const lontitude = result.data[0].lon;
      console.log(city)
      console.log(latitude , lontitude)

      axios
        .get(API_WEATHER, {
          params: { lat: latitude, lon: lontitude },
        })
        .then((result) => {
          const temp = result.data.main.temp;
          console.log(convertTempKtoF(temp));
          const tempF = convertTempKtoF(temp);
          // return tempF;
          temperature = tempF
          // console.log(temperature)
          
          const tempButton = document.querySelector("#temperature-button")
          tempButton.addEventListener("click", ()=> {
            const spanTempNumber = document.querySelector("#temperature-value")
          spanTempNumber.textContent = temperature
          console.log(spanTempNumber.textContent)

          })

        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  
    
};

const convertTempKtoF = (temp) => {
  const tempF = Math.round(1.8 * (Number(temp) - 273) + 32);
  return tempF;
};

// const updateTempOnClick =() => {
//   temperature = getTempF(city)
//   console.log(updateTempOnClick)
// }


const EventHandlers = () => {
  increaseTempOnClick();
  decreaseTempOnClick();
  updateCityNameInput();
  getTempF(city);
  // updateTempOnClick();

};
if (document.readyState !== 'loading') {
  EventHandlers();
} else {
  document.addEventListener('DOMContentLoaded', EventHandlers);
}
