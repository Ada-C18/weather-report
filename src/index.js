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
//changing temperature color

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
  let input = cityInput.value;
  cityOutput.textContent = input;
});

// wave 4
// calling API

const getLatLon = (Input) => {
  axios
    .get(`http://127.0.0.1:5000/location?q=${Input}`)
    .then((response) => {
      const lat = response.data[0]['lat'];
      const lon = response.data[0]['lon'];
      getWeather(lat, lon);
      console.log(lat, lon);
    })
    .catch((error) => {
      console.log('Cannot find lat and lon', error);
    });
};

const getWeather = async (lat, lon) => {
  let currentTemp = await axios.get(
    `http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`
  );
  const tempKelvin = currentTemp.data.main.temp;
  const getTemp = Math.floor((tempKelvin - 273.15) * 1.8 + 32);
  tempValue.innerHTML = getTemp;
  count = tempValue.innerHTML;
  tempStyle();
};
let updateBtn = document.getElementById('button');

updateBtn.addEventListener('click', () => {
  let newCity = cityInput.value;
  getLatLon(newCity);
});

//wave 5
//change background

let skySelect = document.getElementById('skyId');
let backgroundId = document.getElementById('body');

skySelect.addEventListener('change', () => {
  if (skySelect.value === 'sunny') {
    backgroundId.style.backgroundImage =
      "url('ada-project-docs/engin-akyurt-zlGobrmAuyE-unsplash.jpg')";
  } else if (skySelect.value === 'rainy') {
    backgroundId.style.backgroundImage =
      "url('ada-project-docs/anant-jain-Bu1zj2WbjHE-unsplash.jpg')";
  } else if (skySelect.value === 'cloudy') {
    backgroundId.style.backgroundImage =
      "url('/ada-project-docs/tony-wallstrom-_nkcMamrvhU-unsplash.jpg')";
  } else if (skySelect.value === 'snowy') {
    backgroundId.style.backgroundImage =
      "url('/ada-project-docs/ant-rozetsky-H9m6mfeeakU-unsplash.jpg')";
  }
});

//wave 6

updateBtn.addEventListener('dblclick', () => {
  cityInput.value = 'Atlanta';
  cityOutput.textContent = 'Atlanta';
  getLatLon('Atlanta');
});
