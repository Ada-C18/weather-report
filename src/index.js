//select HTML Elements 

const body = document.querySelector('body');
const searchBtn = document.getElementById('weather');
const farenheit = document.getElementById('farenheit');
const city = document.getElementById('city');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const emojis = document.getElementById('emojis');
const search = document.getElementById('search');
const sky = document.getElementById('sky');
const skyEmoji = document.querySelector('select');
const reset = document.getElementById('reset');

//dictionary for weather emojis
const weatherEmojis = {
    "Snow": `🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨`,
    "Mist": `🌫☁️🌧☂☁️😶‍🌫️🌫️☁️🌧️☂`,
    "Rain": `🌧🌈⛈☔️🌧💧⛈🌧🌦☔️💧🌧🌧`,
    "Haze": `😶‍🌫️🌁🌫😶‍🌫️🏭😷☁️🌁`,
    "Clouds": `☀️ 🌤️ ⛅️ 🌥️ 🌤️ ⛅️ 🌥️ ☁️`,
    "Sunny": `☀️☀️☀️☀️☀️☀️☀️☀️☀️`,
    "Smoke": `🚬😶‍🌫️🔥 🌫😶‍🌫️🏭😷🫁`,
    "Other": `🌈☀️ 🌤️ ⛅️ 🌥️ 🌤️ ⛅️ 🌥️ ☁️`
};


const getCoordinates = async function () {
    const coordinates = await axios.get(`http://localhost:5000/location?q=${search.value}`);
    const lat = coordinates.data[0].lat;
    const lon = coordinates.data[0].lon;
    return [lat, lon];
}

const getWeather = async function () {
    coordinates = await getCoordinates();
    const weather = await axios.get(`http://localhost:5000/weather?lat=${coordinates[0]}&lon=${coordinates[1]}`);
    return weather;
};

const getSkyData = async function () {
    const data = await getWeather();
    const weather = data.data.weather[0].main;
    return weather;
};

const displayData = async function () {
    const data = await getWeather();

    //display temperature
    const temperature = data["data"]["main"]["temp"];
    const tempToFarenheit = Math.round((temperature - 273.15) * 9 / 5 + 32);
    farenheit.innerHTML = tempToFarenheit;

    //display city and country name
    city.innerHTML = `${data["data"]["name"]}, ${data["data"]["sys"]["country"]}`;

    //display sky
    const skyWeather = await getSkyData();

    if (skyWeather in weatherEmojis) {
        sky.innerHTML = weatherEmojis[skyWeather];
    }
    else {
        sky.innerHTML = weatherEmojis["Other"];
    };

    //change temp color
    changeColor();
};

const changeColor = function () {
    const temp = farenheit.innerText;

    if (temp >= 85) {
        farenheit.style.color = '#BF360C';
        emojis.innerHTML = `🌵💀🐍☀️🦂💀🌵🌵☀️🐍🏜☀️🦂`;
    } else if (temp >= 60) {
        farenheit.style.color = '#3949AB';
        emojis.innerHTML = `🌸🌿🌼☀️🌷🌻🌿☀️☘️🌱_🌻🌷`;
    } else if (temp >= 45) {
        farenheit.style.color = '#F06292';
        emojis.innerHTML = `🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃`;
    } else if (temp <= 40) {
        farenheit.style.color = '#93C572';
        emojis.innerHTML = `🌲❄️⛄️🌲⛄️❄️🌲🍁🌲🌲⛄️❄️🌲`;
    }
}

const changeSky = function () {

    if (skyEmoji.value in weatherEmojis) {
        sky.innerHTML = weatherEmojis[skyEmoji.value];
    }
    else {
        sky.innerHTML = weatherEmojis["Other"];
    };
}

const defaultCity = function () {
    search.value = "New York";
    return displayData();
}


//event listeners 
searchBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    city.innerText = search.value;
    displayData();
    changeColor();

})

skyEmoji.addEventListener("change", changeSky);

increaseBtn.addEventListener("click", function (evt) {
    farenheit.innerHTML++;
    changeColor();
});

decreaseBtn.addEventListener("click", function (evt) {
    farenheit.innerHTML--;
    changeColor();
})

reset.addEventListener("click", defaultCity);

body.onload = defaultCity;


