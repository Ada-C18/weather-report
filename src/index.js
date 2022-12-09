


// logic to change temperature using the buttons
const state = {
  temp: 45,
  city: 'Seattle',
};

//converting Kelvin to Fahrenheit
const convertKelvinToF = (temp) => ((temp - 273.15) * 9) / 5 + 32;
console.log('Temperature is:', convertKelvinToF(271.54));

//Creating addTemp and minus Temp events
const addTemp = (event) => {
  state.temp += 1;
  const tempControl = document.querySelector('#currentTemp');
  tempControl.textContent = state.temp;
  changeTempNumColor();
};

const minusTemp = (event) => {
  state.temp -= 1;
  const tempControl = document.querySelector('#currentTemp');
  tempControl.textContent = state.temp;
  changeTempNumColor();
};



//HELPER FUNCTION logic for temperture to change color font, landscape and sky
const changeTempNumColor = () => {
  let temp = state.temp;
  const skyElement = document.querySelector('#sky');
  const landScapeElement = document.querySelector('#gardenlandscape');

  if (temp >= 80) {
    document.getElementById('currentTemp').className = 'red';
    skyElement.textContent = '🔥🥵🌞🔥🥵🌞🔥🥵🌞';
    landScapeElement.textContent = '👙🩳⛱🏝🌊👙🩳⛱🏝🌊👙🩳⛱🏝🌊';
  } else if (temp >= 70 && temp <= 79) {
    document.getElementById('currentTemp').className = 'orange';
    skyElement.textContent = '🌤☁️🌤☁️🌤☁️🌤☁️🌤☁️';
    landScapeElement.textContent = '🌻🌹🍉🌻🌹🍉🌻🌹🍉🌻🌹🍉🌻🌹🍉';
  } else if (temp >= 60 && temp <= 69) {
    document.getElementById('currentTemp').className = 'yellow';
    skyElement.textContent = '☁️🌥☁️🌥☁️🌥☁️🌥☁️🌥';
    landScapeElement.textContent = '🌧☔️🌈🌧☔️🌈🌧☔️🌈🌧☔️🌈';
  } else if (temp >= 50 && temp <= 59) {
    document.getElementById('currentTemp').className = 'green';
    skyElement.textContent = '☁️☁️☁️☁️🌥☁️☁️☁️☁️';
    landScapeElement.textContent = '🍁🍂🌲🌳🍁🍂🌲🌳🍁🍂🌲🌳';
  } else {
    document.getElementById('currentTemp').className = 'teal';
    skyElement.textContent = '☁️🌧❄️☁️🌧❄️☁️🌧❄️☁️🌧❄️';
    landScapeElement.textContent = '☃️🧤🥶🏔☃️🧤🎄🥶🏔☃️🧤🥶🏔';
  }
};

////Creating an event to update headerCityName
const updateCityName = (event) => {
  const updatedCityName = document.getElementById('headerCityName');
  state.city = event.target.value
  updatedCityName.textContent = `🌍🌟${event.target.value}🌟🌍`;
  console.log("New city name", state.city)
  return state.city
};

//Get Current temperature button event
const getCurrentTemp = (event) => {
  //call the API to return the current temp
  //take the current temp and update the state.temp
  getLatAndLon(state.city)  
  console.log("inside get current temp");

}



//API call for LocationIQ
locationURL = 'http://127.0.0.1:5000/location'
weatherURL = 'http://127.0.0.1:5000/weather'

// const location = updateCityName();
const getLatAndLon = (location) => {
  axios.get(locationURL,{
    params:{
      q:state.city,
      format: 'json'
    }
  }).then((result) => {
    const lat = result.data[0].lat;
    const lon = result.data[0].lon;
    console.log(`${location} lat: ${lat} lon: ${lon}`);

    axios.get(weatherURL,{
      params:{
        lat:lat,
        lon:lon
      }
    }).then((response) => {
      console.log(convertKelvinToF(response.data.main.temp));
      state.temp = convertKelvinToF(response.data.main.temp);
      //modify the current temp number
      const currentTempReal = document.querySelector('#currentTemp');
      currentTempReal .textContent = Math.round(state.temp);
      changeTempNumColor();


    }).catch((error)=>{
      console.log(error);
    })

  })
  .catch((error) => {
    console.log(error);
  })
  
};

//create an event to take user's selection
//take user selection and give if/else statement
const skySelect = () => {
  let selection = document.getElementById("selectSky")
  // console.log(selection.value)
  // const userChange = () => {
  //   let userChoice = selection.value;
  // }
  let userChoice = selection.value
  if (userChoice = "Rainy") {
    const gardenBackground = document.getElementById("#garden_section")
    gardenBackground.classList.add("rainy")

  }

};
//add event listener



////Registering Event handlers and add event listeners
const registerEventHandlers = (event) => {
  const decreaseTempButton = document.querySelector('#decreaseTemp');
  decreaseTempButton.addEventListener('click', minusTemp);

  const increaseTempButton = document.querySelector('#increaseTemp');
  increaseTempButton.addEventListener('click', addTemp);
  console.log('click click!!');

  const input = document.querySelector('input');
  input.addEventListener('input', updateCityName);

  const updateCurrentTempButton = document.querySelector('#getCurrentTemp');
  updateCurrentTempButton.addEventListener('click', getCurrentTemp)

  const updateSky = document.querySelector('#selectSky');
  updateSky.addEventListener('change', skySelect)
};


document.addEventListener('DOMContentLoaded', registerEventHandlers);
