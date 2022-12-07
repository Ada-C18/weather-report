const cityNameFunction = () => {
  document.getElementById('city-input').value;
};

function skyFunction() {
  document.getElementById('skyDropdown').classList.toggle('show');
}

const registerEventHandlers = () => {
  // const cityNameInput = document.querySelector('#city-input');
  // cityNameInput.addEventListener()

  const skyOptionsButton = document.querySelector('#options-id');
  skyOptionsButton.addEventListener('click', skyFunction);
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
