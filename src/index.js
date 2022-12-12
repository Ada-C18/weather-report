const urlLocation = 'http://127.0.0.1:5000/location';
const urlWeather = 'http://127.0.0.1:5000/weather';

const windowLoad = () => {
  const tempUp = document.getElementById('temp-up');
  const tempDown = document.getElementById('temp-down');
  const getRealTemp = document.getElementById('realtime');
  const resetButton = document.getElementById('reset-button');

  let temperature = document.getElementById('display-temp');
  let cityName = document.getElementById('city-name');
  let defaultCity = 'Seattle';
  let selectSky = document.getElementById('sky');
  let sky = document.getElementById('sky-emoji');
  let inputCity = document.getElementById('input-city');

  cityName.innerHTML = defaultCity;
  temperature.innerHTML = getRealtimeTemp(cityName, temperature);

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
  const changeCity = (inputCity) => {
    cityName.innerHTML = inputCity.value;
  };
  inputCity.addEventListener('change', () => {
    changeCity(inputCity);
  });
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

  resetButton.addEventListener('click', () => {
    cityName.innerHTML = defaultCity;
    getRealtimeTemp(cityName, temperature);
  });
  getRealTemp.addEventListener('click', () => {
    getRealtimeTemp(cityName, temperature);
  });
};

const changeColorAndEmojis = (temperature) => {
  const landscape = document.getElementById('ground-emoji');
  if (temperature.innerText >= 80) {
    temperature.style.color = 'red';
    temperature.style.backgroundColor = 'lightsalmon';
    landscape.innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature.innerText >= 70 && temperature.innerText <= 79) {
    temperature.style.color = 'orange';
    temperature.style.backgroundColor = 'lightorange';
    landscape.innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature.innerText >= 60 && temperature.innerText <= 69) {
    temperature.style.color = 'gold';
    temperature.style.backgroundColor = 'lightyellow';
    landscape.innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature.innerText >= 50 && temperature.innerText <= 59) {
    temperature.style.color = 'green';
    temperature.style.backgroundColor = 'mediumseagreen';
    landscape.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    temperature.style.color = 'teal';
    temperature.style.backgroundColor = 'paleturquoise';
    landscape.innerText = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const getRealtimeTemp = (cityName, temperature) => {
  console.log('here');
  axios
    .get(urlLocation, {
      params: {
        q: cityName.innerHTML,
      },
    })
    .then((response) => {
      let lat = response.data[0].lat;
      let lon = response.data[0].lon;
      console.log(lat, lon);
      return axios.get(urlWeather, {
        params: {
          lat: lat,
          lon: lon,
          units: 'imperial',
        },
      });
    })
    .then((response) => {
      currentTemp = Number(response.data.main.temp);
      temperature.innerHTML = Math.floor((currentTemp - 273.15) * 1.8) + 32;
      changeColorAndEmojis(temperature);
    })
    .catch((err) => {
      console.log(err);
    });
};

if (document.readyState !== 'loading') {
  windowLoad();
} else {
  document.addEventListener('DOMContentLoaded', windowLoad);
}
