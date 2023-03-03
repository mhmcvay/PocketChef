// background.js

chrome.runtime.onInstalled.addListener(() => {
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
    var baseURL = "https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,'')&input=";
    var newURL = baseURL + encrypt.replace(/=*$/, '');
    console.log(newURL);
    chrome.tabs.create({ url: newURL});
});
