// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// // API CALLS
// const axios = require('axios');
// let locationData, weatherData;
// let modifiedLocData, modifiedWeathData;
// console.log("hey! i sure think i'm down here!");

// axios
//   .get('http://127.0.0.1:5000/location', {
//     params: {
//       q: inputCity,
//       format: 'json',
//     },
//   })
//   .then((response) => {
//     locationData = response.data;

//     console.log('look at me! i should be using axios!');
//     const modifyLocation = (locationData) => {
//       let latlon = [];
//       let focusLocation = locationData[0];

//       let focusLat = Number(focusLocation['lat']);
//       let adjustLat = focusLat.toFixed(2);
//       latlon.push(adjustLat);

//       let focusLon = Number(focusLocation['lon']);
//       let adjustLon = focusLon.toFixed(2);
//       latlon.push(adjustLon);

//       return latlon;
//     };

//     modifiedLocData = modifyLocation(locationData);

//     axios
//       .get('http://127.0.0.1:5000/weather', {
//         params: {
//           lat: modifiedLocData[0],
//           lon: modifiedLocData[1],
//           format: 'json',
//         },
//       })
//       .then((response) => {
//         weatherData = response.data;

//         const modifyWeather = (weatherData) => {
//           let relevantData = [weatherData['main'], weatherData['weather']];
//           let defTempCond = [];

//           let unmodifiedTemp = relevantData[0]['temp'];
//           let tempF = ((unmodifiedTemp - 273.15) * 9) / 5 + 32;
//           let modifiedTemp = tempF.toFixed(0);
//           defTempCond.push(modifiedTemp);

//           let condID = Number(relevantData[1][0]['id']);
//           let idToCond = 'sunny';

//           if (condID > 800) {
//             idToCond = 'cloudy';
//           } else if (condID === 800) {
//             idToCond = 'sunny';
//           } else if (condID > 700) {
//             idToCond = 'cloudy';
//           } else if (condID > 599) {
//             idToCond = 'snowy';
//           } else {
//             idToCond = 'rainy';
//           }

//           defTempCond.push(idToCond);
//           return defTempCond;
//         };

//         modifiedWeathData = modifyWeather(weatherData);
//       })
//       .catch((error) => {
//         weatherData = 'An error has occured while fetching weather data.';
//       });
//   })
//   .catch((error) => {
//     locationData = 'An error has occured while fetching location data.';
//   });
