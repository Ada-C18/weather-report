
'use strict'

const temperatureArrowColor = (temperature) => {
    if (temperature >= 80) {
        return 'red';
    } else if (temperature >= 70){
        return 'orange';
    } else if (temperature >= 60){
        return 'yellow';
    } else if (temperature >= 50){
        return 'green';
    } else {
        return 'teal';
    }
};

const seasonTheme = (temperature) => {
    if (temperature >= 80) {
        return `🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂`;
    } else if (temperature >= 70) {
        return `🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷`;
    } else if (temperature >= 60){
        return `🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃`
    } else {
        return `🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲`
    }
};

const temperatureChange = (temperature) => {
    document.getElementById('temperature_numbers').innerText = temperature;
    document.getElementById('temperature_numbers').style.color =
    temperatureArrowColor(temperature);
    document.getElementById('garden_icons').innerText =
    seasonTheme(temperature);
    // add the new  const (if statementes)
};
    document.addEventListener('DOMContentLoaded', () => {
    let temperature = 70;
    temperatureChange(temperature);
    document.getElementById('temp_go_up').addEventListener('click', () => {
        temperature += 1;
    temperatureChange(temperature);
    });
    document.getElementById('temp_go_down').addEventListener('click', () => {
        temperature -= 1;
    temperatureChange(temperature);
    });
});



const updateCityName = () => {
    const cityElement = document.getElementById('#chosen-city');
    const cityName = document.querySelector('#input-city').value;
    cityElement.innerText = cityName;

// wave 3


// const seattleAlways = () => {
//     document.getElementById("input-city").value = "Seattle";
// }


// const newCity = document.getElementById("enterCityButton");
// newCity.addEventListener("click", myFunction);

// // const cityName = document.querySelector('input-city').value;

// function myFunction(){
//     document.getElementById("lovelyName").innerHTML = "hello";
// } 

    
    // cityElement.innerText = cityName;

    // setCity(cityName);


// document.addEventListener('DOMContentLoaded', () => {
//     const enterCityButton = document.getElementById('#enter-city-button');

//     enterCityButton.addEventListener('click', () => {
//     updateCityName();
//     });
// });


// wave 4
const findCity = (city) => {
axios
    .get('http://127.0.0.1:5000/location', {
    params: {
        q: city,
        format: 'json'},
    })
    .then((response) => {
        const searchResult = response.data[0];
        console.log(`lat ${searchResult.lat} lon ${searchResult.lon}`);
        return { lat: searchResult.lat, lon: searchResult.lon};
    })
    .then((reponse) => {
        axios.get('http://127.0.0.1:5000/weather', {
        params: {
            lat:lat,
            lon:lon}
    })
            const tempKelvin = response.data.main.temp;
            StaticRange.temperature = Math.round(1.8 * (tempKelvin - 273) + 32;
            setTemperature(temp);
    })
        .catch((error) => {
            console.log('error getting temp');
            console.log(error)
        });
    })
    .catch((error) => {
        console.log('error in find information!');
        console.log(error);
    });
};


const skyCloud = (sky) => {
    if (sky == 'Sunny'){
        return `☁️ ☁️ ☁️ ☀️ ☁️ ☁️`;
    } else if(sky == 'Cloudy'){
        return `☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️`;
    } else if(sky == 'Rainy'){
        return `🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧`;
    } else {
        return `🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨`
    }
};
document.addEventListener('DOMContentLoaded', () => {
    let sky = 'Sunny';
    document.getElementById('sky-garden').innerHTML = skyCloud(sky);

    document.getElementById('sky-select').addEventListener('change', () => {
    const skyElement = document.getElementById('sky-select').value;
    document.getElementById('sky-garden').innerHTML = skyCloud(skyElement);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const resetCityButton = document.getElementById('resetCitybutton');
    setCity('Seattle');

    resetCityButton.addEventListener('click', () => {
    const defaultCity = 'Seattle';
    document.querySelector('#input-city').value = defaultCity;
    document.getElementById('chosen-city').innerText = defaultCity;
    setCity(defaultCity);
    });
});
