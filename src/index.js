// debugger;
let temp = 75;

const updateTemp = (temp) => {
  console.log('update called');
  const tempValueContainer = document.getElementById('tempValue');
  tempValueContainer.textContent = temp;
};

const increaseTemp = () => {
  console.log('increase');
  temp += 1;
  updateTemp(temp);
};

const decreaseTemp = () => {
  temp -= 1;
  updateTemp(temp);
};

const renderAndUpdate = () => {
  console.log('render called');
  const upButton = document.getElementById('up');
  const downButton = document.getElementById('down');
  updateTemp(temp);

  upButton.addEventListener('click', increaseTemp);
  downButton.addEventListener('click', () => decreaseTemp());
};

if (document.readyState !== 'loading') {
  renderAndUpdate();
} else {
  //not fully loaded yet, add a content loaded event listener
  document.addEventListener('DOMContentLoaded', renderAndUpdate);
}
