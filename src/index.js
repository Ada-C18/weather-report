// --------------------------------wave2  Increase and Decrease Temperature----------------------
// Select increment and decrement buttons
const increaseElement = document.getElementById('up');
const decreaseElement = document.getElementById('down');
// Select total count
const totalCount = document.getElementById('totalCount');
// Variable to track count
let count = 49;
// Display initial count value
totalCount.innerHTML = count;
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

// --------------------------------wave3 and 6 Naming the City----------------------
const cityNameLabel = document.getElementById('cityname');
const cityNameInput = document.getElementById('cityname-input');
const resetBtn = document.getElementById('reset-btn');
// change city name on top header
const addCityName = document.getElementById('topCityName');

cityNameInput.addEventListener('change', (event) => {
  const value = event.target.value;
  console.log('change:', value);
  cityNameLabel.innerText = value;
  addCityName.innerText = value;
  findLocation(value);
});

resetBtn.addEventListener('click', () => {
  cityNameInput.value = '';
  cityNameLabel.innerText = 'City Name';
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
      findcity(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });
};
const findcity = (latitude, longitude) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        format: 'json',
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      console.log('success in findLocation!', response.data);
    })
    .catch((error) => {
      console.log('error in findLocation!');
    });
};

// --------------------------------------wave5 Calling APIs-------------------
const optionSky = document.getElementById('slide');
const selectionSky = optionSky.value;
const skyPicture = document.getElementById('skyPicture');

const changeselectionSky = (selectionSky) => {
  if (selectionSky === 'Sunny') {
    skyPicture.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (selectionSky === 'Cloudy') {
    skyPicture.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (selectionSky === 'Rainy') {
    skyPicture.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (selectionSky === 'Snowy	') {
    skyPicture.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
};

// JS brower connect
if (document.readyState !== 'loading') {
  findLocation('BeiJing');
} else {
  document.addEventListener('DOMContentLoaded', findLocation);
}
