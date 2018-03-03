state = {}
document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('newButton');
    console.log(button);
    console.log("button sent");

    // onClick's logic below:
    button.addEventListener('click', function () {
        console.log(chrome.extension.getBackgroundPage().tabState);
        chrome.extension.getBackgroundPage().tabState;
        chrome.tabs.query({
            currentWindow: true
        }, function (tabs) {
            if (tabs.length > 0) {
                tabs.sort(function (a, b) {
                    var keyA = a.title,
                        keyB = b.title;
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
                for (var i = 0; i < tabs.length; ++i) {
                    // Current tab is pinned, so decrement the tabIndex by one.
                    chrome.tabs.move(tabs[i].id, {
                        index: i
                    });
                }
            }

            // chrome.tabs.move(tabId, {index: tabIndex});
        });

        // chrome.tabs.query({
        //     active: true,
        //     currentWindow: true
        // }, function (tabs) {
        //     var activeTab = tabs[0];
        //     chrome.tabs.sendMessage(activeTab.id, {
        //         "message": "clicked_browser_action",
        //         "tab": activeTab
        //     });
        // });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('newButton2');

    // onClick's logic below:
    button.addEventListener('click', function () {

    });
});