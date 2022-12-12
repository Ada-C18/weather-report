"use strict";

//Do we need the code on line 5 below? I noticed it was commented out.

// const axios = require('axios')

let increaseBtn = document.getElementById("increaseBtn");
let decreaseBtn = document.getElementById("decreaseBtn");
let curTemp = document.getElementById("curTemp");
let city = document.getElementById("cityInput").value;
let realTimeBtn = document.getElementById("realTime");
let curWeatherEmojis = document.getElementById("curWeatherEmojis");
let counter = 0;

// I added and removed some things from state, but I'm not sure if we need it.
// I'm watching a roundtable video and Ansel is saying that what we've got above
// 'let...' is the preferred representation

// const state = {
//   city: "Portland",
//   curTemp: null,
//   sky: null,
//   lat: 45.5152,
//   lon: 122.6784,
// };

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

const cityName = () => {
  const city = document.getElementById("cityInput").value;
  document.getElementById("demo") = city;
};

function myFunction() {
  const x = document.getElementById("cityInput").value;
  document.getElementById("demo").innerHTML = x;
}

const getLatLon = (input) => {
  return axios.get("http://127.0.0.1:5000/location", {
    params: {
      q: input,
    }
  }).then((response)=>{
    const latitude = response.data[0].lat;
    const longitude = response.data[0].lon;

    console.log(latitude, longitude)
    
    getWeather(latitude, longitude)
    return {latitude, longitude}
}).catch((error) => {
    console.log("City not found")
  })
};

const result = getLatLon('Portland')

increaseBtn.addEventListener('click', ()=>{
  counter++;
  counterColor();
  weatherEmojis();
  bgWeatherMatch();
  curTemp.innerHTML = counter;
});

decreaseBtn.addEventListener('click', ()=>{
  counter--;
  counterColor();
  weatherEmojis();
  bgWeatherMatch();
  curTemp.innerHTML = counter;
});

const getWeather = (latitude, longitude) => {
  axios.get("http://127.0.0.1:5000/weather", {
    params: {
    lat: latitude,
    lon: longitude,
  }})
  .then((response) => {
    const tempInF = Math.floor((response.data.main.temp - 273.15) * (9/5) + 32);
    curTemp.innerHTML = tempInF
    counter = curTemp.innerHTML
    counterColor()
    console.log(tempInF);
    return temp
  })
  .catch((error) => {
    console.log("error no temperature found")
  })
};


const counterColor = () => {
  if (counter <= 30) {
  curTemp.className="purple";
  } else if (counter <= 49) {
  curTemp.className="cornflowerblue";
  } else if (counter <= 59) {
  curTemp.className="green";
  } else if (counter <= 69) {
  curTemp.className="yellow";
  } else if (counter <= 79) {
  curTemp.className="orange";
  } else {
  curTemp.className="red";
}};


const weatherEmojis = () => {
  if (counter <= 40) {
    curWeatherEmojis.textContent="❄️🥶❄️";
  } else if (counter <= 59) {
  curWeatherEmojis.textContent="🧤🧣🧤";
  } else if (counter <= 69) {
    curWeatherEmojis.textContent="✅✅✅";
  } else if (counter <= 79) {
    curWeatherEmojis.textContent="😅😎😅";
  } else {
    curWeatherEmojis.textContent="🔥🔥🔥";
}};


console.log(result)


// optional enhancement

const bgWeatherMatch = () => {
  if (counter <= 40) {
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/snow.png)";
  } else if (counter <= 59) {
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/rain.png)";
  } else if (counter <= 69) {
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/cloudy.png)";
  } else if (counter <= 90) {
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/sunshine.png)";
  } else {
    document.body.style.backgroundImage = "url(/ada-project-docs/assets/dry.png)";;
}};