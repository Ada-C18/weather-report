"use strict";

const state = {
  city: 'Portland',
  temperature: 40,
  latitude: 45.51,
  longitude: 122.68,
}

let getcityName = document.getElementById("cityInput");
let curWeatherEmojis = document.getElementById("curWeatherEmojis");

function myFunction (){
  const input = document.getElementById("cityInput").value;
  document.getElementById("cityHeader").textContent = input;
}

document.getElementById("sky").addEventListener('change', (event) => {
  const bgValue = event.target.options[event.target.selectedIndex].value;
  if( bgValue == 'sunny' ) {
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/sunshine.png)";      
    } else if( bgValue == "cloudy" ){
      document.body.style.backgroundImage = "url(/ada-project-docs/assets/cloudy.png)";      
    } else if( bgValue == "rainy" ){
      document.body.style.backgroundImage = "url(/ada-project-docs/assets/rain.png)";      
    } else if( bgValue == "snowy" ){
      document.body.style.backgroundImage = "url(/ada-project-docs/assets/snow.png)";      
    }
});

const weatherEmojisandColor = () => {
  let temp = state.temperature;
  let color;
  if (temp <= 49) {
    curWeatherEmojis.textContent="❄️🥶❄️🥶";
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/snow.png)";
    color="cornflowerblue";
  } else if (temp <= 59) {
    curWeatherEmojis.textContent="🧤🧣🧤🧣";
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/rain.png)";
    color = "green";
  } else if (temp <= 69) {
    curWeatherEmojis.textContent="✅✅✅✅";
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/cloudy.png)";
    color ="yellow";
  } else if (temp <= 79) {
    curWeatherEmojis.textContent="😅😎😅😎";
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/sunshine.png)";
    color="orange";
  } else {
    curWeatherEmojis.textContent="🔥🔥🔥🔥";
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/dry.png)";
    color="red"
  }
    let tempTag = document.getElementById("tempTag")
    
    tempTag.textContent = String(temp)
    tempTag.className = color
    
};

const getLatLon = () => {
  return axios.get("http://127.0.0.1:5000/location", {
    params: {
      q: state.city,
    }
  }).then((response)=>{
    state.latitude = response.data[0].lat;
    state.longitude = response.data[0].lon;

    getWeather()
    console.log("working")
}).catch((error) => {
    console.log("City not found")
  })
};

const getWeather = () => {
  axios.get("http://127.0.0.1:5000/weather", {
    params: {
    lat: state.latitude,
    lon: state.longitude,
  }})
  .then((response) => {
    const tempInF = Math.floor((response.data.main.temp - 273.15) * (9/5) + 32)
    weatherEmojisandColor()
  })
  .catch((error) => {
    console.log("error no temperature found")
  })
};

const increaseTemp = () => {
    state.temperature+=1;
    weatherEmojisandColor();
  }

const decreaseTemp = () => {
    state.temperature-=1;
    weatherEmojisandColor();
}

const adjustCityName = () => {
  const inputCity = document.getElementById("cityInput").value;
  const cityHeader = document.getElementById("cityHeader");
  state.city = inputCity
  cityHeader.textContent = state.city;
};

const adjustTemp = () => {
  const tempTag = document.getElementById("tempTag");
  getLatLon().then((temperature)=>{;
    tempTag.textContent = temperature;
    state.temp = temperature
    weatherEmojisandColor()
  })
}

const resetCity = () =>{
  const cityInput = document.getElementById("cityInput");
  cityInput.value = "Portland";

  adjustCityName()
}

// Section for Event Handlers 

const registerEventHandlers = () => {
  weatherEmojisandColor()

  const realTimeTemp = document.getElementById("realTime");
  realTimeTemp.addEventListener('click', getLatLon)
  
  const increaseBtn = document.getElementById("increaseBtn")
  increaseBtn.addEventListener('click', increaseTemp);
  
  const decreaseBtn = document.getElementById("decreaseBtn")
  decreaseBtn.addEventListener('click', decreaseTemp)

  adjustCityName()
  getcityName.addEventListener('input', adjustCityName) 

  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener('click', resetCity)

};

document.addEventListener('DOMContentLoaded', registerEventHandlers);