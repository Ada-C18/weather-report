console.log('hello world');

const findLocation = (query) => {
  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: query,
        format: 'json',
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });
};

if (document.readyState !== 'loading') {
  findLocation('Seattle');
} else {
  document.addEventListener('DOMContentLoaded', findLocation);
}
