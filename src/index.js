"use strict";

const state = {
  city: 'Portland, OR',
  temperature: 72,
  latitude: 45.5152,
  longitude: 122.6784,
}

let getCityName;
let curWeatherEmojis = document.getElementById("curWeatherEmojis");
let cityDisplayOnLoad = document.getElementById("now-showing").textContent = 
  `Now showing the temperature for ${state.city}`;

const updateCityWhileTyping = () => {
  const input = document.getElementById("defaultCity").value;
  document.getElementById("now-showing").textContent = 
  `Now showing the temperature for ${input}`
  state.city = input;
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

const getLatLonAsync = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/location", {
      params: {
        q: state.city,
      }}
    )
    console.log(state.city)
    console.log("success!", response.data)
    state.latitude = response.data[0].lat;
    state.longitude = response.data[0].lon;
    getWeather();
  } catch (error) {
    console.log("City not found");
  }
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

const adjustTemp = () => {
  const tempTag = document.getElementById("tempTag");
  getLatLon().then((temperature)=>{;
    tempTag.textContent = temperature;
    state.temp = temperature
    weatherEmojisandColor()
  })
}

const resetCity = () => {
  const defaultCity = document.getElementById("defaultCity");
  defaultCity.value = "Portland, OR";
  state.city = defaultCity.value;
  nowShowingTemp();
}

const nowShowingTemp = () => {
  document.getElementById("now-showing").textContent = 
    `Now showing the temperature for ${state.city}`;
}; 

// Section for Event Handlers 

const registerEventHandlers = () => {
  weatherEmojisandColor();
  const realTimeTemp = document.getElementById("realTime");
  realTimeTemp.addEventListener('click', getLatLonAsync);
  
  const increaseBtn = document.getElementById("increaseBtn");
  increaseBtn.addEventListener('click', increaseTemp);
  
  const decreaseBtn = document.getElementById("decreaseBtn");
  decreaseBtn.addEventListener('click', decreaseTemp);

  const getCityName = document.getElementById("now-showing");
  getCityName.addEventListener('input', updateCityWhileTyping);

  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener('click', resetCity);

  const cityDisplayOnLoad = document.getElementById("defaultCity");
  cityDisplayOnLoad.addEventListener('load', nowShowingTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);