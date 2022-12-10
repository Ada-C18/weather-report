"use strict";


let number = parseInt(document.querySelector('.number').innerHTML);
const plus = document.querySelector('.plus_minus'),
  minus = document.querySelector('.minus_plus');
  
plus.addEventListener('click',() => {
    number++ ;
    document.querySelector('.number').innerHTML = number;

    if(number >= 80){
        document.querySelector('.number').classList.add("burning");
        // document.querySelector('.number').className("burning");
        document.querySelector('.landscape').innerHTML = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    }else if(number >=70) {
        document.querySelector('.number').classList.add("hot");
        document.querySelector('.landscape').innerHTML = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if(number>=60) {
        document.querySelector('.number').classList.add("moderate")
        document.querySelector('.landscape').innerHTML = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if(number >=50) {
        document.querySelector('.number').classList.add("cold");
        document.querySelector('.landscape').innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else {
        document.querySelector('.number').classList.add("freezing");
        document.querySelector('.landscape').innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";

   }});



minus.addEventListener('click',() => {
    number--;
    document.querySelector('.number').innerHTML = number;

    if(number >= 80) {
        // document.querySelector('.number').className("burning");
        document.querySelector('.number').classList.add("burning");
        document.querySelector('.landscape').innerHTML = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if(number >=70) {
        document.querySelector('.number').classList.remove("burning");
        document.querySelector('.landscape').innerHTML = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if(number>=60) {
        document.querySelector('.number').classList.remove("hot");
        document.querySelector('.landscape').innerHTML = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if(number >=50) {
        document.querySelector('.number').classList.remove("moderate");
        document.querySelector('.landscape').innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }else {
        document.querySelector('.number').classList.remove("cold");
        document.querySelector('.landscape').innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
   }});


let cityNameReset = document.getElementById("reset")
cityNameReset.addEventListener("click", myFunction)


function myFunction() {
    let cityName = document.getElementById("cityName"); 
    document.getElementById("intro").innerHTML = cityName.value;
}

document.getElementById("intro").innerHTML = "☁️";

// document.querySelector('.burning').innerHTML = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";

// const axios = require("axios");

const locationAPI = "http://127.0.0.1:5000/location"


const findLatandLon = (query) => {
    let latitude, longitude;
    axios.get(locationAPI, 
    {
        params: {
            q: cityName,
            format : 'json'

        }

    })
    .then((response) => {
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;
        console.log('success', latitude, longitude);
    })
    .catch( (error) => {
        console.log('error in findLatitudeAndLongitude!');
    });
    return {
        seattleLat: latitude,
        seattleLon: longitude
      }
    };

findLatandLon("Seattle")

// const findTemperature = (latitude,longitude) =>{
//     let Fahrenheit = 1.8*(k-273) + 32
// }


//make weather nested inside location



// const weatherAPI = "http://127.0.0.1:5000/weather"
// // const locationAPI = "http://127.0.0.1:5000/location"



// const response_weather = axios.get(weatherAPI).then(response => {

// });
// const response_location = axios.get(locationAPI);