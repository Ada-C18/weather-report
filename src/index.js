"use strict";
// const axios = require('axios')

let increaseBtn = document.getElementById("increaseBtn");
let decreaseBtn = document.getElementById("decreaseBtn");
let curTemp = document.getElementById("curTemp");
let curWeatherEmojis = document.getElementById("curWeatherEmojis")
let counter = 0;


increaseBtn.addEventListener('click', ()=>{
  counter++;
  console.log("increase clicked", counter)
  counterColor();
  weatherEmojis();
  curTemp.innerHTML = counter;
});

decreaseBtn.addEventListener('click', ()=>{
  counter--;
  console.log("decrease clicked", counter);
  counterColor();
  weatherEmojis();
  curTemp.innerHTML = counter;
});

const cityName = () =>{
  const city = document.getElementById("cityInput").value;
  document.getElementById("demo") = city;
  console.log('it works')

};

function myFunction() {
  const x = document.getElementById("cityInput").value;
  document.getElementById("demo").innerHTML = x;
}

const counterColor = () =>{
  if (counter <= 49) {
  curTemp.className="cornflowerblue";
  } else if (counter <= 59) {
    curWeatherEmojis.textContent="🧤🧣🧤";
    curTemp.className="green";
  } else if (counter <= 69) {
  curTemp.className="yellow";
  } else if (counter <= 79) {
    curTemp.className="orange";
  } else {
      curTemp.className="red";
}};


document.getElementById("curWeatherEmojis").addEventListener('change', (event) => {
  console.log("changed", event)
  const weValue = event.target.options[event.target.selectedIndex].value;
  if( weValue == 'cold' ) {
    document.curWeatherEmojis.style.css = cold;      
    } else if( weValue == "comfortable" ){
      document.body.style.backgroundImage = "url(/ada-project-docs/assets/cloudy.png)";      
    } else if( weValue == "balmy" ){
      document.body.style.backgroundImage = "url(/ada-project-docs/assets/rain.png)";      
    } else if( weValue == "hot" ){
      document.body.style.backgroundImage = "url(/ada-project-docs/assets/snow.png)";      
    }
  });


const weatherEmojis = () => {
  if (counter <= 59) {
  curWeatherEmojis.textContent="🧤🧣🧤";
  } else if (counter <= 69) {
  curWeatherEmojis.textContent="✅✅✅";
  } else if (counter <= 79) {
  curWeatherEmojis.className="balmy";
  } else {
  curWeatherEmojis.className="hot";
}};



document.getElementById("sky").addEventListener('change', (event) => {
  console.log("changed", event)  
  const bgValue = event.target.options[event.target.selectedIndex].value;
  console.log(bgValue)  
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

document.body.style.backgroundImage = "url('/ada-project-docs/assets/sunshine.png')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
// document.body.style.maskImage = linear-gradient(rgba(1, 1, 1, 1), transparent);


