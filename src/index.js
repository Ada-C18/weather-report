'use strict';

const state = {
    tempValue: 62,
    tempFontColor: "goldenrod",
    nameOfCity: "Atlanta",
    weatherGarden: "🌷🌷🌷🌷",
    lat: 33.7489924,
    lon: -84.3902644,
    isF: true,
    weatherCondition: "Rain"
    
};

const tempValue = document.getElementById("tempValue");
tempValue.textContent = `${state.tempValue}° F`;
tempValue.style.color = state.tempFontColor;

const nameOfCity = document.getElementById("location-city");
nameOfCity.textContent = state.nameOfCity;

const weatherGarden = document.getElementById("weather-garden");
weatherGarden.textContent = state.weatherGarden;

const weatherCondition = document.getElementById("sky-display");
weatherCondition.textContent = state.weatherCondition;

const wrapper = document.querySelector(".wrapper");
const inputPart = wrapper.querySelector(".input-part");
const infoTxt = inputPart.querySelector(".info-txt");
const arrowBack = wrapper.querySelector("header i");
const inputField = document.getElementById("city-content");
const enterButton = document.getElementById("enter-button");


// >>>>>>>>>>>>>>>>>Functions to increase or decrease temperature<<<<<<<<<<<<<<<
const increaseTemp = () => {
    state.tempValue += 1;
    tempValue.textContent = `${state.tempValue}° F`;
    changeTempFontColor();
    changeWeatherGarden();  

};

const decreaseTemp = () => {
    state.tempValue -= 1;
    tempValue.textContent = `${state.tempValue}° F`;
    changeTempFontColor();
    changeWeatherGarden(); 
    
};
// >>>>>>>>>>Function to determine color of the temperature font<<<<<<<<<<
const changeTempFontColor = () =>   {
    if (state.tempValue >= 80) {
        state.tempFontColor = "red";
        tempValue.style.color = state.tempFontColor;
    } else if (state.tempValue >= 70 & state.tempValue < 80)  {
        state.tempFontColor = "rgba(246, 94, 7, 0.95)";
        tempValue.style.color = state.tempFontColor;
    } else if (state.tempValue >= 60 & state.tempValue < 70) {
        state.tempFontColor = "rgb(218, 165, 32)";
        tempValue.style.color = state.tempFontColor;
    } else if (state.tempValue >= 50 & state.tempValue < 60) {
        state.tempFontColor = "rgb(15, 102, 15)";
        tempValue.style.color = state.tempFontColor;
    } else if (state.tempValue >= 40 & state.tempValue < 50) {
        state.tempFontColor = "blue";
        tempValue.style.color = state.tempFontColor;
    } else if (state.tempValue < 40) {
        state.tempFontColor = "lightblue";
        tempValue.style.color = state.tempFontColor;
    }
};
// >>>>>>>>>>>>>>function to change weather garden<<<<<<<<<<<<<<<<<<
const changeWeatherGarden = () => {
    if (state.tempValue >= 80) {
        state.weatherGarden = "🌴🌴🔥🔥";
        weatherGarden.textContent = state.weatherGarden;
    } else if (state.tempValue >= 60 & state.tempValue < 80) {
        state.weatherGarden = "🌷🌷🌸🌸";
        weatherGarden.textContent = state.weatherGarden;
    } else if (state.tempValue >= 40 & state.tempValue < 60) {
        state.weatherGarden = "🍁🍁🍂🍂";
        weatherGarden.textContent = state.weatherGarden;
    } else if (state.tempValue < 40) {
        state.weatherGarden = "🥀🥀🌲🌲";
        weatherGarden.textContent = state.weatherGarden;
    }
};

