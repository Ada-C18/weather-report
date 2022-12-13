const weekday = new Date().toLocaleString("default", {weekday: "long"});
const date = new Intl.DateTimeFormat('en-US', {
  year:  'numeric',
  month: 'long',
  day:   'numeric',
});
document.getElementById('current-date').textContent = `${weekday}, ${date.format()}`;

let currentCity = 'San Diego, CA, USA'
document.getElementById('display-city').textContent = currentCity;

let temperatureNumber = 70;

const displayTempId = document.getElementById('display-temperature');
const logTempText = () => {
  displayTempId.textContent = `${temperatureNumber}°F`;
}
const changeTextColor = () => {
  if (temperatureNumber < 50) {
    displayTempId.style.color = "aqua";
  } else if (temperatureNumber >= 50 && temperatureNumber <= 59) {
    displayTempId.style.color = "limegreen";
  } else if (temperatureNumber >= 60 && temperatureNumber <= 69) {
    displayTempId.style.color = "gold";
  } else if (temperatureNumber >= 70 && temperatureNumber <= 79) {
    displayTempId.style.color = "orange";
  } else {
    displayTempId.style.color = "red";
  }
};

const displayLandscape = document.getElementById('landscape');
const changeLandscape = (temp) => {
  if (temp > 79) {
    return '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70 && temp <= 79) {
    return '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60 && temp <= 69) {
    return '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp <= 59) {
    return '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const logLandscape = (temp) => {
  displayLandscape.textContent = `${changeLandscape(temp)}`
};

const weatherIcon = (imgURL) => {
  let img=document.createElement('img');
  img.src = imgURL;
}


const displaySky = document.getElementById('sky');
const dropdownValue = document.getElementById('weather-dropdown');
const changeSky = (skyDrop) => {
  if (skyDrop === 'sun') {
    return '☁️ _ ☁️ _ _ _ ☀️ _ _ _ ☁️ _ ☁️';
  } else if (skyDrop === 'clouds') {
    return '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (skyDrop === 'rain') {
    return '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyDrop === 'snow') {
    return '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  } else {
    return ' ';
  }
};




dropdownValue.addEventListener('change', function handleChange () {
  let newSky = changeSky(dropdownValue.options[dropdownValue.selectedIndex].value);
  displaySky.textContent = `${newSky}`;
  display
});

logTempText();
changeTextColor();
logLandscape(temperatureNumber);

const currentWeather = document.getElementById('current-temp-button');
currentWeather.addEventListener("click", function () {
  if (textBox.value !== '') {
    findLocation(textBox.value);
  } else {
    findLocation('San Diego, CA, USA');
  }
});

const upButton = document.getElementById('increase-temp-button');
upButton.textContent = '🔥';
upButton.addEventListener("click", function() {
  temperatureNumber += 1;
  logTempText();
  changeTextColor();
  logLandscape(temperatureNumber);
});

const downButton = document.getElementById('decrease-temp-button');
downButton.innerText = '❄️';
downButton.addEventListener("click", function() {
  temperatureNumber -= 1;
  logTempText();
  changeTextColor();
  logLandscape(temperatureNumber);
});

const resetCity = document.getElementById('reset-city-button');
resetCity.addEventListener("click", function() {
  currentCity = 'San Diego, CA, USA';
  document.getElementById('display-city').textContent = currentCity;
  document.getElementById('text-box').value='';
})

const textBox = document.getElementById('text-box');
textBox.onkeyup = function () {
  document.getElementById('display-city').innerHTML = textBox.value;
};


/*   ~~CALLING APIs~~   */
// const axios = require('axios');

const findLocation = (location) => {
  axios.get('http://127.0.0.1:5000/location',
  {
    params: {
      q: location,
    }
  })
  .then( (response) => {
    lat = response.data[0].lat;
    long = response.data[0].lon;
    console.log('Succesful location call!')

    let secondCall = findWeather(lat,long);
    secondCall;
    console.log('Second weather call!');
  })
  .catch( (error) => {
    console.log('ERROR')
  });
}

const findWeather = (lat, long) => {
  axios.get('http://127.0.0.1:5000/weather',
  {
    params: {
      lat: lat,
      lon: long,
    }
  })
  .then( (response) => {
    temperatureResponse = Math.floor(response.data['main']['temp']);
    // weatherResponse = JSON.stringify(response.data['weather'][0]['main']);
    // console.log(`Successful weather response: ${weatherResponse}`)
    temperatureNumber = temperatureResponse
    console.log(`Successful temperature response: ${temperatureResponse}°F!`);
    logTempText();
    changeTextColor();
    logLandscape(temperatureNumber);
  })
  .catch( (error) => {
    console.log('ERROR')
  });
}
