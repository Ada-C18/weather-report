let total_element = document.getElementById('Total');

function Add () {
  let total_value = parseInt(total_element.innerHTML);
  total_element.innerHTML = total_value + 1;
  let myTemp = total_value + 1;
  changeLandscape(myTemp);
}


function Subtract () {
  let total_value = parseInt(total_element.innerHTML);
  if (total_value == 0) return; 
  total_element.innerHTML = total_value - 1;
  let myTemp = total_value - 1;
  changeLandscape(myTemp);
}

function changeLandscape (temp) {
  if (temp >=80) {
    document.getElementById('landscape').innerHTML = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    document.getElementById('landscape').innerHTML = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    document.getElementById('landscape').innerHTML = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    document.getElementById('landscape').innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
}

function changeCityName () {
  let cityInput = document.getElementById('city').value;
  document.getElementById('displayCity').innerHTML = cityInput;
  return cityInput;
}


document.getElementById('Add').addEventListener('click', Add);

document.getElementById('Subtract').addEventListener('click', Subtract);

document.getElementById('city').addEventListener('input', changeCityName);


window.addEventListener("load", loadpage);
function cargaPagina() {
    var btn = document.getElementById("button1").addEventListener("click", changevalues);
}

function changevalues() {
    var inputName = document.getElementById("name");
    inputName.value = "Search City";
}

var x = document.getElementById("myText");


const findCityLatLon = () => {
  let city = changeCityName();
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: city
      }
    })
    .then((response) => {
      console.log(response.data);
      let lat = response.data[0].lat;
      let lon = response.data[0].lon;
      console.log(lat);
      console.log(lon);
      getTempWithLocation(lat, lon);
    })
    .catch((error) => {
      console.log('Error given back by the API response:', error);
    });
}

const getTempWithLocation = (lat, lon) => {
  axios
    .get('http://127.0.0.1:5000/weather', {
      params: {lat: lat, lon: lon
    }
    })
    .then((response) => {
      console.log(response.data);
      let kelvin = response.data['main']['temp'];
      console.log(kelvin);
      convertToFahrenheit(kelvin);
    })
    .catch((error) => {
      console.log('Error given back by the API response:', error);
    });
}

function convertToFahrenheit (kelvin) {
  let fahrenheit = Math.round((kelvin * (9/5)) - 459.67);
  console.log(fahrenheit);
  document.getElementById('Total').innerHTML = fahrenheit;
  changeLandscape(fahrenheit);
}

function changeSky () {
  let skyDisplay = document.getElementById('sky').value;
  console.log(skyDisplay);
  if (skyDisplay === 'sunny') {
    document.getElementById('skyHere').innerHTML = '😎🌞🌞😎🌞🌞😎';
  } else if (skyDisplay === 'cloudy') {
    document.getElementById('skyHere').innerHTML = '🌤🌤🌤🌤🌤🌤🌤🌤';
  } else if (skyDisplay === 'rainy') {
    document.getElementById('skyHere').innerHTML = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if (skyDisplay === 'snowy') {
    document.getElementById('skyHere').innerHTML = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
}
document.getElementById('getDisplayCityTemp').addEventListener('click', findCityLatLon);

document.getElementById('sky').addEventListener('change', changeSky);