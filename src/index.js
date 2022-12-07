//increases or decreases temperature from click
let currentTemp = 70;
const tempUp = () => {
  const tempValue = document.querySelector('#temp-value');
  currentTemp += 1;
  tempValue.innerHTML = currentTemp;
};

//Tatiana does down function
const tempDown = () => {};

//city input text updates city name
const cityName = document.getElementById('city-name');
const cityInput = document.getElementById('city-input');
const inputHandler = function (e) {
  cityName.innerHTML = e.target.value;
};

//sky drop down options
function skyFunction() {
  document.getElementById('skyDropdown').classList.toggle('show');
}

//register event handlers
const registerEventHandlers = () => {
  const skyOptionsButton = document.querySelector('#options-id');
  skyOptionsButton.addEventListener('click', skyFunction);

  cityInput.addEventListener('input', inputHandler);
  cityInput.addEventListener('propertychange', inputHandler);

  const tempUpButton = document.querySelector('#up-button');
  tempUpButton.addEventListener('click', tempUp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

//80+ 🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂
//70-79 🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷
//60-69 🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃
//59 or below 🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲

// Close the dropdown if the user clicks outside of it
// window.onclick = function (event) {
//   if (!event.target.matches('.dropbtn')) {
//     const dropdowns = document.getElementsByClassName('dropdown-content');
//     let i;
//     for (i = 0; i < dropdowns.length; i++) {
//       const openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// };
