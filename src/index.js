// --------------------------------wave3 and 6 Naming the City----------------------
const cityNameLabel = document.getElementById('cityname');
const cityNameInput = document.getElementById('cityname-input');
const resetBtn = document.getElementById('reset-btn');
// change city name on top header
const addCityName = document.getElementById('topCityName');
var currCity;
// handle Get Realtime Temperature button to check weather
const gettemperature = document.getElementById('gettemperature');
var count;

cityNameInput.addEventListener('change', (event) => {
  currCity = event.target.value;
  console.log('change:', currCity);
  cityNameLabel.innerText = currCity;
  addCityName.innerText = currCity;
});
resetBtn.addEventListener('click', () => {
  cityNameInput.value = '';
  cityNameLabel.innerText = 'City Name';
});

gettemperature.addEventListener('click', () => {
  findLocation(currCity);
});
// --------------------------------------wave4 Calling APIs-------------------
const findLocation = (query) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: query,
        format: 'json',
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log(response);
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);
      // make the next API call here!
      // findcity(latitude, longitude);
      getWeather(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });
};

const getWeather = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        format: 'json',
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      currentTemp = Number(response.data.main.temp);
      count = Math.floor((currentTemp - 273.15) * 1.8) + 32;
      totalCount.innerText = count;
      console.log('success in find temperature!', response.data.main.temp);
    })
    .catch((error) => {
      console.log('error in weather!');
    });
};

// --------------------------------------wave5 Selecting the Sky-------------------
const selectElement = document.getElementById('slide');
const skyPicture = document.getElementById('skyPicture');

const changeselectionSky = (value) => {
  if (value === 'Sunny') {
    skyPicture.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (value === 'Cloudy') {
    skyPicture.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (value === 'Rainy') {
    skyPicture.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (value === 'Snowy') {
    skyPicture.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};
selectElement.addEventListener('change', (event) => {
  // console.log(event.target);
  const value = event.target.value;
  // console.log(event.target.value);
  changeselectionSky(value);
});
// --------------------------------wave2  Increase and Decrease Temperature----------------------

// Select increment and decrement buttons
const increaseElement = document.getElementById('up');
const decreaseElement = document.getElementById('down');
// Select total count
const totalCount = document.getElementById('totalCount');
// Variable to track count
// let count = 49;
// Display initial count value
// totalCount.innerHTML = count;
// Function to increment/decrement count

const handleIncrease = () => {
  count++;
  totalCount.innerHTML = count;
  checkTemperatureRange(Number(totalCount.innerText));
};

const handleDecrease = () => {
  count--;
  totalCount.innerHTML = count;
  checkTemperatureRange(Number(totalCount.innerText));
};

// Add click event to buttons
increaseElement.addEventListener('click', handleIncrease);
decreaseElement.addEventListener('click', handleDecrease);
// Temperature Ranges Change
const gardenPicture = document.getElementById('gardenPicture');
const checkTemperatureRange = (countValue) => {
  if (49 <= countValue && countValue < 50) {
    document.body.style.backgroundColor = 'teal';
    gardenPicture.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (50 <= countValue && countValue < 59) {
    document.body.style.backgroundColor = 'green';
    gardenPicture.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (60 <= countValue && countValue < 69) {
    document.body.style.backgroundColor = 'yellow';
    gardenPicture.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (70 <= countValue && countValue < 79) {
    document.body.style.backgroundColor = 'orange';
    gardenPicture.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (80 <= countValue) {
    document.body.style.backgroundColor = 'red';
    gardenPicture.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};
// toggle celsius and fahrenheit
// JS brower connect
if (document.readyState !== 'loading') {
  // findLocation('Seattle');
  console.log('check loading');
} else {
  // document.addEventListener('DOMContentLoaded', findLocation);
  console.log('still loading');
}
