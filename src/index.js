let total_element = document.getElementById('Total');
function Add () {
  let total_value = parseInt(total_element.innerHTML);
  total_element.innerHTML = total_value + 1;
}


function Subtract () {
  let total_value = parseInt(total_element.innerHTML);
  if (total_value == 0) return; 
  total_element.innerHTML = total_value - 1;
}

document.getElementById('Add').addEventListener('click', Add);

document.getElementById('Subtract').addEventListener('click', Subtract);

window.addEventListener("load", loadpage);
function cargaPagina() {
    var btn = document.getElementById("button1").addEventListener("click", changevalues);
}

function changevalues() {
    var inputName = document.getElementById("name");
    inputName.value = "Search City";
}

var x = document.getElementById("myText");