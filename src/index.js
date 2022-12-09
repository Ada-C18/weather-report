import { landscapeEmoji, skyEmoji } from './constants.js';

// temperature controls
const state = {
  temp: 39,
};

const increaseTemp = () => {
  state.temp += 1;
  const currentTemperature = document.getElementById('temperature');
  currentTemperature.textContent = `${state.temp}`;
  tempColorAndLandscape();
};

const decreaseTemp = () => {
  state.temp -= 1;
  const currentTemperature = document.getElementById('temperature');
  currentTemperature.textContent = `${state.temp}`;
  tempColorAndLandscape();
};

//temperature decorations
const tempColorAndLandscape = () => {
  const temperature = document.getElementById('temperature');
  const landscape = document.getElementById('landscape');

  if (state.temp >= 80) {
    temperature.style.color = 'red';
    landscape.textContent = landscapeEmoji.hot;
  } else if (state.temp >= 70) {
    temperature.style.color = 'orange';
    landscape.textContent = landscapeEmoji.warm;
  } else if (state.temp >= 60) {
    temperature.style.color = 'yellow';
    landscape.textContent = landscapeEmoji.cool;
  } else if (state.temp >= 50) {
    temperature.style.color = 'green';
    landscape.textContent = landscapeEmoji.freezing;
  } else {
    temperature.style.color = 'teal';
    landscape.textContent = landscapeEmoji.freezing;
  }
};

// sky selector - drop-down for sky art
const updateSky = () => {
  const selectedSky = document.getElementById('sky-selector').value;
  const weatherEmojiContainer = document.getElementById('weather-emojis');

  if (selectedSky === 'sunny') {
    weatherEmojiContainer.textContent = skyEmoji.sunny;
  } else if (selectedSky === 'cloudy') {
    weatherEmojiContainer.textContent = skyEmoji.cloudy;
  } else if (selectedSky === 'rainy') {
    weatherEmojiContainer.textContent = skyEmoji.rainy;
  } else if (selectedSky === 'snowy') {
    weatherEmojiContainer.textContent = skyEmoji.snowy;
  }
};

// text field input - for city name
const displayText = () => {
  const cityName = document.getElementById('city-name');
  const textField = document.getElementById('text-field');

  cityName.textContent = textField.value;
};

// get the lat and lon of the city in the input text box
const getLatAndLon = () => {
  // const cityName = document.getElementById('city-name').innerText;
  axios
    .get('http://127.0.0.1:5000/location', { params: { q: cityName } })
    .then((response) => {
      console.log(`getting a response from ${cityName}`);
      console.log(response.data);
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      // console.log(`lat is ${lat} and lon is ${lon}`);
      return { lat: lat, lon: lon };
    })
    .catch((error) => {
      console.log(error);
    });
};

// get city temperature using getLatAndLon
const getTemperature = () => {
  // const cityLocation = getLatAndLon();
  // console.log(`Inside getTemperature, The city location is ${cityLocation}`);
  // console.log(`Inside the getTemperature, lat is ${cityLocation.lat} and lon is ${cityLocation.lon}`);
  let cityLocation;

  const currentPromise = getPromise();
  currentPromise
    .then((value) => {
      cityLocation = getLatAndLon();
    })
    .catch((error) => {
      console.log(error);
    });

  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: { lat: cityLocation.lat, lon: cityLocation.lon },
    })
    .then((response) => {
      console.log(`The response data is ${response.data}`);
      console.log(
        `The main part of the response data is ${response.data.main}`
      );
      const kelvinDegree = response.data.main.temp;

      const fahrenheitDegree = ((kelvinDegree - 273.15) * 9) / 5 + 32;
      console.log(fahrenheitDegree);
      return fahrenheitDegree;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPromise = () => {
  const timeoutTime = 1000;
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("It's go time!"), timeoutTime);
  });
  return myPromise;
};

/**
 * 1. get the city from the documnet
 * 2. pass in the city name and make an API call to LOCATIONIQ, get the lat and lon
 * 3. pass in the lat and lon, make an API call to OpenWeather, get the temperature
 * 4. convert temperature to fahrenheit
 * 5. display the temperature on click
 */

const registerEventHandlers = () => {
  //increase temp
  const increaseTempButton = document.getElementById('inc-temp');
  increaseTempButton.addEventListener('click', increaseTemp);
  //decrease temp
  const decreaseTempButton = document.getElementById('dec-temp');
  decreaseTempButton.addEventListener('click', decreaseTemp);
  //text input
  const inputBox = document.getElementById('text-field');
  inputBox.addEventListener('keyup', displayText);
  //real time temperature
  const realTimeTempButton = document.getElementById('real-time-temp');
  realTimeTempButton.addEventListener('click', getTemperature);
  // select sky
  const skySelector = document.getElementById('sky-selector');
  skySelector.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
