console.log('content')
// Listen for form submit event
document.querySelector('form').addEventListener('submit', function(event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Retrieve the form values
  const name = document.querySelector('#nameInput').value;
  const email = document.querySelector('#emailInput').value;
  const message = document.querySelector('#messageInput').value;

  // Show an alert with the form values
  alert(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
});

// Listen for dropdown item click event
document.querySelectorAll('.dropdown-item').forEach(function(item) {
  item.addEventListener('click', function(event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Retrieve the selected option text
    const optionText = event.target.textContent;

    // Show an alert with the selected option
    alert(`Selected option: ${optionText}`);
  });
});
