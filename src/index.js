const state = {temperature: 65};
/////////////////// CHANGING LAND, TEMP, AND TEMP COLOR //////////////////
const tempValue = document.getElementById("tempValue");
const landType = document.getElementById("landscape");

const tempRange = num => {
    if (num < 50) {
        landType.innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
        return 'teal';
    } else if (num < 60) {
        landType.innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
        return 'green';
    } else if (num < 70) {
        landType.innerHTML = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
        return 'yellow';
    } else if (num < 80) {
        landType.innerHTML = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
        return 'orange';
    } else {
        landType.innerHTML = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
        return 'red';
    }
}

const upButton = document.getElementById('increaseTemp');
upButton.addEventListener('click', () => {
    tempValue.innerHTML = Number(tempValue.innerHTML) + 1;
    tempValue.style.color = tempRange(Number(tempValue.innerHTML));
});

const downButton = document.getElementById('decreaseTemp');
downButton.addEventListener('click', () => {
    tempValue.innerHTML = Number(tempValue.innerHTML) - 1;
    tempValue.style.color = tempRange(Number(tempValue.innerHTML));
});

//////////////////// CHANGING THE SKY TPE & BACKGROUND /////////////////////
const skyChoice = document.getElementById("sky");

const changeSky = (option) => {
    if (option === 'sunny') {
        skyChoice.innerHTML = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️"
        document.body.style.backgroundImage = "url('/images/hot_sun.jpg')"
    } else if (option === 'rainy') {
        skyChoice.innerHTML = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧"
        document.body.style.backgroundImage = "url('/images/rainy.jpg')"
    } else if (option === 'cloudy') {
        skyChoice.innerHTML = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️"
        document.body.style.backgroundImage = "url('/images/cloud.jpg')"
    } else if (option === 'snowy') {
        skyChoice.innerHTML = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
        document.body.style.backgroundImage = "url('/images/snowy_day.jpg')"
    }
};

skyDropdown = document.getElementById('sky-option');
skyDropdown.addEventListener('change', () => {
    console.log(changeSky(skyDropdown.value));
})

////////// UPDATING CITY ////////////////
const cityText = document.querySelector('#city-name');
const inputForm = document.forms['update-city'];
const updateCity = inputForm.addEventListener('submit', function(e){
    e.preventDefault();
    const inputValue = inputForm.querySelector('input[type="text"]').value;
    cityText.innerText = inputValue;
    console.log(cityText.innerHTML);
    getTempFromLocation(inputValue);
    tempValue.style.color = tempRange(Number(tempValue.innerHTML));

    // tempValue.innerHTML = temperature;
});


const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    cityText.innerHTML = 'San Francisco';
    tempValue.innerHTML = 65;
    landType.innerHTML = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    document.body.style.backgroundImage = "url('/images/blossoms.jpg')";
    skyChoice[0];
});


/////////////////////GET TEMP FOR LOCATION ////////////////////////
const getTempFromLocation = function(location) {
    let latitude, longitude;
    axios.get('http://127.0.0.1:5000/location',
    {
        params: {
            q: location
        }
    })
    .then( (response) => {
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;
        getWeatherData(latitude, longitude);
    })
    .catch( (error) => {
        console.log('error in getTempFromLocation!');
    });

};

const getWeatherData = (latitude, longitude) => {
    axios.get('http://127.0.0.1:5000/weather', {
        params: {
            lat: latitude,
            lon: longitude,
        }
    })
    .then( (response) => {
        let tempF = (response.data.main.temp - 273.15) * 9 / 5 + 32;
        console.log(Math.floor(tempF));
        temperature = Math.floor(tempF);
        tempRange(temperature);
        tempValue.innerHTML = temperature;
    })
    .catch(() => {
        console.log('error in getWeatherData');
    });
};