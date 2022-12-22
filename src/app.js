const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const sky = document.querySelector('img.time');
const landscape = document.querySelector('.iconLandscape img');


const convertFromKtoF = (temp) => (temp - 273) * (9 / 5) + 32;

const increaseTemp = () => {
  temp += 1;
  // updateUI();
};

const decreaseTemp = () => {
  temp -= 1;
  // updateUI();
};

const updateUI = (data) => {
  // const cityDet = data.cityDet;
  const weather = data.weather;
  const main = weather.weather[0].main;
  const temp = Math.round(convertFromKtoF(weather.main.temp));
  const icon = weather.weather[0].icon;
  dayTime = icon.slice(-1)
  console.log(typeof(icon));
  console.log(dayTime)

  // update details template
  details.innerHTML = `
  <h3 id="cityOutput">${weather.name}</h3>
  <div class="my-3">${main}</div>
  <div class="display-4 my-4">
      <button id=${tempInc}>⬆️</button>
      <span id="tempValue">${temp}</span>
      <span>&deg;F</span>
      <button id=${tempDec}>⬇️</button>
  </div>
  <div><button id="currentTempBtn">Get Current Temperature</button></div>
  `;

  // set background of sky
  let timeSrc = null;
  if (dayTime == "d") {
    timeSrc = "assets/img/day.svg";
  } else {
    timeSrc = "assets/img/night.svg";
  };
  sky.setAttribute("src", timeSrc);

//  change temp color
  let color = 'red'
    if (temp > 80) {
    } else if (temp > 70) {
      color = 'orange';
    } else if (temp > 60) {
      color = 'yellow';
    } else if (temp > 50) {
      color = 'green';
    } else {
      color = 'teal';
    }
  const temperature = document.querySelector('#tempValue');
  temperature.className = color;
  

  let weatherCon = null;
  let skyColor = '';
  if (main === "Rain") {
    weatherCon = "assets/img/icons/18.svg";
    skyColor = 'rainy';
  } else if (main === "Snow") {
    weatherCon = "assets/img/icons/20.svg";
    skyColor = 'snowy';
  }else if (main === "Clouds") {
    weatherCon = "assets/img/icons/7.svg";
    skyColor = 'cloudy';
  } else if ( main === 'Clear') {
    weatherCon = "assets/img/icons/1.svg";
    skyColor = 'sunny';
  }else if ( main === 'Mist') {
    weatherCon = "assets/img/icons/11.svg";
    skyColor = 'mist';
  }
  landscape.setAttribute('src', weatherCon);

  // remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }

};



// UPDATE CITY
const updateCity = async (city) => {
  const cityDet = await getLatAndLong(city);
  const weather = await getWeather(cityDet.lat, cityDet.lon);
  return { cityDet, weather };
};



// ADD EVENTS
// cityForm.addEventListener('submit', (e) => {
//   // prevent default action
//   e.preventDefault();

//   // get city value
//   const city = cityForm.cityName.value.trim();
//   cityForm.reset();

//   // update city
//   updateCity(city)
//     .then((data) => updateUI(data))
//     .catch((err) => console.log(err)); // .then((data) => updateUI(data))
//   // .catch((err) => console.log(err));



// });


// REGISTERING EVENT HANDLERS
const registerEventHandlers = () => {

  updateCity()
  .then((data) => updateUI(data))
  .catch((err) => console.log(err));


  const tempInc = document.querySelector('#tempInc');
  tempInc.addEventListener('click', increaseTemp);


  const tempDec = document.querySelector('#tempDec');
  tempDec.addEventListener('click', decreaseTemp);

  cityForm.addEventListener('submit', (e) => {
    // prevent default action
    e.preventDefault();
  
    // get city value
    const city = cityForm.cityName.value.trim();
    cityForm.reset();
  
    // update city
    updateCity(city)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err)); 
  });


}



document.addEventListener('DOMContentLoaded', registerEventHandlers);