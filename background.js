function playNotificationSound(type) {
    const audio = new Audio(chrome.runtime.getURL(`${type}_notification.mp3`));
    audio.play();
  }
  
  function sendDesktopNotification(type, message) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: chrome.runtime.getURL("icon128.png"),
      title: `Fiverr ${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      message: message,
      buttons: [{ title: "Open Fiverr" }]
    }, (notificationId) => {
      chrome.storage.local.set({[notificationId]: {type: type}});
    });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "newMessage") {
      playNotificationSound("message");
      sendDesktopNotification("message", "You have a new message on Fiverr!");
    } else if (request.action === "newOrder") {
      playNotificationSound("order");
      sendDesktopNotification("order", "You have a new order on Fiverr!");
    }
  });
  
  // Handle notification click
  chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.tabs.create({url: "https://www.fiverr.com"});
    chrome.notifications.clear(notificationId);
  });
  
  // Handle notification button click
  chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (buttonIndex === 0) {  // "Open Fiverr" button
      chrome.tabs.create({url: "https://www.fiverr.com"});
    }
    chrome.notifications.clear(notificationId);
  });
  