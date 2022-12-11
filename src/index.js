const apiKey = "e3610f266bfdfc8f526ab1e60d424c98";

const body = document.querySelector('body');
const searchBtn = document.getElementById('weather');
const farenheit = document.getElementById('farenheit');
const city = document.getElementById('city');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const emojis = document.getElementById('emojis');


const getLocation = function () {
    let locationArr = search.value.split(',');
    return locationArr;
};

const getWeatherData = async function () {
    let location = await getLocation();
    const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location[0]},${location[1]}&appid=${apiKey}`);
    return response;
};

const displayData = async function () {
    let data = await getWeatherData();
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
    displayData();
    changeColor();
});

increaseBtn.addEventListener("click", function (evt) {
    farenheit.innerHTML++;
    changeColor();
});

decreaseBtn.addEventListener("click", function (evt) {
    farenheit.innerHTML--;
    changeColor();
})



//{"coord":{"lon":-0.1257,"lat":51.5085},
//"weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], 
//"base": "stations", 
//"main": { "temp": 271.76, "feels_like": 271.76, "temp_min": 269.64, "temp_max": 273.01, "pressure": 1008, "humidity": 94 }, 
//"visibility": 6000, "wind": { "speed": 0.51, "deg": 0 }, "clouds": { "all": 7 }, 
//"dt": 1670714711, 
//"sys": { "type": 2, "id": 2075535, "country": "GB", "sunrise": 1670658898, "sunset": 1670687505 }, 
//"timezone": 0, 
//"id": 2643743, 
//"name": "London", 
//"cod": 200}