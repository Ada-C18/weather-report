const state = {
  temp: 30,
  city: 'Albuquerque',
};

const updateCityTemp = async (city) => {
  const cityLatLon = await axios.get('http://127.0.0.1:5000/location', {
    params: {
      q: city,
    },
  });
  const lat = cityLatLon.data[0].lat;
  const lon = cityLatLon.data[0].lon;
  console.log({ lat, lon });

  const cityWeather = await axios.get('http://127.0.0.1:5000/weather', {
    params: {
      lat: lat,
      lon: lon,
    },
  });

  const tempInKelvin = await cityWeather.data.main.temp;
  console.log(tempInKelvin);

  const kelvinToFahrenheit = (tempInKelvin) => {
    let tempInFahrenheit = (tempInKelvin - 273.15) * (9 / 5) + 32;
    return Math.round(tempInFahrenheit);
  };
  const result = kelvinToFahrenheit(tempInKelvin);
  console.log(result);
  state.temp = result;
  return result;
};

const formatTempAndLandscape = () => {
  let temp = state.temp;
  let color = 'red';
  let footer = '/images/desert_landscape.jpeg';
  let altText = 'A landscape of harsh sunlight, cacti, and cracked land.';
  if (temp > 80) {
    color = 'red';
    footer = '/images/desert_landscape.jpeg';
    altText = 'A landscape of harsh sunlight, cacti, and cracked land.';
  } else if (temp > 70) {
    color = 'orange';
    footer = '/images/sunset_landscape.jpeg';
    altText = 'A colorful, partly-cloudy sunset over a grassy plain.';
  } else if (temp > 60) {
    color = 'yellow';
    footer = '/images/forest_landscape.jpeg';
    altText = 'A view over a still lake with green trees in the background.';
  } else if (temp > 50) {
    color = 'green';
    footer = '/images/fall_landscape.webp';
    altText = 'A river running through trees with leaves changing colors.';
  } else {
    color = 'teal';
    footer = '/images/frozen_forest.jpeg';
    altText = 'Snow-covered landscape with evergreen forest';
  }

  const landscape = document.getElementById('landscape');
  landscape.src = footer;
  landscape.alt = altText;
  const temperature = document.getElementById('tempDisplay');
  temperature.className = color;
  temperature.textContent = String(state.temp);
};

const addTemp = () => {
  state.temp += 1;
  formatTempAndLandscape();
  const tempDisplay = document.querySelector('#tempDisplay');
  tempDisplay.textContent = `${state.temp}`;
};

const minusTemp = () => {
  state.temp -= 1;
  formatTempAndLandscape();
};

const changeCity = () => {
  const inputCity = document.getElementById('cityNameInput').value;
  const cityNameDisplay = document.getElementById('cityNameDisplay');
  state.city = inputCity;
  cityNameDisplay.textContent = `${state.city}`;
};

const getCurrentTempButton = () => {
  const newCityTemp = updateCityTemp(state.city);
  formatTempAndLandscape();
};

const registerEventHandlers = () => {
  formatTempAndLandscape();

  const tempPlus = document.getElementById('tempPlus');
  tempPlus.addEventListener('click', addTemp);
  console.log(tempPlus);

  const tempMinus = document.getElementById('tempMinus');
  tempMinus.addEventListener('click', minusTemp);

  const updateCity = document.getElementById('cityNameInput');
  updateCity.addEventListener('input', changeCity);

  const getCurrentTemp = document.getElementById('currentTempButton');
  getCurrentTemp.addEventListener('click', getCurrentTempButton);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
