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
            
            });
        })
            .catch((error) => {
                alert(error);
        });    
}

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

function weatherChange(){
const sky=document.getElementsById("sunny");
const inputSky=document.getElementById('skySelect').value;
// const sunny=document.getElementById('card2').value;
// const cloudy=document.getElementsById("cloudy");
// const rainy=document.getElementsById("rainy");
// const snowy=document.getElementsById("snowy");
    if (inputSky===sky){
        sunny.style.display="flex"
        cloudy.style.display="none"
        rainy.style.display="none"
        snowy.style.display="none"
    }
};

// Func for users city search and display name
const displayInput = () => {
cityName.textContent = userSearch.value;
};

const resetCity = () => {
    userSearch.value='Columbus';
    cityName.textContent='Columbus';
    getApi();
};

displayInput()
seasonChange()

resetCityBtn.addEventListener('click', resetCity);
getWeatherBtn.addEventListener('click', getApi);
userSearch.addEventListener('input', displayInput);
upArrow.addEventListener('click', increment);
downArrow.addEventListener('click', decrement);

