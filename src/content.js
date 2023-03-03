/*
document.getElementById("test_form").addEventListener("submit", function(e){
  e.preventDefault();
  var name = document.getElementById("nameInput").value;
  console.log(name);
});
*/
const urlForm = document.getElementById('url-form');
urlForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  
  const data = new FormData(urlForm);
  const encoded = encodeURIComponent(data.get('url-input'));
  
  alert(`Encoded URL: ${encoded}`);
});

const base64Form = document.getElementById('base64-form');
base64Form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  
  const data = new FormData(base64Form);
  const encoded = btoa(data.get('base64-input'));
  
  alert(`Encoded text: ${encoded}`);
});


