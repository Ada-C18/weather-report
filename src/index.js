"use strict";


// make a color temp function
// const colorChangeByTemp =function(number) {


// } return color

let number = parseInt(document.querySelector('.number').innerHTML);
const plus = document.querySelector('.plus_minus'),
  minus = document.querySelector('.minus_plus');
  
plus.addEventListener('click',() => {
    number++ ;
    document.querySelector('.number').innerHTML = number;
    if(number >= 80){
        document.querySelector('.number').classList.add("burning")
    }else if(number >=70) {
        document.querySelector('.number').classList.add("hot")
    } else if(number>=60) {
        document.querySelector('.number').classList.add("moderate")
    } else if(number >=50) {
        document.querySelector('.number').classList.add("cold")
    } else {
        document.querySelector('.number').classList.add("freezing")

   }});


minus.addEventListener('click',() => {
    number--;
    document.querySelector('.number').innerHTML = number;
    if(number >= 80) {
        document.querySelector('.number').classList.add("burning")
    } else if(number >=70) {
        document.querySelector('.number').classList.remove("burning")
    } else if(number>=60) {
        document.querySelector('.number').classList.remove("hot");
    } else if(number >=50) {
        document.querySelector('.number').classList.remove("moderate")
    }else {
        document.querySelector('.number').classList.remove("cold")
   }});


let cityNameReset = document.getElementById("reset")
cityNameReset.addEventListener("click", myFunction)


function myFunction() {
    let cityName = document.getElementById("cityName"); 
    document.getElementById("intro").innerHTML = cityName.value;
}

document.getElementById("intro").innerHTML = "☁️"