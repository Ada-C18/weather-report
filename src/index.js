'use strict';

{
  /* <script>
  var i = 0; function buttonClick(){' '}
  {(document.getElementById('inc').value = ++i)}
</script>; */
}

function incrementButton() {
  console.log('hello world');
  var element = document.getElementById('counter');
  var value = element.innerHTML;

  ++value;

  console.log(value);
  document.getElementById('counter').innerHTML = value;
}

function decreaseButton() {
  var element = document.getElementById('counter');
  var value = element.innerHTML;

  --value;

  console.log(value);
  document.getElementById('counter').innerHTML = value;
}
