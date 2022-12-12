let temp = 70;
let city = "";

// Temperature Helper Function
let landscapeElem = document.getElementById('landscape');

const changeTempDisplay = (obj1, obj2) => {
  if (obj1.innerHTML < 50) {
    obj1.className = 'teal';
    obj2.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (obj1.innerHTML < 60) {
    obj1.className = 'green';
    obj2.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂';
  } else if (obj1.innerHTML < 70) {
    obj1.className = 'yellow';
    obj2.innerHTML = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (obj1.innerHTML < 80) {
    obj1.className = 'orange';
    obj2.innerHTML = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (obj1.innerHTML >= 80) {
    obj1.className = 'red';
    obj2.innerHTML = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};

//Helper for Temperature
let counterDisplayElem = document.getElementById('temp-count');

const handleCounterPlus = () => {
  incTempBy1();
  changeTempDisplay(counterDisplayElem, landscapeElem);
};

const handleCounterMinus = () => {
  decTempBy1();
  changeTempDisplay(counterDisplayElem, landscapeElem);
};
// Helper for City Submit Bar
const handleSubmitButton = () => {
  city = document.getElementById('submit-city').value;
  document.getElementById('header-city-name').textContent = city;
  //console.log(getInfo(city));
};

// Helpler to set temp
const decTempBy1 = () => {
  temp--;
  counterDisplayElem.innerHTML = temp;
};
const incTempBy1 = () => {
  temp++;
  counterDisplayElem.innerHTML = temp;
};

//Helper for RealTime Temperature
const handleRealTimeButton = () => {
  getInfo(city);
  //findLocation();
};

const init = () => {
  registerEventHandlers();
  counterDisplayElem.innerHTML = temp;
};

const registerEventHandlers = () => {
  //Temperature
  let counterPlusElem = document.querySelector('#counter-plus');
  counterPlusElem.addEventListener('click', handleCounterPlus);

  let counterMinusElem = document.querySelector('#counter-minus');
  counterMinusElem.addEventListener('click', handleCounterMinus);

  //Real-time Temp
  let realTimeButton = document.getElementById('realtime-button');
  realTimeButton.addEventListener('click', handleRealTimeButton);

  // City Submit Bar
  let submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', handleSubmitButton);
};

document.addEventListener('DOMContentLoaded', init);

// Axios calls to proxy server
const API = 'http://127.0.0.1:5000/';
//use api base and then specifics in function

const getInfo = (location) => {
  axios
    .get(API + 'location', { params: { q: location, format: 'json' } })
    .then((result) => {
      const lat = result.data[0].lat;
      const lon = result.data[0].lon;
      console.log(`${location} lat: ${lat} lon: ${lon}`);
      return findLocationTemp(lat, lon);
    })
    .catch((error) => {
      console.log(error);
    });
};

const findLocationTemp = (latitude, longitude) => {
  axios
    .get(API + 'weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      console.log('success in findLocation!', response.data);
      return response.data;
    })
    .catch((error) => {
      console.log('error in findLocation!');
    });
};

// handle get real time temp
//event listener
