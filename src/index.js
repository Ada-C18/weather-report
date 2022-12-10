'use strict';

// const { default: axios } = require("axios");

console.log('Online');

function increaseTemp() {
  const tempDiv = document.getElementById('temp-number');
  let tempNumber = parseInt(tempDiv.textContent);
  // console.log(tempNumber);
  tempNumber += 1;
  tempDiv.innerHTML = tempNumber;
  updateTempPic();
}

function decreaseTemp() {
  const tempDiv = document.getElementById('temp-number');
  let tempNumber = parseInt(tempDiv.textContent);
  // console.log(tempNumber);
  tempNumber -= 1;
  tempDiv.innerHTML = tempNumber;
  updateTempPic();
}

function updateTempPic() {
  let tempNumber = parseInt(document.getElementById('temp-number').textContent);
  console.log(tempNumber);
  if (tempNumber > 80) {
    document.getElementById('temp-number').style.color = 'red';
    document.getElementById('season-pic').src = '../assets/summer.jpeg';
  } else if (tempNumber > 70) {
    document.getElementById('temp-number').style.color = 'orange';
    document.getElementById('season-pic').src = '../assets/Autumn.jpeg';
  } else if (tempNumber > 60) {
    document.getElementById('temp-number').style.color = 'yellow';
    document.getElementById('season-pic').src = '../assets/Autumn.jpeg';
  } else if (tempNumber > 50) {
    document.getElementById('temp-number').style.color = 'green';
    document.getElementById('season-pic').src = '../assets/Spring.jpeg';
  } else {
    document.getElementById('temp-number').style.color = 'teal';
    document.getElementById('season-pic').src = '../assets/Winter.jpeg';
  }
}

function updateCityName() {
  const text = document.getElementById('city-name-input').value;
  const header = document.getElementById('city-name');
  header.innerHTML = text;
}

function resetCityName() {
  const header = document.getElementById('city-name');
  header.innerHTML = 'Austin';
  document.getElementById('city-name-input').value = 'Austin';
}

function getLocation() {
  const cityName = document.getElementById('city-name-input').value;
  let latitude, longitude;
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: cityName,
      },
    })
    .then((res) => {
      latitude = res.data[0].lat;
      longitude = res.data[0].lon;
      console.log('success in getLocation!', { lat: latitude, lon: longitude });
      getTemperature(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in getLocation!');
    });
}

function getTemperature(latitude, longitude) {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((res) => {
      console.log('success in getTemp!', res.data['main']['temp']);
      const kelvin = res.data['main']['temp'];
      const tempDiv = document.getElementById('temp-number');
      tempDiv.innerHTML = Math.round(((kelvin - 273.15) * 9) / 5 + 32);
      updateTempPic();
    })
    .catch((error) => {
      console.log('error in getTemp!');
    });
}

function updateSky() {
  const skyInput = document.getElementById('sky-input').value;
  if (skyInput === 'Sunny') {
    document.getElementById('sky-pic').src = '../assets/sunny.jpeg';
  } else if (skyInput === 'Cloudy') {
    document.getElementById('sky-pic').src = '../assets/Cloudy.webp';
  } else if (skyInput === 'Snowy') {
    document.getElementById('sky-pic').src = '../assets/Snowy.jpg';
  } else if (skyInput === 'Rainy') {
    document.getElementById('sky-pic').src = '../assets/Rain.jpeg';
  }
}
