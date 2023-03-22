// background.js

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

    const url = "http://localhost:3000/magic";
    const data = {
      input: inputValue,
      args: {depth: 1}
    };
    const options = {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch(url, options)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        const finalVal = jsonData.value[0].data;
        alert(finalVal);
      });

    //If you want to make it open cyberchef
    //var baseURL = "https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,'')&input=";
    //var newURL = baseURL + encrypt.replace(/=*$/, '');
    //chrome.tabs.create({ url: newURL});
    
});
