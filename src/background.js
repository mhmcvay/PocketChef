// background.js

chrome.runtime.onInstalled.addListener(() => {
  //create context menu
  chrome.contextMenus.create({
      id: "submit-text",
      title: "Magic on: \"%s\" ", 
      contexts: ["selection"], 
  })

  /*
  chrome.contextMenus.create({
  title: "Sub-Menu Item 1",
  parentId: "submit-text",
  id: "submenu1",
  contexts: ["all"]
});
  */
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    const inputValue = info.selectionText;
    console.log(inputValue);
    const encrypt = btoa(inputValue);
    var baseURL = "https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,'')&input=";
    var newURL = baseURL + encrypt.replace(/=*$/, '');
    chrome.tabs.create({ url: newURL});
});
