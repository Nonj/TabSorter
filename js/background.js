var currentTabs = {};
var tabState = {};

chrome.tabs.onCreated.addListener(function (tab) {
    tabState[tab.id] = 1;
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    if(tabState[activeInfo.tabId]) {
        tabState[activeInfo.tabId]++;
    } else {
        tabState[activeInfo.tabId] = 1;
    }
});
