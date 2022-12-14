// Accessing DOM/HTML Elements

const upArrow=document.getElementById("up-arrow");
const downArrow=document.getElementById("down-arrow");
const temperature=document.getElementById("temp");
const summer=document.getElementById("summer");
const spring=document.getElementById("spring");
const fall=document.getElementById("fall");
const winter=document.getElementById("winter");
const cityName=document.getElementById("city-name");
const userSearch=document.getElementById("city-search");
const callApiBtn=document.getElementById("real-temp-btn");
const resetCityBtn=document.getElementById("reset-btn");
const getWeatherBtn=document.getElementById("get-weather-btn");
const skyDropDown=document.getElementById('sky-dropdown');
const Sunny=document.getElementById('sunny');
const Snowy=document.getElementById('snowy');
const Rainy=document.getElementById('rainy');
const Cloudy=document.getElementById('cloudy');
const defaultSky=document.getElementById('default-sky');

// ---------------------------

let temp=0;
colors();
getApi();

function getApi() {
    let latitude;
    let longitude;
        axios
        .get(`http://127.0.0.1:5000/location?q=${userSearch.value}`)
        .then(function apiResponse(response) {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;

            axios
            .get(`http://127.0.0.1:5000/weather?&lat=${latitude}&lon=${longitude}`)
            .then((res) => {
                const fahrenheitConversion = Math.floor(
                ((res.data.main.temp - 273.15) * 9) / 5 + 32);
                temperature.textContent = fahrenheitConversion;
                temp = fahrenheitConversion;
                seasonChange()
                })
            })
            .catch((error) => {
                alert(error);
            })    
};

temperature.textContent = temp

function increment(){
    temp += 1;
    temperature.textContent=temp
    console.log(temp)
    colors()
    seasonChange()
};

function decrement(){
    temp -= 1;
    temperature.textContent=temp
    console.log(temp)
    colors()
    seasonChange()
};

function colors(){
    if (temp >= 90){
        temperature.style.color="#ab0000"
    }else if (temp <= 89 && temp >= 80){
        temperature.style.color="red"
    }else if (temp <= 79 && temp >= 70){
        temperature.style.color="orange"
    }else if (temp <= 69 && temp >= 60){
        temperature.style.color="green"
    }else if (temp <= 59 && temp >= 50){  
        temperature.style.color="#38f9cc"
    }else if (temp <= 49 && temp >= 40){  
        temperature.style.color="#378aea"
    }else if (temp <= 39 && temp >= 30){  
        temperature.style.color="blue"        
    }else {
        temperature.style.color="#1100ab"
    }           
};

function seasonChange(){
    if (temp >= 80){
        summer.style.display="flex"
        spring.style.display="none"
        fall.style.display="none"
        winter.style.display="none"
    }else if (temp >= 65){
        summer.style.display="none"
        spring.style.display="flex"
        fall.style.display="none"
        winter.style.display="none"
    }else if (temp >= 45){
        summer.style.display="none"
        spring.style.display="none"
        fall.style.display="flex"
        winter.style.display="none"
    }else if (temp <= 44){
        summer.style.display="none"
        spring.style.display="none"
        fall.style.display="none"
        winter.style.display="flex"
    }
};

// Func for users city search and display name
function displayInput() {
    cityName.textContent = userSearch.value;
}

function resetCity() {
    userSearch.value = 'Columbus';
    cityName.textContent = 'Columbus';
    getApi();
}

displayInput()
seasonChange()


// Function for getting value of sky/conditions dropdown
function dropdownValue() {
        console.log(skyDropDown.value);
        console.log('1');
    // if(skyDropDown.value === 'Select Conditions'){
    //     sunnySky.style.display = 'none';
    //     cloudySky.style.display = 'none';
    //     rainySky.style.display = 'none';
    //     snowSky.style.display = 'none';
    //     defaultSky.style.display = 'block';
    } if (skyDropDown.value === 'Sunny'){
        Sunny.style.display = 'block'
        Cloudy.style.display = 'none';
        Rainy.style.display = 'none';
        Snowy.style.display = 'none';
        defaultSky.style.display = 'none';
    } else if (skyDropDown.value === 'Rainy') {
        Sunny.style.display = 'none'
        Cloudy.style.display = 'none';
        Rainy.style.display = 'block';
        Snowy.style.display = 'none';
        defaultSky.style.display = 'none';
    } else if (skyDropDown.value === 'Cloudy') {
        Sunny.style.display = 'none'
        Cloudy.style.display = 'none';
        Rainy.style.display = 'none';
        Snowy.style.display = 'block';
        defaultSky.style.display = 'none';
    } else if (skyDropDown.value === 'Snowy') {
        Sunny.style.display = 'none';
        Cloudy.style.display = 'none';
        Rainy.style.display = 'none';
        Snowy.style.display = 'block';
        defaultSky.style.display = 'none';
    };

dropdownValue()

upArrow.addEventListener('click', increment);
downArrow.addEventListener('click', decrement);
resetCityBtn.addEventListener('click', resetCity);
getWeatherBtn.addEventListener('click', getApi);
userSearch.addEventListener('input', displayInput);
skyDropDown.addEventListener('change', dropdownValue);
