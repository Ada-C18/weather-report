('use strict');

let decreaseBtn = document.getElementById('button_decrease');
let increaseBtn = document.getElementById('button_increase');
let tempValue = document.querySelector('.value');
let count = 0;
let weatherImg = document.getElementById('weather_image');
decreaseBtn.addEventListener('click', () => {
  count--;
  tempValue.innerHTML = count;
  tempStyle();
});
increaseBtn.addEventListener('click', () => {
  count++;
  tempValue.innerHTML = count;
  tempStyle();
});
//wave 2
//change temperature color

function tempStyle() {
  if (count >= 80) {
    tempValue.style.color = 'red';
    weatherImg.src = '/ada-project-docs/pngwing.com (6).png';
  } else if (count >= 70) {
    tempValue.style.color = 'orange';
    weatherImg.src = '/ada-project-docs/pngwing.com (3).png';
  } else if (count >= 60) {
    tempValue.style.color = 'yellow';
    weatherImg.src = '/ada-project-docs/pngwing.com (4).png';
  } else if (count >= 50) {
    tempValue.style.color = 'green';
    weatherImg.src = '/ada-project-docs/pngwing.com (5).png';
  } else {
    tempValue.style.color = 'teal';
    weatherImg.src = '/ada-project-docs/pngwing.com (7).png';
  }
}

//wave 3
// type city

let cityInput = document.getElementById('city_search');
console.log(cityInput);
let cityOutput = document.getElementById('weather_city');

cityInput.addEventListener('input', function () {
  var input = cityInput.value;
  cityOutput.textContent = input;
});
