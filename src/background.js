// background.js

chrome.runtime.onInstalled.addListener(() => {
  //create context menu
  chrome.contextMenus.create({
      id: "submit-magic",
      title: "Magic on: \"%s\" ", 
      contexts: ["selection"], 
  })

  chrome.contextMenus.create({
    id: "submit-hash",
    title: "Analyze Hash", 
    contexts: ["selection"], 
})
});


chrome.contextMenus.onClicked.addListener(function(info, tabs) {
  if(info.menuItemId === "submit-magic"){
    const inputValue = info.selectionText;
    console.log(inputValue);
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
        //console.log(jsonData);
        const finalVal = jsonData.value[0].data;
        if(finalVal === inputValue)
          alert("MAGIC HAS NO CLUE");
        else
        {
          //popup
          alert(finalVal);
              chrome.runtime.sendMessage({
              msg: "something_completed", 
              data: { subject: finalVal }
              });

          //copy val ot clipboard
          const tempTextarea = document.createElement("textarea");
          tempTextarea.value = finalVal;
          document.body.appendChild(tempTextarea);
          tempTextarea.select();
          tempTextarea.setSelectionRange(0, 99999);
          document.execCommand("copy");
          document.body.removeChild(tempTextarea);
        }
      });
    }
    else if (info.menuItemId === "submit-hash")
    {
      const inputValue = info.selectionText;
      fetch("http://localhost:3000/bake", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "input": inputValue,
          "recipe": [{
            "op": "Analyse hash",
            "args": []
          }]
        })
      })
        .then(response => response.json())
        .then(data => {
          const finalVal = data.value;
          alert(finalVal);
        })
        .catch(error => alert("ERROR: not a hash"));
    }

    //If you want to make it open cyberchef
    //var baseURL = "https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,'')&input=";
    //var newURL = baseURL + encrypt.replace(/=*$/, '');
    //chrome.tabs.create({ url: newURL});
});
