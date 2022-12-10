
'use strict'
// Wave 2
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


// wave 3
//function same city on top: 
const newCity = () =>{
    let newTop = document.getElementById("input-city").value;
    document.getElementById('chosen-city').innerText = newTop
}

// wave 4
const findCity = () => {
axios
    .get('http://127.0.0.1:5000/location', {
    params: {
        q: `${city}`,
        }
    })
    .then((response) => {
        const searchResult = response.data[0];
        console.log(`lat ${searchResult.lat} lon ${searchResult.lat}`);
        // return { lat: searchResult.lat, lon: searchResult.lon};
        axios
        .get('http://127.0.0.1:5000/weather', {
        params: {lat: lat,lon: lon},
    })
        .then((response) => {
            const temp = Math.round(1.8 * (response.data.current.temp - 273) + 32);
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

// Wave 5
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
    document.getElementById('sky_icons').innerHTML = skyCloud(sky);

    document.getElementById('sky_selection').addEventListener('change', () => {
    const skyElement = document.getElementById('sky_selection').value;
    document.getElementById('sky_icons').innerHTML = skyCloud(skyElement);
    });
});

// wave 6
//function reset button:
const seattleAlways = () => {
    document.getElementById("input-city").value = "Seattle";
}