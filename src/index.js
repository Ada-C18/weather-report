"use strict";


// ******* wave 2 *******
const defaultCity = "Seattle"
let number = parseInt(document.querySelector('.number').innerHTML);

const state = {number: number};
const stateChange = (number) => {
    if(number >= 80){
        document.querySelector('.number').style.color = "red";
        document.querySelector('.landscape').innerHTML = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    }else if(number >=70) {
        document.querySelector('.number').style.color = "orange";
        document.querySelector('.landscape').innerHTML = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if(number>=60) {
        document.querySelector('.number').style.color = "yellow";
        document.querySelector('.landscape').innerHTML = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if(number >=50) {
        document.querySelector('.number').style.color = "green";
        document.querySelector('.landscape').innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else {
        document.querySelector('.number').style.color = "teal";
        document.querySelector('.landscape').innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    };
};

const plus = document.querySelector('.plus_minus'),
  minus = document.querySelector('.minus_plus');
  
plus.addEventListener('click',() => {
    number++ ;
    document.querySelector('.number').innerHTML = number;
    stateChange(number);

});



minus.addEventListener('click',() => {
    number--; //also include when the api call is return 
    document.querySelector('.number').innerHTML = number;
    stateChange(number);

});
   



// let cityNameReset = document.getElementById("reset")
// cityNameReset.addEventListener("click", ) //this is for the reset button used for wave 6

// let intro = document.getElementById("intro")
// intro.innerHTML  = cityName.value;

// ******* wave 3 *******

let cityNameInsert = document.getElementById("cityNameInput");
cityNameInsert.addEventListener("input",(event) => {
    event.preventDefault();
    console.log("hello");
    let cityName = event.target.value; 
    document.getElementById("intro").innerHTML = cityName;
    console.log(cityName)
})


function getCityName(event){
    let cityName = document.getElementById("cityNameInput") ; 
    document.getElementById("intro").innerHTML = cityName.value;
    console.log(cityName)
    return cityName
}

// const resetCityName() =>{
//     document.getElementById("reset").addEventListener('click',() => {});

// }
// function getIntroCityName(){

// }
// let intro = document.getElementById("intro").innerHTML
// intro.addEventListener("change", getCityName);


// ******* wave 4 *******

const API = "http://127.0.0.1:5000/"

async function getTemperature(query) {
    let response = await axios.get(API + "location" + "?q=" + query);
    console.log(response)
    const lat= response.data[0].lat;
    const lon = response.data[0].lon;
    console.log(lat, lon)

    
    response = await axios.get(API + "weather" + "?lat=" + lat + "&lon=" + lon );
    const temp = response.data.main.temp
    const FarenheitTemp =  1.8*(temp-273) + 32
    console.log(FarenheitTemp)
    document.getElementById("number").innerHTML = Math.round(FarenheitTemp);
    number = Math.round(FarenheitTemp);
    state.number = Math.round(FarenheitTemp);
    stateChange(number);
}




let RealTime = document.getElementById("realTime")
RealTime.addEventListener("click", getRealTime)

function getRealTime() {
    let getCity = document.getElementById("cityNameInput").value;
    getTemperature(getCity);
    stateChange(state.number);
}


// ******* wave 5 *******

// const skyImageDisplay = document.querySelector('#skySelect')
//         btn.onclick = (event) => {
//             document.getElementById(skyImage)
//         };


// }
function displaySky() {
    let skyImageDisplay = document.getElementById("skySelect").value;
    document.getElementById("skyImage").innerHTML = skyImageDisplay
}



    
// ******* wave 6 *******

document.getElementById("reset").onclick = function() {
    const defaultCity = "Seattle"
    document.getElementById("intro").innerHTML = defaultCity;
    getTemperature(defaultCity);
    document.getElementById("cityNameInput").value = "";
 };
 