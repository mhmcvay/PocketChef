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

  const xorInputKeyType = document.getElementById("xor-input-key-type");
  const xorInputKey = document.getElementById("xor-input-key");

  if (this.value === "xor") {
    xorInputKeyType.classList.remove("hidden");
    xorInputKey.classList.remove("hidden");
  } else {
    xorInputKeyType.classList.add("hidden");
    xorInputKey.classList.add("hidden");
  }

  /*
  const vigInput = document.getElementById("vig-input-key");
  if (this.value === "vigenere")
  {
    vigInput.classList.remove("hidden");
  }
  else{
    vigInput.classList.add("hidden");
  }
  */
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
      let rails = parseInt(document.getElementById('railfence-rails').value);
      let offset = parseInt(document.getElementById('railfence-off').value);
      outputText = railfence_enc(inputText, rails, offset);
      console.log(outputText);
      break;
    case 'xor':
      var type = document.getElementById('xor-key-type').value;
      var key = document.getElementById('xor-key').value;
      outputText = xor(inputText, type, key);
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
      let rails = parseInt(document.getElementById('railfence-rails').value);
      let offset = parseInt(document.getElementById('railfence-off').value);
      outputText = railfence_dec(inputText, rails, offset);
      break;
    case 'xor':
      var type = document.getElementById('xor-key-type').value;
      var key = document.getElementById('xor-key').value;
      outputText = xor(inputText, type, key);
      break;
  }
  document.getElementById('output-text').value = outputText;
});

function xor(inputValue, type, key)
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
            op: 'XOR',
            args: [{"option":type, "string":key}, "Standard", false]
          }
        ]
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('output-text').value = data.value;
    })
    .catch(error => console.error(error));
}

function railfence_enc(inputValue, rails, offset)
{
    fetch('http://localhost:3000/bake', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "input": inputValue,
        "recipe":[
        { "op": "Rail Fence Cipher Encode",
          "args": [rails, offset] }
      ]
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('output-text').value = data.value;
    })
    .catch(error => console.error(error));
}

function railfence_dec(inputValue, rails, offset)
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
      console.log(data);
      document.getElementById('output-text').value = data.value;
    })
    .catch(error => console.error(error));
}

// ROT13 implementation
//no Cyberchef API bc it returns a byteArray ???
function rot13(str) {
  var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  var index = x => input.indexOf(x);
  return str.split('').map(x => index(x) > -1 ? output[index(x)] : x).join('');
}

function atbash(inputValue)
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
          { op: "Atbash Cipher",
            args: [] }
        ]
      })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('output-text').value = data.value;
    })
    .catch(error => console.error(error));
}
