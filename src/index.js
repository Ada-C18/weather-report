// WAVE 2
const increaseTemp = () => {
  const increaseButton = document.getElementById('increase-temp');

  increaseButton.addEventListener('click', () => {
    const currentTemperature = document.getElementById('curr-temp');
    currentTemperature.innerHTML = parseInt(currentTemperature.innerHTML) + 1;
    changeTempColorAndLandscape();
  });
};

const decreaseTemp = () => {
  const decreaseButton = document.getElementById('decrease-temp');

  decreaseButton.addEventListener('click', () => {
    const currentTemperature = document.getElementById('curr-temp');
    currentTemperature.innerHTML = parseInt(currentTemperature.innerHTML) - 1;
    changeTempColorAndLandscape();
  });
};

const changeTempColorAndLandscape = () => {
  const currentTemperature = document.getElementById('curr-temp');
  const gridContainer = document.querySelector('.grid-container');

  if (currentTemperature.innerHTML >= 80) {
    currentTemperature.className = 'temp-red';
    gridContainer.style.backgroundImage =
      'url(../ada-project-docs/assets/desert-nicole-herrero.jpg)';
  } else if (currentTemperature.innerHTML >= 70) {
    currentTemperature.className = 'temp-orange';
    gridContainer.style.backgroundImage =
      'url(../ada-project-docs/assets/tropical-alexis-antonio.jpg)';
  } else if (currentTemperature.innerHTML >= 55) {
    currentTemperature.className = 'temp-yellow';
    gridContainer.style.backgroundImage =
      'url(../ada-project-docs/assets/green-field-anisur-rahman.jpg)';
  } else if (currentTemperature.innerHTML >= 40) {
    currentTemperature.className = 'temp-green';
    gridContainer.style.backgroundImage =
      'url(../ada-project-docs/assets/fall-federica-galli.jpg)';
  } else if (currentTemperature.innerHTML <= 39) {
    currentTemperature.className = 'temp-teal';
    gridContainer.style.backgroundImage =
      'url(../ada-project-docs/assets/winter-christiaan-huynen.jpg)';
  }
};

// WAVE 3
const changeCity = () => {
  const inputCityName = document.getElementById('city-name');
  inputCityName.addEventListener('input', () => {
    const headerCityName = document.getElementById('header-city');
    headerCityName.textContent = inputCityName.value;
  });
};

// WAVE 4
const getLatLon = (location) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: { q: location, format: 'json' },
    })
    .then((result) => {
      const latitude = result.data[0]['lat'];
      const longitude = result.data[0]['lon'];
      getWeather(latitude, longitude);
    })
    .catch((error) => {
      console.log(`Error in the getLatLon api ${error}`);
    });
};

const getWeather = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: { lat: latitude, lon: longitude, format: 'json' },
    })
    .then((result) => {
      const temp = result.data.main.temp;
      const tempF = convertKtoF(temp);
      const currentTemperature = document.getElementById('curr-temp');
      currentTemperature.innerHTML = tempF;
      changeTempColorAndLandscape();
    })
    .catch((error) => {
      console.log(`Error in the getWeather api ${error}`);
    });
};

const convertKtoF = (temp) => {
  const tempF = Math.floor((temp - 273.15) * 1.8 + 32);
  return tempF;
};

const addRealtimeTempListener = () => {
  const realtimeTempButton = document.getElementById('realtime-temp-btn');
  realtimeTempButton.addEventListener('click', (event) => {
    event.preventDefault();
    const city = document.getElementById('header-city').innerText;
    console.log('this is the city', city);

    getLatLon(city);
  });
};

// WAVE 5
const selectSkyEventListener = () => {
  const selectElement = document.querySelector('.sky-dropdown');
  selectElement.addEventListener('change', (event) => {
    const cloudIcon = document.querySelector('#image-change');
    if (selectElement.value === 'Cloudy') {
      cloudIcon.src = '../ada-project-docs/assets/Cloudy.jpeg';
    } else if (selectElement.value === 'Rainy') {
      cloudIcon.src = '../ada-project-docs/assets/Rainy.png';
      cloudIcon.img.alt = 'rainy icon';
    } else if (selectElement.value === 'Snowy') {
      cloudIcon.src = '../ada-project-docs/assets/Snowy.png';
      cloudIcon.img.alt = 'snowy icon';
    } else if (selectElement.value === 'Sunny') {
      cloudIcon.src = '../ada-project-docs/assets/Sunny.png';
      cloudIcon.img.alt = 'sunny icon';
    }
  });
};

// WAVE 6
const resetCityEventListener = () => {
  const resetCityBtn = document.getElementById('reset-city-btn');
  resetCityBtn.addEventListener('click', () => {
    let seattle = 'Seattle';
    const headerCityName = document.getElementById('header-city');
    headerCityName.textContent = seattle;
    const cityNameInput = document.getElementById('city-name');
    cityNameInput.value = '';
  });
};

const setUp = () => {
  increaseTemp();
  decreaseTemp();
  changeCity();
  changeTempColorAndLandscape();
  addRealtimeTempListener();
  selectSkyEventListener();
  resetCityEventListener();
};

document.addEventListener('DOMContentLoaded', setUp);
