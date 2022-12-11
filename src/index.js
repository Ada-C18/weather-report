
const tempValue = document.getElementById("tempValue");
const landType = document.getElementById("landscape");

const tempRange = num => {
    if (num < 50) {
        landType.innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
        return 'teal';
    } else if (num < 60) {
        landType.innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
        return 'green';
    } else if (num < 70) {
        landType.innerHTML = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
        return 'yellow';
    } else if (num < 80) {
        landType.innerHTML = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
        return 'orange';
    } else {
        landType.innerHTML = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
        return 'red';
    }
}

const upButton = document.getElementById('increaseTemp');
upButton.addEventListener('click', () => {
    tempValue.innerHTML = Number(tempValue.innerHTML) + 1;
    tempValue.style.color = tempRange(Number(tempValue.innerHTML));
});

const downButton = document.getElementById('decreaseTemp');
downButton.addEventListener('click', () => {
    tempValue.innerHTML = Number(tempValue.innerHTML) - 1;
    tempValue.style.color = tempRange(Number(tempValue.innerHTML));
});


////////// UPDATING CITY ////////////////
const cityText = document.querySelector('#city-name');
const inputForm = document.forms['update-city'];
const updateCity = inputForm.addEventListener('submit', function(e){
    e.preventDefault();
    const inputValue = inputForm.querySelector('input[type="text"]').value;
    cityText.innerText = inputValue;
});

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    cityText.innerHTML = 'San Francisco';
});



//////////// changing background ////////////
// https://code.likeagirl.io/js-set-a-background-using-code-1cc26cf96ce4

// const images = {
//     sun: "url('/images/hot_sun.jpg')",
//     rain: "url('/images/rainy.jpg')",
//     clouds: "url('/images/cloud.jpg')",
//     blossoms: "url('/images/blossoms.jpg')",
//     snow: "url('/images/snowy.jpg')",
//     poppy: "url('/images/orange_flowers.jpg')"
// };

// const setBackground = (image) => {
//     document.body.style.background = images[image];
// };

// const skyType = document.getElementById('sky');
// console.log(skyType);
// skyType[0].addEventListener('click', e => {
//     if (skyType.innerText === 'Sunny') {
//         console.log('sunny');
//         // return setBackground('rain');
//     }
// });


// let latitude;
// let longitude;
const getWeatherFromLocation = async function(location) {
    axios.get('http://127.0.0.1:5000/location', {
        params: {
            q: location
        }
    })
    .then(function (response) {
        let latitude = response.data[0].lat;
        let longitude = response.data[0].lon;
        console.log(latitude, longitude);
        
        // console.log(temp);
    })
    .then((data) => {
        console.log(data);
        // console.log(getWeatherData(latitude,longitude));
    })
};

getWeatherFromLocation('San Francisco')

const getWeatherData = (latitude, longitude) => {
    axios.get('http://127.0.0.1:5000/weather', {
        params: {
            lat: latitude,
            lon: longitude,
            units: 'imperial'
            // units: fahrenheit
            
        }
    })
    .then(function (response) {
        // let tempK = response.data.main.temp
        console.log(response.data.main.temp);
        // let tempF = (tempK - 273.15) * 9 / 5 + 32;
        // console.log(tempF);
        // return response.data.main.temp;
    })
    .catch((err) => console.log(err))
};
