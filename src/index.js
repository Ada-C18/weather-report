console.log('hello world');
const cityNameLabel = document.getElementById('cityname');
const cityNameInput = document.getElementById('cityname-input');
const resetBtn = document.getElementById('reset-btn');

cityNameInput.addEventListener('change', (event) => {
  const value = event.target.value;
  console.log('change:', value);
  cityNameLabel.innerText = value;
});

resetBtn.addEventListener('click', () => {
  cityNameInput.value = '';
  cityNameLabel.innerText = 'City Name';
});

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
  findLocation('BeiJing');
} else {
  document.addEventListener('DOMContentLoaded', findLocation);
}
