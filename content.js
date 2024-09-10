
// content.js
function setupMessageObserver() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };
  
    const callback = function(mutationsList, observer) {
      for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const addedNodes = mutation.addedNodes;
          for(let node of addedNodes) {
            if(node.nodeType === Node.ELEMENT_NODE) {
              // Check for new messages
              if(node.classList.contains('js-unread-indicator') || node.querySelector('.js-unread-indicator')) {
                chrome.runtime.sendMessage({
                  action: "newMessage"
                });
              }
              // Check for new orders
              if(node.classList.contains('is-new') || node.querySelector('.orders-list .is-new')) {
                chrome.runtime.sendMessage({
                  action: "newOrder"
                });
              }
            }
          }
        }
      }
    };
  
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
  
  // Run the setup when the page loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupMessageObserver);
  } else {
    setupMessageObserver();
  }