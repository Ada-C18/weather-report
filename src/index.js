import axios from "axios";
// "use strict";

// still need to link to html! wave 1 content//


const tempText = document.getElementById("temperature");
console.log(tempText);

// const tempRange = tempText => {
//     if (tempText < 49) {
//         return 'teal';
//     } else if (tempText < 59) {
//         return 'green';
//     } else if (tempText < 69) {
//         return 'yellow';
//     } else if (tempText < 79) {
//         return 'orange';
//     } else {
//         return 'red';
//     }
// }

const upButton = document.getElementById("up-arrow");

upButton.addEventListener('click', function onClick(event){
    // tempText.value
    tempText.style.color = tempRange

})