// API Calls
const getTemp = (location) =>{
    const getWeather = (lat,long) => {
        axios
        .get('http://127.0.0.1:5000/weather', {
            params: { 
                appid: '28eae06ca45c269fbcae1f2d082cf216',
                lat: lat,
                lon: long
            },},
        )
        .then(function (response) {
            let k = response.data['main']['temp'];
            let f = Math.floor((k-273.15)*1.8)+32;
            actualTempNumber.innerText=`It is currently ${f}° in ${location}.`;
            actualTempNumber.style.color='#FD069A';
            actualTempNumber2.innerText=`${f}°`;
        })
        .then(function(){
            console.log(f);
            return(f);
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    const getCoordinates = () => {
        axios
        .get('http://127.0.0.1:5000/location', {
            params: { 
                key: 'pk.3af299d6e0524830860d19ff1c6cc8bf',
                q: location,
                format: 'json'
            },},
        )
        .then(function (response) {
            let lat = response.data[0]['lat'];
            let lon = response.data[0]['lon'];
            getWeather(lat,lon);
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    getCoordinates()

    
}
// Element selectors
const upTempElement = document.querySelector("#up-temp");
const downTempElement = document.querySelector("#down-temp");
const desiredTemp = document.querySelector("#changing-number");
const desiredSky = document.querySelector(".sky");
const upSky = document.querySelector("#up-sky");
const downSky = document.querySelector("#down-sky");
const seasonElement = document.querySelector("#season-image");
const sunImage1 = document.querySelector("#sun1");
const sunImage2 = document.querySelector("#sun2");
const sunImage3 = document.querySelector("#sun3");
const userInput = document.querySelector("#user-input");
const userForm = document.querySelector("#user-form")
const cityName = document.querySelector("h1.city-banner");
const skySelect = document.querySelector("#sky-select");
const reset = document.querySelector("#reset");
const actualTempNumber = document.querySelector("#the-temp");
const actualTempNumber2 = document.querySelector("#ac-number")
const displayTempButton = document.querySelector("#display-temp");
// States
const state = {
    temperature: 75,
    sky: "Sunny",
}
// Events
const displayTemp = () => {
    if (userInput.value.length < 1){
        actualTempNumber.innerText="Please enter a city name.";
    }
    else {
        getTemp(userInput.value);
    }
    userInput.value='';
};
const displayComptonTemp = () => {
    getTemp("Compton, California");
    userInput.value='';
};
const decreaseSky = () => {
    if (state.sky == "Sunny"){
        state.sky = "Partly Cloudy";
        desiredSky.innerHTML = "Partly Cloudy";
    }
    else if (state.sky == "Partly Cloudy"){
        state.sky = "Cloudy";
        desiredSky.innerHTML = "Cloudy";
    }
    else if (state.sky == "Cloudy"){
        state.sky = "Rainy";
        desiredSky.innerHTML = "Rainy";
    }
    else if (state.sky == "Rainy"){
        state.sky = "Sunny";
        desiredSky.innerHTML = "Sunny";
    }
};
const increaseSky = () => {
    if (state.sky == "Sunny"){
        state.sky = "Rainy";
        desiredSky.innerHTML = "Rainy";
    }
    else if (state.sky == "Rainy"){
        state.sky = "Cloudy";
        desiredSky.innerHTML = "Cloudy";
    }
    else if (state.sky == "Cloudy"){
        state.sky = "Partly Cloudy";
        desiredSky.innerHTML = "Partly Cloudy";
    }
    else if (state.sky == "Partly Cloudy"){
        state.sky = "Sunny";
        desiredSky.innerHTML = "Sunny";
    }
};
const changeColor = (tempElement) => {
    if (state.temperature >= 80){
        tempElement.style.color = 'red';
    }  
    else if (state.temperature >= 70){
        tempElement.style.color = 'teal';
    }  
    else if (state.temperature >= 60){
        tempElement.style.color = '#ffdc07';
    }
    else if (state.temperature >= 50){
        tempElement.style.color = 'green';
    }
    else tempElement.style.color ='purple';
}
const increaseTemp = () => {
    if (state.temperature < 105){
        state.temperature += 1;
        desiredTemp.innerHTML = `${state.temperature}°`;
    }
    changeColor(desiredTemp);
};
const decreaseTemp = () => {
    if (state.temperature > -20){
        state.temperature -= 1;
        desiredTemp.innerHTML = `${state.temperature}°`;
    }
    changeColor(desiredTemp);
};
const changeSeason = () => {
    if (state.temperature <60){
        seasonElement.src="photos/winter.webp";
    }
    else if (state.temperature <70){
        seasonElement.src="photos/spring1.png";
    }
    else if (state.temperature <80){
        seasonElement.src="photos/summer1.png";
    }
    else if (state.temperature <90){
        seasonElement.src="photos/cactus.png";
    }
    else if (state.temperature <100) {
        seasonElement.src="photos/fire.png";
    }
    else {
        seasonElement.src="photos/thisisfine.png"
    }
};
const changeCity = () => {
    cityName.innerHTML = userInput.value;
}
const makeItPartlyCloudy = () => {
    sunImage1.src="photos/sun1.jpeg";
    sunImage2.src="photos/sun1.jpeg";
    sunImage3.src="photos/sun1.jpeg";
}
const makeItSunny = () => {
    sunImage1.src="photos/verySunny.png";
    sunImage2.src="photos/verySunny.png";
    sunImage3.src="photos/verySunny.png";
}
const makeItCloudy = () => {
    sunImage1.src="photos/clouds.png";
    sunImage2.src="photos/clouds.png";
    sunImage3.src="photos/clouds.png";
}
const makeItRainy = () => {
    sunImage1.src="photos/rain1.jpeg";
    sunImage2.src="photos/rain1.jpeg";
    sunImage3.src="photos/rain1.jpeg";
}
const changeSkyImage = () => {
    if (state.sky == "Partly Cloudy"){
        makeItPartlyCloudy();
    }
    if (state.sky == "Sunny"){
        makeItSunny();
    }
    if (state.sky =="Cloudy"){
        makeItCloudy();
    }
    if (state.sky =="Rainy"){
        makeItRainy();
    }
}
const changeSkyDropdown = () => {
    if(skySelect.value =="partly-cloudy"){
        makeItPartlyCloudy();
    }
    if(skySelect.value =="sunny"){
        makeItSunny();
    }
    if(skySelect.value =="cloudy"){
        makeItCloudy();
    }
    if(skySelect.value =="rainy"){
        makeItRainy();
    }
}
const resetInput = () => {
    cityName.innerHTML = "Compton, California";
    userInput.value='';
    skySelect.value="sunny";
    desiredSky.innerHTML="Sunny";
    makeItSunny();
    actualTempNumber2.innerText=displayComptonTemp();
}
// Event listeners
upTempElement.addEventListener("click", increaseTemp);
upTempElement.addEventListener("click", changeSeason);
downTempElement.addEventListener("click", decreaseTemp);
downTempElement.addEventListener("click", changeSeason);
upSky.addEventListener("click", increaseSky);
upSky.addEventListener("click", changeSkyImage);
downSky.addEventListener("click", decreaseSky);
downSky.addEventListener("click", changeSkyImage);
skySelect.addEventListener("change", changeSkyDropdown);
reset.addEventListener("click", resetInput);
displayTempButton.addEventListener("click", displayTemp);
userInput.addEventListener('input', changeCity);
userForm.addEventListener("submit", displayTemp);
window.addEventListener("load", displayComptonTemp);