var tabState = {}; // State of current tabs

// push a new tab onto our tab state everytime a tab is opened
chrome.tabs.onCreated.addListener(function (tab) {
    tabState[tab.id] = 1;
});

// Each time a tab is opened, we increment its "usage"
chrome.tabs.onActivated.addListener(function (activeInfo) {
    if (tabState[activeInfo.tabId]) {
        tabState[activeInfo.tabId]++;
    } else {
        tabState[activeInfo.tabId] = 1;
    }
});