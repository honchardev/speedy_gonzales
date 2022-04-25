//

let debug_msg = "[DEBUG] [options.js] hi";
console.log(debug_msg);

/* ===== init calls ===== */

window.addEventListener("load", () => {
    let debug_msg = "[DEBUG] [options.js] [window.addEventListener - load] start";
    console.log(debug_msg);

    chrome.storage.sync.get("settings", ({ settings }) => {
        initFrontend(settings);
    });

    let saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", () => { saveBtnClickHandler(); });

    debug_msg = "[DEBUG] [options.js] [window.addEventListener - load] end";
    console.log(debug_msg);
});

/* ===== routines to initialize frontend ===== */

function initFrontend(settings) {
    let debug_msg = "[DEBUG] [options.js] [initFrontend] start";
    console.log(debug_msg);

    let defaultHandlerSettings = settings["defaultHandler"];
    initFrontend_playerTagInput(defaultHandlerSettings);
    initFronted_playerIndexInput(defaultHandlerSettings);

    debug_msg = "[DEBUG] [options.js] [initFrontend] end";
    console.log(debug_msg);
}

function initFrontend_playerTagInput(settings) {
    let playerTagInput = document.getElementById("playerTagInput");
    let playerTag = settings["playerTag"];
    playerTagInput.value = playerTag;
}

function initFronted_playerIndexInput(settings) {
    let playerIndexInput = document.getElementById('playerIndexInput');
    let playerIndex = settings["playerIndex"];
    playerIndexInput.value = playerIndex;
}

/* ===== save button events handlers ===== */

function saveBtnClickHandler() {
    let debug_msg = "[DEBUG] [options.js] [saveBtnClickHandler] start";
    console.log(debug_msg);

    let playerTag = document.getElementById("playerTagInput").value;
    let playerIndex = document.getElementById('playerIndexInput').value;

    chrome.storage.sync.get("settings", ({ settings }) => {
        let debug_msg = "[DEBUG] [options.js] [saveBtnClickHandler] [chrome.storage.sync.get - settings] start";
        console.log(debug_msg);

        settings["defaultHandler"]["playerTag"] = playerTag;
        settings["defaultHandler"]["playerIndex"] = playerIndex;
        chrome.storage.sync.set({ settings });
        debug_msg = "[DEBUG] [options.js] [saveBtnClickHandler] [chrome.storage.sync.get - settings] settings updated, new defaultHandler:";
        console.log(debug_msg, settings["defaultHandler"]);

        debug_msg = "[DEBUG] [options.js] [saveBtnClickHandler] [chrome.storage.sync.get - settings] end";
        console.log(debug_msg);
    });

    debug_msg = "[DEBUG] [options.js] [saveBtnClickHandler] start";
    console.log(debug_msg);
}
