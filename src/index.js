
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

// wave 3
const updateCityName = () => {
    const cityElement = document.getElementById('chosen-city');
    const cityName = document.querySelector('#input-city').value;
    cityElement.innerText = cityName;

    setCity(cityName);
};

document.addEventListener('DOMContentLoaded', () => {
    const enterCityButton = document.getElementById('#enter-city-button');

    enterCityButton.addEventListener('click', () => {
    updateCityName();
    });
});


// wave 4
const findCity = (city) => {
axios
    .get('http://127.0.0.1:5000/location', {
    params: {
        q: city,
        format: 'json'
    },
    })
    .then((response) => {
        const searchResult = response.data[0];
        console.log(`lat ${searchResult.lat} lon ${searchResult.lat}`);
        return { lat: searchResult.lat, lon: searchResult.lon};
    })
    .then((coords) => {
        return axios.get('http://127.0.0.1:5000/weather', {
        params: {
            lat: coords.lat,
            lon: coords.lon,
        }
    });
    })
    .then((response) => {
        console.log('weather reponse', response.data)
    });
    // .catch((error) => {
    //     console.log('error in find information!');
    //     console.log(error);
    // });
}
