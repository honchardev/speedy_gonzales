/* ===== init calls ===== */

chrome.runtime.onInstalled.addListener(() => {
    let settings = {
        "speed": 2.0,
        "presetEnabled": true,
        "speedSyncEnabled": true,
        "defaultHandler": {
            "playerTag": "video",
            "playerIndex": 0
        }
    };
    chrome.storage.sync.set({ settings });
});
