//

let debug_msg = "[DEBUG] [background.js] hi";
console.log(debug_msg);

/* ===== init calls ===== */

chrome.runtime.onInstalled.addListener(() => {
    let debug_msg = "[DEBUG] [background.js] [chrome.runtime.onInstalled] start";
    console.log(debug_msg);

    let settings = {
        "speed": 2.0,
        "presetEnabled": true,
        "speedSyncEnabled": true
    };
    chrome.storage.sync.set({ settings });
    debug_msg = "[DEBUG] [background.js] [chrome.runtime.onInstalled] settings set:";
    console.log(debug_msg, settings);

    debug_msg = "[DEBUG] [background.js] [chrome.runtime.onInstalled] end";
    console.log(debug_msg);
});
