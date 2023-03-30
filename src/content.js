
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.msg === "something_completed") {
          //  To do something
          console.log(request.data.subject)
          console.log(request.data.content)
          document.getElementById('output-text').value = request.data.subject;
      }
  }
);


const selectMethod = document.getElementById("select-method");
selectMethod.addEventListener("change", function() {
  const railFenceInput_rails = document.getElementById("railfence-input-rails");
  const railFenceInput_off = document.getElementById("railfence-input-off");
  if (this.value === "railfence") {
    railFenceInput_rails.classList.remove("hidden");
    railFenceInput_off.classList.remove("hidden");
  } else {
    railFenceInput_rails.classList.add("hidden");
    railFenceInput_off.classList.add("hidden");
  }
});


document.getElementById('encode-button').addEventListener('click', function() {
  var inputText = document.getElementById('input-text').value;
  var method = document.getElementById('select-method').value;
  var outputText = '';
  switch (method) {
    case 'base64':
      outputText = btoa(inputText);
      break;
    case 'rot13':
      outputText = rot13(inputText);
      break;
    case 'atbash':
      outputText = atbash(inputText);
      break;
    case 'railfence':
      //outputText = railfence(inputText);
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
    case 'rot13':
      outputText = rot13(inputText);
      break;
    case 'atbash':
      outputText = atbash(inputText);
      break;
    case 'railfence':
      var rails = document.getElementById('railfence-rails').value;
      var offset = document.getElementById('railfence-off').value;
      outputText = railfence(inputText, rails, offset);
      break;
  }
  document.getElementById('output-text').value = outputText;
});

function railfence(inputValue, rails, offset)
{
    fetch('http://localhost:3000/bake', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: inputValue,
        recipe: [
          {
            op: 'Rail Fence Cipher Decode',
            args: [rails, offset]
          }
        ]
      })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('output-text').value = data.value;
    })
    .catch(error => console.error(error));
}

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

