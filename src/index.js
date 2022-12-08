// WAVE 2

const increaseTemp = () => {
  const increaseButton = document.getElementById('increase-temp');

  increaseButton.addEventListener('click', () => {
    const currentTemperature = document.getElementById('curr-temp');
    currentTemperature.innerHTML = parseInt(currentTemperature.innerHTML) + 1;
    tempcolor();
  });
};

const decreaseTemp = () => {
  const decreaseButton = document.getElementById('decrease-temp');

  decreaseButton.addEventListener('click', () => {
    const currentTemperature = document.getElementById('curr-temp');
    currentTemperature.innerHTML = parseInt(currentTemperature.innerHTML) - 1;
    tempcolor();
  });
};

const tempcolor = () => {
  const currentTemperature = document.getElementById('curr-temp');
  // Double check that how we can access background-image in grid-container class
  const gridContainer = document.querySelector('.grid-container');

  if (currentTemperature.innerHTML >= 80) {
    currentTemperature.className = 'temp-red';
    gridContainer.style.backgroundImage = 'url(../assets/desert-nicole-herrero.jpg)';
  } else if (currentTemperature.innerHTML >= 70) {
    currentTemperature.className = 'temp-orange';
    gridContainer.style.backgroundImage = 'url(../assets/tropical-alexis-antonio.jpg)';
  } else if (currentTemperature.innerHTML >= 55) {
    currentTemperature.className = 'temp-yellow';
    gridContainer.style.backgroundImage = 'url(../assets/green-field-anisur-rahman.jpg)';
  } else if (currentTemperature.innerHTML >= 40) {
    currentTemperature.className = 'temp-green';
    gridContainer.style.backgroundImage = 'url(../assets/fall-federica-galli.jpg)';
  } else if (currentTemperature.innerHTML <= 39) {
    currentTemperature.className = 'temp-teal';
    gridContainer.style.backgroundImage = 'url(../assets/winter-christiaan-huynen.jpg)';
  }
  // create event handler that watches the curr-temp and changes the color accordingly
  // 80+ is red (desert landscape)
  // 70-79 is orange (tropical landscape)
  // 55-69 is yellow (green field landscape)
  // 40-54 is green (fall landscape)
  // 39 and below is teal (winter landscape)
};

const setUp = () => {
  increaseTemp();
  decreaseTemp();
  tempcolor();
}

if (document.readyState !== 'loading') {
  increaseTemp();
  decreaseTemp();
  tempcolor();
} else {
  document.addEventListener('DOMContentLoaded', setUp);
}
