const body = document.querySelector('body');
const searchBtn = document.getElementById('weather');
const farenheit = document.getElementById('farenheit');
const city = document.getElementById('city');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const emojis = document.getElementById('emojis');
const search = document.getElementById('search')


const getCoordinates = async function () {
    const cityInput = search.value;
    const coordinates = await axios.get(`http://localhost:5000/location?q=${cityInput}`);
    const lat = coordinates.data[0].lat;
    const lon = coordinates.data[0].lon;
    console.log(lat, lon);
    return [lat, lon];
}

const getWeather = async function () {
    const coordinates = await getCoordinates();
    console.log(coordinates[0], coordinates[1]);
    const weather = await axios.get(`http://localhost:5000/weather?lat=${coordinates[0]}&lon=${coordinates[1]}`);
    return weather;
};

// const getLocation = function () {
//     let locationArr = search.value.split(',');
//     return locationArr;
// };

// const getWeatherData = async function () {
//     let location = await getLocation();
//     const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location[0]},${location[1]}&appid=${apiKey}`);
//     return response;
// };

const displayData = async function () {
    const data = await getWeather();
    console.log(data);

    //display temperature
    const temperature = data["data"]["main"]["temp"];
    const tempToFarenheit = Math.round((temperature - 273.15) * 9 / 5 + 32);
    farenheit.innerHTML = tempToFarenheit;

    //display city and country name
    city.innerHTML = `${data["data"]["name"]}, ${data["data"]["sys"]["country"]}`;

};

const changeColor = function () {
    const temp = farenheit.innerText;
    if (temp >= 80) {
        farenheit.style.color = '#BF360C';
        emojis.innerHTML = `"🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"`;
    } else if (temp >= 70) {
        farenheit.style.color = '#3949AB';
        emojis.innerHTML = `"🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"`;
    } else if (temp >= 60) {
        farenheit.style.color = '#F06292';
        emojis.innerHTML = `"🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"`;
    } else if (temp >= 50) {
        farenheit.style.color = '#93C572';
        emojis.innerHTML = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
    } else {
        farenheit.style.color = "#7fffd4";
        emojis.innerHTML = `"🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"`;
    }
}


searchBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    city.innerText = search.value;
    displayData();
    changeColor();

})

// searchBtn.addEventListener("click", function (evt) {
//     evt.preventDefault();
//     displayData();
//     changeColor();
// });

increaseBtn.addEventListener("click", function (evt) {
    farenheit.innerHTML++;
    changeColor();
});

decreaseBtn.addEventListener("click", function (evt) {
    farenheit.innerHTML--;
    changeColor();
})



