// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("hello")

  //receiving a message
  chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello")
          sendResponse({farewell: "goodbye"});
      }
  );

  //create context menu
  chrome.contextMenus.create({
      id: "submit-text",
      title: "Magic on: \"%s\" ", 
      contexts: ["selection"], 
  })
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
    const inputValue = info.selectionText;
    console.log(inputValue);
    const encrypt = btoa(inputValue);
    console.log(encrypt);
    baseURL = "https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,'')&input=";
    var newURL = baseURL + encrypt.replace(/=*$/, '');
    console.log(newURL);
    chrome.tabs.create({ url: newURL});
});

// fetch('http://www.example.com?par=0').then(r => r.text()).then(result => {
    // Result now contains the response text, do what you want...
    //})