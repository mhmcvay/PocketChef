// handle encode/decode button clicks
document.getElementById('encode-button').addEventListener('click', function() {
  var inputText = document.getElementById('input-text').value;
  var method = document.getElementById('select-method').value;
  var outputText = '';
  switch (method) {
    case 'base64':
      outputText = btoa(inputText);
      break;
    case 'url':
      outputText = encodeURIComponent(inputText);
      break;
    case 'rot13':
      outputText = rot13(inputText);
      break;
  }
  document.getElementById('output-text').value = outputText;
});

document.getElementById('decode-button').addEventListener('click', function() {
  var inputText = document.getElementById('input-text').value;
  var method = document.getElementById('select-method').value;
  var outputText = '';
  switch (method) {
    case 'base64':
      outputText = atob(inputText);
      break;
    case 'url':
      outputText = decodeURIComponent(inputText);
      break;
    case 'rot13':
      outputText = rot13(inputText);
      break;
  }
  document.getElementById('output-text').value = outputText;
});

// ROT13 implementation
function rot13(str) {
  var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  var index = x => input.indexOf(x);
  return str.split('').map(x => index(x) > -1 ? output[index(x)] : x).join('');
}
