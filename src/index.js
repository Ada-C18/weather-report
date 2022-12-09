'use strict';

console.log('Online');

function increaseTemp() {
  console.log('ok');
  const tempDiv = document.getElementById('temp-number');
  let tempNumber = parseInt(tempDiv.textContent);
  console.log(tempNumber);
  tempNumber += 1;
  tempDiv.innerHTML = tempNumber;
}

function decreaseTemp() {
  console.log('ok');
  const tempDiv = document.getElementById('temp-number');
  let tempNumber = parseInt(tempDiv.textContent);
  console.log(tempNumber);
  tempNumber -= 1;
  tempDiv.innerHTML = tempNumber;
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
      console.log('success in getLocation!', latitude, longitude);
    })
    .catch((error) => {
      console.log('error in getLocation!');
    });
  // console.log('lat ' + latitude + ' lon ' + longitude);
  console.log(latitude, latitude);
  return { lat: latitude, lon: longitude };
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
      console.log('success in getTemp!', res.data);
      return res.data['current']['temp'];
    });
}

function updateRealtimeTemp() {
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
      console.log('success in getLocation!', latitude, longitude);
      let temp = getTemperature(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in getLocation!');
    });
  console.log(locationData);
  // let latitude = locationData.lat;
  // let longitude = locationData.lon;
  console.log('lat ' + latitude + ' lon ' + longitude);
}
