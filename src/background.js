// background.js
//import puppeteer from 'puppeteer-core';

chrome.runtime.onInstalled.addListener(() => {
  //create context menu
  chrome.contextMenus.create({
      id: "submit-magic",
      title: "Magic on: \"%s\" ", 
      contexts: ["selection"], 
  })
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
    const inputValue = info.selectionText;
    console.log(inputValue);
    const encrypt = btoa(inputValue);
      var baseURL = "https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,'')&input=";
      var newURL = baseURL + encrypt.replace(/=*$/, '');
      chrome.tabs.create({ url: newURL});
});


//Experimental
/*
chrome.contextMenus.onClicked.addListener(async function(info, tab) {
  const inputValue = info.selectionText;
  console.log(inputValue);
  const encrypt = btoa(inputValue);
  const baseURL = "https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,'')&input=";
  const newURL = baseURL + encrypt.replace(/=*$/, '');
  chrome.tabs.create({ url: newURL });

  const browser = await puppeteer.launch({
    executablePath: '~/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(newURL);
  await page.click('#output-format-text');
  const output = await page.$eval('#output-text', el => el.value);
  console.log(output);
  await browser.close();
});
*/