// require('dotenv').config()
// console.log(process.env)

'use strict';
// get weather information

const getWeather = async (lat, long) => {
  const base = 'http://127.0.0.1:5000/weather';
  const query = `?lat=${lat}&lon=${long}`;

  const response = await axios.get(base + query);
  const data = await response.data
  // console.log("GET WEATHER INFO", response)
  // const data = await response.json();

  console.log("GET WEATHER INFO", data);
  return data;
};

// calling the lat and long

const getLatAndLong = async (city) => {
  // let lat, long;
  const base = 'http://127.0.0.1:5000/location';
  const query = `?q=${city}`;
  const response = await axios.get(base + query);
  const data =  await response.data[0];
  // const data = await response.json();
  // console.log("Response of lat&long", response)
  // const lat = response.data[0].lat;
  // const long =response.data[0].lon;
  // console.log("final is",lat,long)
  console.log("Data in lat&long is",data)
  return data;
  
};


// getLatAndLong('seattle')
//   .then((city) => {
//     console.log("GET LAT&LONG",city)
//     return getWeather(city.lat,city.lon);
//   })
//   .then((result) => {
//     console.log("Result is ", result);
//   }).catch((err) => console.log(err));




// getWeather('47.6038321', '-122.330062')

// const makeApiCallUsingAsync = async () => {
//     try {
//       const response = await axios.get('https://dog.ceo/api/breeds/list/all');
//       // Code which normally appears in the `then` block.
//       console.log(response.data);
//     } catch (error) {
//       // Code which normally appears in the `catch` block.
//       console.log(error);
//     }
//   };
