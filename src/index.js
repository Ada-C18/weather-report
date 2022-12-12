
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
const currentWeather = document.getElementById('current-weather');
const app = document.getElementById('weather-app');

//dictionary for weather emojis
const weatherImages = {
    "Snow": [`🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨`, 'url(https://images.unsplash.com/photo-1576678052826-04fd6590483f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNub3d5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60)'],
    "Mist": [`🌫☁️🌧☂☁️😶‍🌫️🌫️☁️🌧️☂`, 'url(https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=860&q=80)'],
    "Rain": [`🌧🌈⛈☔️🌧💧⛈🌧🌦☔️💧🌧🌧`, 'url(https://images.unsplash.com/photo-1503429134808-fdf0cd4e1bfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHJhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60)'],
    "Haze": [`😶‍🌫️🌁🌫😶‍🌫️🏭😷☁️🌁`, 'url(https://images.unsplash.com/photo-1571148433633-f62d3cdb5eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvbGx1dGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60)'],
    "Clouds": [`☀️ 🌤️ ⛅️ 🌥️ 🌤️ ⛅️ 🌥️ ☁️`, 'url(https://images.unsplash.com/photo-1524555259-3e4f9092f97b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsb3VkeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60)'],
    "Sunny": [`☀️☀️☀️☀️☀️☀️☀️☀️☀️`, 'url(https://images.unsplash.com/photo-1462524500090-89443873e2b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'],
    "Clear": [`☀️☀️☀️☀️☀️☀️☀️☀️☀️`, 'url(https://images.unsplash.com/photo-1462524500090-89443873e2b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'],
    "Smoke": [`🚬😶‍🌫️🔥 🌫😶‍🌫️🏭😷🫁`, 'url(https://images.unsplash.com/photo-1571148433633-f62d3cdb5eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvbGx1dGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60)'],
    "Fog": [`😶‍🌫️🌁🌫😶‍🌫️🏭😷☁️🌁`, 'url(https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60)'],
    "Other": [`🌈☀️ 🌤️ ⛅️ 🌥️ 🌤️ ⛅️ 🌥️ ☁️`, 'url(https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3ByaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60)']
};


const getCoordinates = async function () {
    const coordinates = await axios.get(`http://localhost:5000/location?q=${search.value}`);
    const lat = coordinates.data[0].lat;
    const lon = coordinates.data[0].lon;
    const name = coordinates.data[0].display_name;
    console.log(coordinates);
    return [lat, lon, name];
};

const getWeather = async function () {
    const coordinates = await getCoordinates();
    const weather = await axios.get(`http://localhost:5000/weather?lat=${coordinates[0]}&lon=${coordinates[1]}`);
    return weather;
};

const getSkyData = async function () {
    const data = await getWeather();
    const weather = data.data.weather[0].main;
    return weather;
};


const changeColor = () => {
    const temp = farenheit.innerText;

    if (temp >= 85) {
        farenheit.style.color = '#BF360C';
        emojis.innerHTML = `🌵💀🐍☀️🦂💀🌵☀️🐍🏜☀️🦂`;
    } else if (temp >= 60) {
        farenheit.style.color = '#F06292';
        emojis.innerHTML = `🌸🌿🌼☀️🌷🌻🌿☀️☘️🌱🌻🌷`;
    } else if (temp >= 45) {
        farenheit.style.color = 'orange';
        emojis.innerHTML = `🌾🌾🍃🪨🛤🌾🌾🌾🍃`;
    } else if (temp <= 40) {
        farenheit.style.color = "darkBlue";
        emojis.innerHTML = `🌲❄️⛄️🌲⛄️❄️🌲🍁🌲🌲⛄️❄️`;
    }
}

const changeSky = () => {

    if (skyEmoji.value in weatherImages) {
        sky.innerHTML = weatherImages[skyEmoji.value][0];
    }
    else {
        sky.innerHTML = weatherImages["Other"][0];
    };
}

const defaultCity = () => {
    search.value = "Atlanta";
    return displayData();
}

const displayData = async function () {
    const location = await getCoordinates();
    const data = await getWeather();

    //display temperature
    const temperature = data["data"]["main"]["temp"];
    const tempToFarenheit = Math.round((temperature - 273.15) * 9 / 5 + 32);
    farenheit.innerHTML = tempToFarenheit;

    //display city and country name
    //city.innerHTML = `${data["data"]["name"]}, ${data["data"]["sys"]["country"]}`;
    city.innerHTML = location[2];

    //display sky emojis
    const skyWeather = await getSkyData();

    if (skyWeather in weatherImages) {
        sky.innerHTML = weatherImages[skyWeather][0];
        body.style.background = weatherImages[skyWeather][1];
    }
    else {
        sky.innerHTML = weatherImages["Other"];
        body.style.background = weatherImages["Other"][1];
    };

    //display current weather
    currentWeather.innerHTML = skyWeather;

    //change temp color
    changeColor();
};


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


