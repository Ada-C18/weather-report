"use strict";

// const registerEventHandlers = () => {
//     const increaseButton = document.querySelector("#increaseButton");
//     increaseButton.addEventListener("click", addCrab);


//     ocument.addEventListener("DOMContentLoaded", registerEventHandlers);

function incrementValue()
{
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}