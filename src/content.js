// handle encode/decode button clicks
/*
const url = "https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,'')&input=cGVlcGVl";
const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.send();

xhr.onload = function() {
  // Parse the HTML of the response
  const response = xhr.response;
  const parser = new DOMParser();
  const doc = parser.parseFromString(response, 'text/html');

  // Get the decoded value from the output box
  const outputBox = doc.getElementById('output-text');
  const decodedValue = outputBox.innerText;

  // Do something with the decoded value
  console.log(decodedValue);
  document.getElementById('output-text').value = outputText;
};
*/


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
    case 'atbash':
      outputText = atbash(inputText);
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
    case 'atbash':
      outputText = atbash(inputText);
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

function atbash(str) {
  // Define the alphabets to be used for encoding and decoding
  const plain = 'abcdefghijklmnopqrstuvwxyz';
  const cipher = 'zyxwvutsrqponmlkjihgfedcba';
  
  // Initialize an empty string to store the encrypted message
  let encrypted = '';
  
  // Loop through each character in the input string
  for (let i = 0; i < str.length; i++) {
    // Check if the character is a letter
    if (/[a-z]/i.test(str[i])) {
      // Get the index of the letter in the plain alphabet
      const index = plain.indexOf(str[i].toLowerCase());
      // Get the corresponding letter from the cipher alphabet
      const encryptedChar = cipher.charAt(index);
      // Append the encrypted letter to the output string
      encrypted += (str[i].toLowerCase() === str[i]) ? encryptedChar : encryptedChar.toUpperCase();
    } else {
      // If the character is not a letter, just append it as is
      encrypted += str[i];
    }
  }
  
  return encrypted;
}

