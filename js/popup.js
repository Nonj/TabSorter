state = {}
document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('buttonT');

    // onClick's logic below:
    button.addEventListener('click', function () {
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
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('buttonU'),
        state = chrome.extension.getBackgroundPage().tabState;

    // onClick's logic below:
    button.addEventListener('click', function () {

        chrome.tabs.query({
            currentWindow: true
        }, function(tabs) {
            if (tabs.length > 0) { 
                tabs.sort(function (a, b) {
                    var keyA = state[a.id],
                        keyB = state[b.id];
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
                });
                for (var i = 0; i < tabs.length; ++i) {
                    // Current tab is pinned, so decrement the tabIndex by one.
                    chrome.tabs.move(tabs[i].id, {
                        index: i
                    });
                }
            }
        })
    });
});

function sortTabs(tabs, reverse) {
    if (tabs.length > 0) { 
        tabs.sort(function (a, b) {
            var keyA = state[a.id],
                keyB = state[b.id];
            if (keyA < keyB) return reverse;
            if (keyA > keyB) return -reverse;
            return 0;
        });
    }
    return tabs
}

function moveTabs(tabs) {
    for (var i = 0; i < tabs.length; ++i) {
        // Current tab is pinned, so decrement the tabIndex by one.
        chrome.tabs.move(tabs[i].id, {
            index: i
        });
    }
}