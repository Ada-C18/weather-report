const state = {
  sky: "sunny",
  temperature: 50,
  city: "",
};

// make testing between ranges easier
const temperatureChangeStep = 10;

//obtain reference sto all elements on the page
const elTemperature = document.querySelector("#temperature");
const elIncreaseTemp = document.querySelector("#increaseTemp");
const elDecreaseTemp = document.querySelector("#decreaseTemp");
const elLandscape = document.querySelector("#landscape");
const elCity = document.querySelector("#city");
const elCityInput = document.querySelector("#cityInput");
const elCityReset = document.querySelector("#cityReset");
const elCitySearch = document.querySelector("#citySearch");
const elSky = document.querySelector("#sky");
const elSkyInput = document.querySelector("#skyInput");

// event handlers to intercept user interactions
elSkyInput.addEventListener("change", (event) => {
  setSky(event.target.value);
});
elCityInput.addEventListener("input", (event) => {
  setCity(event.target.value);
});
elCityReset.addEventListener("click", (event) => {
  setCity("");
  elCityInput.focus();
});
elCitySearch.addEventListener("click", (event) => {
  // disable to prevent multiple requests
  elCitySearch.disabled = true;
  elCityReset.disabled = true;

  // use lowercase for better UX
  const city = state.city.trim().toLowerCase();

  console.log("search!", city);
  fetchWeatherData(city)
    .then((data) => {
      setTemperature(data.degrees);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      // disable to prevent multiple requests
      elCitySearch.disabled = false;
      elCityReset.disabled = false;
    });
});
elIncreaseTemp.addEventListener("click", (event) => {
  increaseTemp(event.target.value);
});
elDecreaseTemp.addEventListener("click", (event) => {
  decreaseTemp(event.target.value);
});

// functions that render state to the screen
const renderSky = () => {
  const sky = state.sky;
  let skyScape = "unknown";

  if (sky === "sunny") skyScape = "☀️";
  else if (sky === "cloudy") skyScape = "☁️";
  else if (sky === "rainy") skyScape = "🌧";
  else if (sky === "snowy") skyScape = "🌨";

  elSky.innerText = skyScape;
};
const renderTemperature = () => {
  elTemperature.innerText = state.temperature;

  const temp = state.temperature;
  let color = "teal";
  let landscape = "❄️❄️❄️❄️❄️";

  if (temp >= 80) {
    color = "red";
    landscape = "🔥🔥🔥🔥🔥";
  } else if (temp >= 70) {
    color = "orange";
    landscape = "😊😊😊😊😊";
  } else if (temp >= 60) {
    color = "yellow";
    landscape = "🌷🌷🌷🌷🌷";
  } else if (temp >= 50) {
    color = "green";
    landscape = "🐿🐿🐿🐿🐿";
  }

  elTemperature.style.color = color;
  elLandscape.innerText = landscape;
};
const renderCity = () => {
  elCity.innerText = state.city;
  elCityInput.value = state.city;
};

//setters for changing state and calling respective rendering functions
const setSky = (value) => {
  state.sky = value;
  renderSky();
};
const setTemperature = (value) => {
  state.temperature = value;
  renderTemperature();
};
const setCity = (value) => {
  state.city = value;
  renderCity();
};

const fetchWeatherData = (city) => {
  const data = mockData[city];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(data);
      } else {
        reject("The city was not found");
        // show error in UI
      }
    }, MOCK_API_DELAY);
  });
};

// action functions
const increaseTemp = () => {
  setTemperature(state.temperature + temperatureChangeStep);
};
const decreaseTemp = () => {
  setTemperature(state.temperature - temperatureChangeStep);
};

// init - render all state first
renderSky();
renderTemperature();
renderCity();

// tests
// setTemperature(60)
// setCity('Quebec')

// const updateTempColor = (temperature) => {
//   const tempValueContainer = document.getElementById("temperature");
//   let color = "teal";
//   if (temperature >= 80) {
//       color = "red";
//   } else if (temperature >= 70) {
//       color = "orange";
//   } else if (temperature >= 60) {
//       color = "yellow";
//   } else if (temperature >= 50) {
//       color = "green";
//   }
//   tempValueContainer.classList = color;
// }

// const updateCityName = () => {
//   const inputName = document.getElementById("search-city").value;
//   const headerCityName = document.getElementById("headerCityName");
//   headerCityName.textContent = inputName;
// };

// const resetCityName = () => {
//   const search-city = document.getElementById("search-city");
//   seach-city.value = "Denver";
//   updateCityName();
// };