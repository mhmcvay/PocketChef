// background.js

chrome.runtime.onInstalled.addListener(() => {
  //create context menu
  chrome.contextMenus.create({
      id: "submit-text",
      title: "Magic on: \"%s\" ", 
      contexts: ["selection"], 
  })
});

//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;
//import {JSDOM} from "jsdom";
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    const inputValue = info.selectionText;
    console.log(inputValue);
    const encrypt = btoa(inputValue);
    console.log(encrypt);
    var baseURL = "https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,'')&input=";
    var newURL = baseURL + encrypt.replace(/=*$/, '');
    console.log(newURL);
    fetch(newURL).then(r => r.text()).then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const tdElement = doc.querySelector('#output-html td:nth-child(2)');
      const responseWord = tdElement.textContent.trim();
      console.log(responseWord);
    });
    chrome.tabs.create({ url: newURL});
});
