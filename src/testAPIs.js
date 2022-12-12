const axios = require('axios');
//function to call location API
const findLatandLong = (city) => {
  let latitude, longitude;
  //get
  axios
    .get('http://127.0.0.1:5000/location', (config = { params: { q: city } }))

    //then
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      findWeather(latitude, longitude)
    })
    // //catch
    .catch((error) => {
      console.log('error missing fksdkf');
    })

    .finally(() => {
      let result = [latitude, longitude]
      return result
    });
};


// findLatandLong('Paris');


  //function to call GoodWeather API
  const findWeather = (latitude, longitude) => {

    let temperature;
    //get
    axios
      .get('http://127.0.0.1:5000/weather', (config = { params: { lat: latitude, lon: longitude } }))
  
      //then
      .then((response) => {
        temperature = response.data["main"]["temp"]
        temperature = Math.round(1.8*(temperature-273) + 32)
      })
      // //catch
      .catch((error) => {
        console.log('error in input');
      })
  
      .finally(() => {
        let temperatureAPI = temperature;
        console.log(temperatureAPI);
        return temperatureAPI;
      });
  };


