/* ===== init calls ===== */

chrome.runtime.onInstalled.addListener(() => {
    let settings = {
        "speed": 2.0
    };
    chrome.storage.sync.set({ settings });
});
