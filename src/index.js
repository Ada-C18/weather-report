// WAVE 2

// const { default: axios } = require('axios');

const increaseTemp = () => {
  const increaseButton = document.getElementById('increase-temp');

  increaseButton.addEventListener('click', () => {
    const currentTemperature = document.getElementById('curr-temp');
    currentTemperature.innerHTML = parseInt(currentTemperature.innerHTML) + 1;
    tempcolor();
  });
};

const decreaseTemp = () => {
  const decreaseButton = document.getElementById('decrease-temp');

  decreaseButton.addEventListener('click', () => {
    const currentTemperature = document.getElementById('curr-temp');
    currentTemperature.innerHTML = parseInt(currentTemperature.innerHTML) - 1;
    tempcolor();
  });
};

const tempcolor = () => {
  const currentTemperature = document.getElementById('curr-temp');
  // Double check that how we can access background-image in grid-container class
  const gridContainer = document.querySelector('.grid-container');

  if (currentTemperature.innerHTML >= 80) {
    currentTemperature.className = 'temp-red';
    gridContainer.style.backgroundImage =
      'url(../assets/desert-nicole-herrero.jpg)';
  } else if (currentTemperature.innerHTML >= 70) {
    currentTemperature.className = 'temp-orange';
    gridContainer.style.backgroundImage =
      'url(../assets/tropical-alexis-antonio.jpg)';
  } else if (currentTemperature.innerHTML >= 55) {
    currentTemperature.className = 'temp-yellow';
    gridContainer.style.backgroundImage =
      'url(../assets/green-field-anisur-rahman.jpg)';
  } else if (currentTemperature.innerHTML >= 40) {
    currentTemperature.className = 'temp-green';
    gridContainer.style.backgroundImage =
      'url(../assets/fall-federica-galli.jpg)';
  } else if (currentTemperature.innerHTML <= 39) {
    currentTemperature.className = 'temp-teal';
    gridContainer.style.backgroundImage =
      'url(../assets/winter-christiaan-huynen.jpg)';
  }
};

// wave 3
const changeCity = () => {
  const inputCityName = document.getElementById('city-name');
  // const headerCityName = document.getElementById('header-city');
  // headerCityName.innerHTML = inputCityName;
  inputCityName.addEventListener('input', () => {
    // const inputCityName = document.getElementById('city-name');
    const headerCityName = document.getElementById('header-city');
    headerCityName.textContent = inputCityName.value;
  });
};

//wave 4

const getLatLon = (location) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: { q: location, format: 'json' },
    })
    .then((result) => {
      const lat = result.data[0].lat;
      const lon = result.data[0].lon;
      console.log(`${location} lat: ${lat} lon: ${lon}`);
      // return getWeather(lat,lon);
    })
    .catch((error) => {
      console.log(`Error in the getLatLon api ${error.data}`);
    });
};

const getWeather = (lat, lon) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: { lat: lat, lon: lon, format: 'json' },
    })
    .then((result) => {
      return result.data.main.temp;
    })
    .catch((error) => {
      console.log(`Error in the getWeather api ${error.data}`);
    });
};

const resetTemperature = () => {
  const resetTempButton = document.getElementById('reset-temp-btn');
  resetTempButton.addEventListener('click', () => {
    const city = document.getElementById('header-city');
    const realtimeTemp = getWeather(getLatLon(city));
    const currentTemperature = document.getElementById('curr-temp');
    currentTemperature.innerHTML = realtimeTemp;
  });
};

// axios.get('https://api.ipify.org/?format=json',
//     {
//         proxy: {
//             protocol: 'http',
//             host: '149.129.239.170',
//             port: 8080
//         }
//     }
// )
//     .then(res => {
//         console.log(res.data)
//     }).catch(err => console.error(err))

const setUp = () => {
  increaseTemp();
  decreaseTemp();
  tempcolor();
  changeCity();
  // getLatLon('Seattle');
};

if (document.readyState !== 'loading') {
  increaseTemp();
  decreaseTemp();
  tempcolor();
  changeCity();
} else {
  document.addEventListener('DOMContentLoaded', setUp);
}