// --------------------------------wave2  Increase and Decrease Temperature----------------------
// Select increment and decrement buttons
const increaseElement = document.getElementById('up');
const decreaseElement = document.getElementById('down');
// Select total count
const totalCount = document.getElementById('totalCount');
// Variable to track count
let count = 49;
// Display initial count value
totalCount.innerHTML = count;
// Function to increment/decrement count
const handleIncrease = () => {
  count++;
  totalCount.innerHTML = count;
  checkTemperatureRange(Number(totalCount.innerText));
};

const handleDecrease = () => {
  count--;
  totalCount.innerHTML = count;
  checkTemperatureRange(Number(totalCount.innerText));
};

// Add click event to buttons
increaseElement.addEventListener('click', handleIncrease);
decreaseElement.addEventListener('click', handleDecrease);
// Temperature Ranges Change
const gardenPicture = document.getElementById('gardenPicture');
const checkTemperatureRange = (countValue) => {
  if (49 <= countValue && countValue < 50) {
    document.body.style.backgroundColor = 'teal';
    gardenPicture.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (50 <= countValue && countValue < 59) {
    document.body.style.backgroundColor = 'green';
    gardenPicture.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (60 <= countValue && countValue < 69) {
    document.body.style.backgroundColor = 'yellow';
    gardenPicture.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (70 <= countValue && countValue < 79) {
    document.body.style.backgroundColor = 'orange';
    gardenPicture.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (80 <= countValue) {
    document.body.style.backgroundColor = 'red';
    gardenPicture.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};
// toggle celsius and fahrenheit

// --------------------------------wave3 Naming the City----------------------
console.log('hello world');
const cityNameLabel = document.getElementById('cityname');
const cityNameInput = document.getElementById('cityname-input');
const resetBtn = document.getElementById('reset-btn');

cityNameInput.addEventListener('change', (event) => {
  const value = event.target.value;
  console.log('change:', value);
  cityNameLabel.innerText = value;
});

resetBtn.addEventListener('click', () => {
  cityNameInput.value = '';
  cityNameLabel.innerText = 'City Name';
});
// --------------------------------------wave4 Calling APIs-------------------
const findLocation = (query) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: query,
        format: 'json',
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });
};
// JS brower connect
if (document.readyState !== 'loading') {
  findLocation('BeiJing');
} else {
  document.addEventListener('DOMContentLoaded', findLocation);
}
