chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.input_value) {
    console.log("Received message: " + request.input_value);
  }
});
