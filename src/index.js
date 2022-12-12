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
  let color = '';
  let picture = '';
  if (tempNumber > 80) {
    color = 'red';
    picture = 'assets/summer.jpeg';
  } else if (tempNumber > 70) {
    color = 'orange';
    picture = 'assets/Autumn.jpeg';
  } else if (tempNumber > 60) {
    color = 'yellow';
    picture = 'assets/Autumn.jpeg';
  } else if (tempNumber > 50) {
    color = 'green';
    picture = 'assets/Spring.jpeg';
  } else {
    color = 'teal';
    picture = 'assets/Winter.jpeg';
  }
  document.getElementById('temp-number').style.color = color;
  document.getElementById('season-pic').src = picture;
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
  document.getElementById('sky-pic').src = `assets/${skyInput}.jpeg`;
}
