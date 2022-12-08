let temperature = document.getElementById('display-temp');

window.onload = () => {
  temperature.innerHTML = 50;
};

const landscape = document.getElementById('ground-emoji');
const tempUp = document.getElementById('temp-up');
const tempDown = document.getElementById('temp-down');

let inputCity = document.getElementById('input-city');
let cityName = document.getElementById('city-name');

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
