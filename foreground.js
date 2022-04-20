//

let debug_msg = "[DEBUG] [foreground.js] hi";
console.log(debug_msg);

//

chrome.storage.sync.get("settings", ({ settings }) => {
    let debug_msg = "[DEBUG] [foreground.js] [chrome.storage.sync.get - settings] start";
    console.log(debug_msg);

    settings['currentWebsite'] = window.location.origin;
    chrome.storage.sync.set({ settings });
    debug_msg = "[DEBUG] [foreground.js] [chrome.storage.sync.get - settings] settings updated";
    console.log(debug_msg, settings);

    debug_msg = "[DEBUG] [foreground.js] [chrome.storage.sync.get - settings] end";
    console.log(debug_msg);
});
