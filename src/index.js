
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

const increaseTemp = (event) => {
  const tempDisplay = document.querySelector("#temperature");
  state.tempCount = state.tempCount + 1;
  tempDisplay.textContent = `${state.tempCount}`
  updateLandscapeColor()

};


const decreaseTemp = (event) => {
  const tempDisplay = document.querySelector("#temperature");
  tempDisplay.textContent = `${state.tempCount--}`
  updateLandscapeColor()
};


const changeCity = (event, cityName) => {
  const cityNameDisplay = document.getElementById("city");
  state.cityName = cityName;
  cityNameDisplay.textContent = `Weather Report for the wonderful city ${state.cityName}`
}; 

const registerEventHandlers = (event) => {
  const increaseButton = document.querySelector("#increaseTemp");
  increaseButton.addEventListener("click",increaseTemp)
  const decreaseButton = document.querySelector("#decreaseTemp");
  decreaseButton.addEventListener("click",decreaseTemp)
  const changeCityInput = document.querySelector("#cityName");
  console.log(changeCityInput.value);
  changeCityInput.addEventListener("change",(event) => changeCity(event, changeCityInput.value))
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