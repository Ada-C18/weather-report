'use strict';

const { default: axios } = require("axios");

// State, city, temp, sky

// "https://us1.locationiq.com/v1/search.php"
// "https://api.openweathermap.org/data/2.5/weather"

const state = {
  city: 'Seattle',
  lat: 47.6038321,
  long: -122.3300624,
  temp: 48
};


// increase temp
const increaseTemp = () => {
  state.temp ++;
};

const decreaseTemp = () => {
  state.temp --;
}

const findLatAndLong = () => {
axios
  .get("http://127.0.0.1:5000/weather",
  params= {
    "q": state.city, 
  })
  .then((response) => {
    console.log(response.data);
    state.lat = response.data[0].lat;
    state.long = response.data[0].lon;
    getWeather();
  })
};

function findWeather(lat, long) {
  axios
    .get("http://127.0.0.1:5000/location",{ 
    params: {
      lat: state.lat,
      lon: state.long
    },
  })
  .then((response) => {
    const weather = response.data;
    state.temp = Math.round((weather.current.temp));
  })
  };


function resetText() {
  let City = document.getElementById('city');
  // Get the button
  let resetButton = document.getElementById('reset');

  // Add a click event listener to the button
  resetButton.addEventListener('click', function()); {
      // Reset the text box
      City.reset();
}};


const tempColorChange = () => {
  const tempContainer = document.getElementById('temperature');
  
  if (tempContainer <= 32) {
    document.body.style.backgroundColor = 'blue';
    document.body.style.color = 'white';
    document.write('🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨')
} else if (tempContainer > 32 && temperature <= 50) {
    document.body.style.backgroundColor = 'green';
    document.body.style.color = 'white';
} else if (tempContainer > 50 && temperature <= 68) {
    document.body.style.backgroundColor = 'yellow';
    document.body.style.color = 'black';
} else if (tempContainer > 68 && temperature <= 86) {
    document.body.style.backgroundColor = 'orange';
    document.body.style.color = 'black';
} else {
    document.body.style.backgroundColor = 'red';
    document.body.style.color = 'white';
  }
}




const updateSky = () => {
  const inputSky = document.getElementById('skyOptions').value;
  const skyContainer = document.getElementById('sky-weather');
  let sky = '';
  let skyColor = '';
  if (inputSky === 'Clouds') {
    sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    skyColor = 'cloud';
  } else if (inputSky === 'Sunshine') {
    sky = '☁️     ☁️   ☁️ ☀️ ☁️  ☁️';
    skyColor = 'sunn';
  } else if (inputSky === 'Rain') {
    sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    skyColor = 'rain';
  } else if (inputSky === 'Snow') {
    sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    skyColor = 'snow';
  } else if (inputSky === 'Wind') {
    sky = '';
    skyColor = 'wind';
  }
}



// Increase/Decrease temperature
// const increaseTemp = () => {
//   let count = 0;
//   count++;
//   const upButton = document.getElementById('up');
//   const downButton = document.getElementById('down');
//   let display = document.getElementById('tempNum');

//   upButton.addEventListener('click', function () {
//     count++;
//     display.textContent = count;
//   });
//   downButton.addEventListener('click', function () {
//     count--;
//     display.textContent = count;
//   });
//   // increaseTemp.addEventListener("click", incrementCount);
// };






// const decreaseTemp = () => {
//   i--;
//   document.getElementById('down').value = i;
// }
// Temperature number and background changes depending on number

// const tempColorChange = () => {

// }

// // Depending on what temperature it is, a different landscape should appear on the page.

// const

// // Changing landscapes should replace the existing landscape. There should only be one visible landscape at a time.

// // There must be at least four landscapes.

// // Reset city button
// const resetCity = () => {
//   formElement.reset()
// }
