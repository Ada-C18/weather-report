'use strict';

{
  /* <script>
  var i = 0; function buttonClick(){' '}
  {(document.getElementById('inc').value = ++i)}
</script>; */
}

function incrementButton() {
  var element = document.getElementById('inc');
  var value = element.innerHTML;

  ++value;

  console.log(value);
  document.getElementById('inc').innerHTML = value;
}

function decreasButton() {
  var element = document.getElementById('dec');
  var value = element.innerHTML;

  --value;

  console.log(value);
  document.getElementById('dec').innerHTML = value;
}