// >>>>>>>>>>>>>function to change sky image<<<<<<<<<<<<<<<<<<<<<
const selectSky = () => {
    const skyIcon = document.getElementById("weather-icon");
    const skyValue = document.getElementById("skySelect").value;
    const skyDisplay = document.getElementById("sky-display");

    if(skyValue === "Sunny" || weatherCondition.textContent === "Clear") {
        state.skyIcon = "src/icons/clear.svg";
        skyIcon.src = state.skyIcon;
        skyDisplay.textContent = skyValue.value;

    } else if (skyValue === "Cloudy" || weatherCondition.textContent === "Clouds") {
        state.skyIcon = "src/icons/cloud.svg";
        skyIcon.src = state.skyIcon;
    }  else if (skyValue === "Foggy" || weatherCondition.textContent === "Mist") {
        state.skyIcon = "src/icons/haze.svg";
        skyIcon.src = state.skyIcon;
    } else if (skyValue === "Rain" || weatherCondition.textContent=== "Rain") {
        state.skyIcon = "src/icons/rain.svg";
        skyIcon.src = state.skyIcon;
    } else if (skyValue === "Snowy" || weatherCondition.textContent === "Snow"){
        state.skyIcon = "src/icons/snow.svg";
        skyIcon.src = state.skyIcon;
    } else if (skyValue === "Stormy" || weatherCondition.textContent === "Thunderstorm") {
        state.skyIcon = "src/icons/storm.svg";
        skyIcon.src = state.skyIcon;
    }
}; 

// Function to change city input
// const inputCity = (e) => {
//     state.nameOfCity = e.target.value;
//     nameOfCity.textContent = state.nameOfCity;{
//         console.log(nameOfCity.textContent);
//     }
// };

const inputCity  = () => {
    nameOfCity.textContent = inputField.value;
    state.nameOfCity = nameOfCity.textContent;
}
// >>>>>>>>>>>>>>>>Registering Event Handlers<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const registerEventHandlers = () => {
    const upButton = document.getElementById("increase-temp-control");
    upButton.addEventListener("click", increaseTemp);

    const downButton = document.getElementById("decrease-temp-control");
    downButton.addEventListener("click", decreaseTemp);

    const skySelect = document.getElementById("skySelect");
    skySelect.addEventListener("change", selectSky);

    enterButton.addEventListener("click", inputCity);
    getLocation();
    wrapper.classList.add("active");

    arrowBack.addEventListener("click", () => {
        wrapper.classList.remove("active");
    });

    // enterButton.addEventListener("click", () =>{
    //     wrapper.classList.add("active")
    //     nameOfCity.textContent = inputField.value;
    //     state.nameOfCity = nameOfCity.textContent;
    //     getLocation();
    // });
    
    inputField.addEventListener("keyup", e =>{
        // if user pressed enter btn and input value is not empty
        if(e.key === "Enter" && inputField.value != ""){
            nameOfCity.textContent = inputField.value;
            state.nameOfCity = nameOfCity.textContent;
            getLocation();
            wrapper.classList.add("active")
        }
    });
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);


// >>>>>>>>>>>>>>>>>>>>>>>>Calling the APIs<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// calling the LocationIQ api
const getLocation = () => {

    axios
        .get("http://localhost:5000/location", {
            params: {q: state.nameOfCity},
        })
        .then((response) => {
            const data = response.data[0];
            state.lat = data.lat;
            state.lon = data.lon;
            nameOfCity.textContent = data.display_name;
            getWeather();
            console.log(`success in getLocation! lat: ${state.lat} and lon: ${state.lon}`);
        })
        .catch((error) => {
            console.log("error!", error);
        });
};

//  calling the OpenWeather api
const getWeather = () => {
    axios
        .get("http://localhost:5000/weather", {
            params: {lat: state.lat, lon: state.lon},
        })
        .then((response) => {
            const kTempValue = response.data.main.temp;
            state.tempValue = kToF(kTempValue);
            tempValue.textContent = `${state.tempValue}° F`;
            weatherCondition.textContent = response.data.weather[0].main;
            changeTempFontColor();
            changeWeatherGarden();
            selectSky();
            
            console.log(`success in getWeather! ${tempValue.textContent}`);

        })
        .catch((error) => {
            console.log("error!", error);
    });
};

// convert kelvin to F
const kToF = (k) => {
    if (state.isF) {
        const conversion = (k - 273.15) * (9/5) + 32;
        return Math.round(conversion);    
    }  else if (!state.isF) {
        conversion = k - 273.15;
        return Math.round(conversion);
    }
};