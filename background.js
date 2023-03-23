console.log('In background!!')
chrome.action.onClicked.addListener(function (tab) {
    console.log('In background')
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log('active tabs');
      chrome.tabs.sendMessage(tabs[0].id, { type: "popup-modal" })
      .catch(error => { 
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon.png',
          title: 'ComposeMate',
          message: 'Try reloading the page. Make sure you are on a regular website not on browser settings or empty page.'
        });
       });
      console.log('message sent');
  })
}
);

  
