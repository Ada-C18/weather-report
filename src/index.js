////////////////wave 3\\\\\\\\\\\\\\\\\\\

const input = document.querySelector('input');
const log = document.getElementById('headerCityName');

input.oninput = function () {
  log.innerHTML = input.value;
};

///////////////Wave 5\\\\\\\\\\\\\\\\

const iinput = document.getElementById('skySelect');
const p = document.getElementById('gardenContent');

iinput.onchange = function () {
  p.innerHTML = iinput.value;
};
