document.querySelector("#tempUp").onclick = function () {
    const temp = document.querySelector("#tempVisual");
    temp.textContent++;
    changeTempAndLand(temp.innerHTML);
};

document.querySelector("#tempDown").onclick = function () {
    const temp = document.querySelector("#tempVisual");
    temp.textContent--;
    changeTempAndLand(temp.innerHTML);
};

const changeTempAndLand = (temp) => {
    let color = 'green';
    let landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';

    const tempColor = document.querySelector("#tempVisual");
    const landscapeType = document.getElementById("landscape");

    if (temp > 80) {
        color = 'red';
        landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (temp > 70) {
        color = 'orange';
        landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (temp > 60) {
        color = 'yellow';
        landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (temp > 50) {
        color = 'green'
        landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else {
        color = 'teal';
        landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }

    tempColor.style.color = color;
    landscapeType.textContent = landscape;
};

const state = {
    city: 'Los Angeles',
    lat: 34.0536909,
    lon: -118.242766,
    temp: 53
};

const newCity = document.getElementById("cityNameInput");

state.city = String(newCity.innerHTML);

const changeCityBtn = document.getElementById("search");
const resetBtn = document.getElementById("cityReset")
const cityTitle = document.getElementById("headerCity");


const changeCityByInput = () => {
    cityTitle.innerHTML = newCity.value;
};


// changeCityByInput();

changeCityBtn.addEventListener("click", changeCityByInput);


const weatherReport = () => {
    axios
        .get('http://127.0.0.1:5000/weather', {
            params: {
                lat: state.lat,
                lon: state.lon,
            },
        })
        .then((response) => {
            // const weather = response.data;
            const weather = response.data['main']['temp'];
            // state.temp = weather.main.temp;
            // console.log(state.temp)
            console.log(weather);
            document.getElementById("tempVisual").innerText = Math.round(weather);
            changeTempAndLand(weather);

        })
};


const getLatAndLong = () => {
    axios
        .get('http://127.0.0.1:5000/location',
            {
                params: {
                    q: state.city
                }
            })
        .then((response) => {
            console.log(response.data);
            state.lat = response.data[0].lat;
            state.lon = response.data[0].lon;
            // state.city = document.getElementById('cityNameInput').textContent
            weatherReport();
        })
};


changeCityBtn.addEventListener("click", weatherReport);

const changeSky = () => {
    const skyOptions = document.getElementById('skyOptions').value;
    const skyContainer = document.getElementById('sky');

    let sky = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️ ☁️'
    let skyColor = '';
    if (skyOptions === 'Cloudy') {
        sky = '☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
        skyColor = 'cloudy';
    } else if (skyOptions === 'Sunny') {
        sky = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️ ☁️';
        skyColor = 'sunny';
    } else if (skyOptions === 'Rainy') {
        sky = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
        skyColor = 'rainy';
    } else if (skyOptions === 'Snowy') {
        sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
        skyColor = 'snowy';
    }
    skyContainer.textContent = sky;
    // const gardenContent = document.getElementById('gardenContent');
    // gardenContent.classList = `garden__content ${skyColor}`;
};

const inputSky = document.getElementById('skyOptions');
inputSky.addEventListener('change', changeSky);

function clearResult() {
    document.getElementById("cityReset").value = ''
};