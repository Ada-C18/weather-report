
const state = {
  tempCount: 64,
  cityName: "Ada",
};

const updateLandscapeColor = () => {
  const tempDisplay = document.querySelector("#temperature");
  const landscape = document.querySelector("#landscape");
  if (state.tempCount <= 49){
    tempDisplay.style.color = "teal";
    landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
  } else if (state.tempCount >= 50 && state.tempCount <= 59) {
    tempDisplay.style.color = "green";
    landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
  } else if (state.tempCount >= 60 && state.tempCount <= 69) {
    landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    tempDisplay.style.color = "yellow";
  } else if (state.tempCount >= 70 && state.tempCount <= 79) {
    landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    tempDisplay.style.color = "orange";
  } else if (state.tempCount >= 80) {
    landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
    tempDisplay.style.color = "red";
  }
}

const updateTemp = (changeFactor) => {
  const tempDisplay = document.querySelector("#temperature");
  state.tempCount = state.tempCount + changeFactor
  tempDisplay.textContent = `${state.tempCount}`
  updateLandscapeColor()

};


const changeCity = (event, cityName) => {
  const cityNameDisplay = document.getElementById("city");
  state.cityName = cityName;
  cityNameDisplay.textContent = `Weather Report for the wonderful city ${state.cityName}`
}; 

const getWeatherCity = async (event) =>{
  
  // find lat and long of submitted city
  const city = document.querySelector("#cityName").value;
  const locationPath = "http://127.0.0.1:5000//location"
  const weatherPath = "http://127.0.0.1:5000//weather"
  const location = await axios
  .get(locationPath,{params:{   
    "q": city,
    }});
  const lat = location.data[0]["lat"]
  const lon = location.data[0]["lon"]
  
  // find weather in F at lat and long
  const weather = await axios
  .get(weatherPath,{params:{   
    "lat": lat,
    "lon": lon,
    }});
  const farenheit = Math.round((weather.data["main"]["temp"] - 273.15) * 9/5 + 32)
  
  // update temp
  updateTemp(farenheit-state.tempCount)
  }

  
const registerEventHandlers = (event) => {
  updateLandscapeColor()
  const increaseButton = document.querySelector("#increaseTemp");
  increaseButton.addEventListener("click",(event)=>updateTemp(1))
  const decreaseButton = document.querySelector("#decreaseTemp");
  decreaseButton.addEventListener("click",(event)=>updateTemp(-1))
  const changeCityInput = document.querySelector("#cityName");
  changeCityInput.addEventListener("input",(event) => changeCity(event, changeCityInput.value))
  const getWeatherButton = document.querySelector("#getWeather");
  getWeatherButton.addEventListener("click", getWeatherCity)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);


// // 
// const updateTemp = (event) => {
//   console.log(event.target.textContent)
//   const tempDisplay = document.querySelector("#temperature");
//   if (event.target.textContent === "Increase"){
//     console.log("hi Im increasing")
//     state.tempCount++;
//     tempDisplay.textContent = `${state.tempCount}`
//   } else if (event.target.textContent === "Decrease"){
//     console.log("hi Im decreasing")
//     state.tempCount--;
//     tempDisplay.textContent = `${state.tempCount}`
//   updateLandscapeColor()
//   }
// };