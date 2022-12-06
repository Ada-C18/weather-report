"use strict"
const state ={
  temputure : 70,
  landScape:"----"
}



let tempDisplay= document.getElementById("temp-display")

const registerEventHanlers=()=>{
  const tempUp= document.getElementById("temp-up-btn")
  tempUp.addEventListener("click")
  
  let tempDown= document.getElementById("temp-down-btn")
  tempDown.addEventListener("click")
}