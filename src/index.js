'use strict';

// create state
const state = {
    temperature: 72,
    cityName: 'Baltimore',
    lat: 39.299236,
    lon: -76.609383,
};

const getLatAndLon = () => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.cityName,
      },
    })
    .then((response) => {
      console.log(response.data);
      state.lat = response.data[0].lat;
      state.lon = response.data[0].lon;
      getWeather();
    })
    .catch((error) => {
      console.log('Error', error.response);
    });
};

const getWeather = () => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
        const weather =response.data.main.temp;
        // const weather =response.data;
        console.log(weather)
        state.temperature= weather
        state.temperature = Math.round(convertTemp(weather));
        temperature.textContent = `${state.temperature}°`;
        colorEnvChange();
        
    })
    .catch((error) => {
      console.log('Error:', error);
    });
   
};

// temperature color changes based on temp
const colorEnvChange = () => {
  let temperature = state.temperature;
  let color = 'orange';
  let environment = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  if (temperature >= 80) {
    color = 'red';
    environment = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70) {
    color = 'orange';
    environment = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60) {
    color = 'yellow';
    environment = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature >= 50) {
    color = 'green';
    environment = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    color = 'teal';
    environment = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
  const temp = document.getElementById('temperature');
  temp.className = color;

  const enviro = document.getElementById('landscape');
  enviro.textContent = environment;
  temp.textContent = String(state.temperature);
  
};

// create functions
const increaseTemp = () => {
  state.temperature++;
  temperature.textContent = `${state.temperature}°`;
  colorEnvChange();
};

const decreaseTemp = () => {
  state.temperature--;
  temperature.textContent = `${state.temperature}°`;
  colorEnvChange();
};

const updateCity = () => {
    const textName = document.getElementById('search-box').value;
    const cityOutPut = document.getElementById('cityOutput');
    state.cityName = textName;
    cityOutPut.innerHTML = state.cityName;
    // cityOutPut.innerHTML = textName.value;
}

const updateSky = (event) =>{

    // const sunny = document.getElementById('sunny').value;
    // const sunny = document.getElementById('cloudy').value;
    // const sunny = document.getElementById('rainy').value;
    // const sunny = document.getElementById('snowy').value;
    // let sky = '☀️';
    const skySelect = document.querySelector('.skyEmoji')
    skySelect.textContent = `${event.target.value}`;
    
    //suny☀️ snowy❄️ rainy 🌧️ cloudy ☁️

}


const convertTemp = (temperature) => {
    const temp = (temperature - 273.15) * (9/5)+ 32;
    return temp
};


// register event handlers
const registerEventHandlers = () => {
  // Increase Decrease Arrows
  colorEnvChange();
//   getLatAndLon();
  getWeather();

  const selectSky = document.getElementById('select-choices');
  selectSky.addEventListener('change', updateSky);

  const getTempButton = document.getElementById('getTemp');
  getTempButton.addEventListener('click', getLatAndLon);

  const addCity = document.getElementById('addCityButton');
  addCity.addEventListener('click', updateCity);

  const arrowUp = document.getElementById('arrow-up');
  arrowUp.addEventListener('click', increaseTemp);

  const arrowDown = document.getElementById('arrow-down');
  arrowDown.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
