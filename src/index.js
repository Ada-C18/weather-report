
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



