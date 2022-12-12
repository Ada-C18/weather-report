'use strict';


const state = {
    city: 'Los Angeles',
    temperature: 76,
    lat:0.0,
    lon:0.0,
    };

const convertKtoF = (temp) => {
    return (temp - 273.15) * (9 / 5) + 32;
    };
const tempNumber = document.getElementById('temp-number');
tempNumber.textContent = `${state.temperature} °f`;
const gardColor=document.getElementById('gardenia');

//class="button" id="real-time">
//using this function to call the API 

const findLatLon=()=>{ 
    return axios
    .get('http://127.0.0.1:5000/location',
    { params:{
        q:document.getElementById('cit-name').value
    },

    })
    .then((response)=> {
    state.lat = response.data[0].lat;
    state.lon = response.data[0].lon; 
    weatherLatLon(state.lat,state.lon);
    })
    .catch((error) => {
    console.log('The value of error is:', error
    );
    }); 
};

const weatherLatLon = ()=>{
    return axios
    .get('http://127.0.0.1:5000/weather',
    { params:{
        lat:state.lat,
        lon:state.lon,
    }
    })
    .then((response)=> {
        const tempy= response.data.main.temp;
        const realtempy=document.getElementById('temp-number');
        console.log(tempy);
        state.temperature=Math.round(convertKtoF(tempy));
        realtempy.textContent=`${state.temperature}°f`;
    })
    .catch((error) => {
        console.log('The value of error is:', error);
    });


};



const changeSkyscape = () => {
    const skySelected = document.getElementById('sky-select').value;
    const skyscape = document.getElementById('skyscape');
    if (skySelected === 'sunny') {
    skyscape.textContent = '🌤🌤 🌤 🌤🌤 🌤 🌤 🌤 🌤🌤';
    } else if (skySelected === 'cloudy') {
    skyscape.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    } else if (skySelected === 'rainy') {
    skyscape.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    } else if (skySelected === 'snowy') {
    skyscape.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    }
};

const headerCity=document.getElementById('header-city-name');

const changeCity=()=>{
    const newCity=document.getElementById('cit-name').value;
    //const headerCity=document.getElementById('header-city-name');
    state.city=newCity;
    headerCity.textContent=`${state.city}`;
};


//const newnew=document.getElementById('reset-butt')
const resetCity = () => {
    const newnew=document.getElementById('cit-name')
    newnew.value = 'Los Angeles';
    changeCity();
};




const gardColorz=()=>{
    const tempz=state.temperature;
    if (tempz> 80) {
        gardColor.textContent='🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
    } else if (tempz > 70) {
        gardColor.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (tempz > 60) {
        gardColor.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (tempz > 50) {
        gardColor.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else {
        gardColor.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }


};


const tempColorz=()=>{
    const tempz=state.temperature;
    if (tempz> 80) {
        tempNumber.style.color = 'red';
    } else if (tempz > 70) {
        tempNumber.style.color = 'orange';
    } else if (tempz > 60) {
        tempNumber.style.color = 'yellow';
    } else if (tempz > 50) {
        tempNumber.style.color = 'green';
    } else {
        tempNumber.style.color = 'teal';
    }


};

const incTempNumber = () => {
    //console.log("anything")
    state.temperature += 1;
    tempNumber.textContent = `${state.temperature}° f`;
    tempColorz();
    gardColorz();
};
const decTempNumber = function () {
    state.temperature -= 1;
    tempNumber.textContent = `${state.temperature}° f`;
    tempColorz();
    gardColorz();
};



const registerEventHandlers = (event) => {
    const incTheTemp = document.getElementById('inc-temp');
    incTheTemp.addEventListener('click', incTempNumber);
    const decTheTemp = document.querySelector('#dec-temp');
    decTheTemp.addEventListener('click', decTempNumber);
    const tempColor=document.getElementById('temp-number');
    tempColor.addEventListener('click',tempColorz);
    const changeCt=document.getElementById('cit-name');
    changeCt.addEventListener('input',changeCity);
    const citcit=document.getElementById('reset-butt');
    citcit.addEventListener('click',resetCity);
    const newSky = document.getElementById('sky-select');
    newSky.addEventListener('change', changeSkyscape);
    const realtimeButton=document.getElementById('real-time');
    realtimeButton.addEventListener('click',findLatLon);

//const realtimeButton=document.getElementById('real-time')


};


document.addEventListener('DOMContentLoaded', registerEventHandlers);













