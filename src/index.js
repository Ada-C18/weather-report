"use strict";

import axios from "axios"

// let tempValue = 71;

// API Calls

const getLocation = () =>{
    axios
    .get ('http://127.0.0.1:5000/locations'), {
        params:{
            params: {
            q: loc_query, 
            key: 'pk.54a2fbb7573000245e547f11b670d167', 
            format: 'json'
        }
    }
    .then (function(response){
        let lat = response.data[0]['lat']
        let lon = response.data[0]['lon']
    })
    .catch (function(error)
    console.error(error);
    })
}

const getWeather = (lat, lon) =>{
    axios
    .get ('http://127.0.0.1:5000/weather'), {
        params: {
            appid: '4f0138081ad5bd26b6a03604fa3b5b15', 
            lat: lat,
            lon: lon
        }
}
.then (function(response){
    let kelvinTemp = response.data["main"]["temp"];
    let farhTemp = kelvinTemp - 273.15 * 1.8 + 32;
// conversion from Kelvin to Fahrenheit
// variable.innerText = farhTemp 

})


// Element Selectors

const resetInput = () => {
    cityName.innerHTML = "Indianapolis, IN";
    userInput.value='';
    sky.Select.value="sunny";

    // helper function needed
    makeItSunny();
    actualTempNumber.innerText='';
}


