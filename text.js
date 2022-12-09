const axios = require('axios');

const key = 'pk.25f0690c568d7d047af0b68159c9829a';

const API = 'https://us1.locationiq.com/v1/search.php';

const locations = [
  'Great Wall of China',
  'Petra',
  'Colosseum',
  'Chichen Itza',
  'Machu Picchu',
  'Taj Mahal',
  'Christ the Redeemer',
];
const locData = {};

const getInfo = (location) => {
  axios
    .get(API, { params: { key: key, q: location, format: 'json' } })
    .then((result) => {
      const lat = result.data[0].lat;
      const lon = result.data[0].lon;
      console.log(`${location} lat: ${lat} lon: ${lon}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPromise = (time) => {
  const timeoutTime = time * 1000;
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("It's go time!"), timeoutTime);
  });
  return myPromise;
};

for (let i = 0; i < locations.length; i++) {
  const location = locations[i];
  const currentPromise = getPromise((i + 1) * 5);
  currentPromise
    .then((value) => {
      getInfo(location);
    })
    .catch((error) => {
      console.log(error);
    });
}
