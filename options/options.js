/* ===== init calls ===== */

window.addEventListener("load", () => {
    chrome.storage.sync.get("settings", ({ settings }) => {
        initFrontend(settings);
    });

    let saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", () => { saveBtnClickHandler(); });
});

/* ===== routines to initialize frontend ===== */

function initFrontend(settings) {
    let defaultHandlerSettings = settings["defaultHandler"];
    initFrontend_playerTagInput(defaultHandlerSettings);
    initFronted_playerIndexInput(defaultHandlerSettings);
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
    let playerTag = document.getElementById("playerTagInput").value;
    let playerIndex = document.getElementById('playerIndexInput').value;

    chrome.storage.sync.get("settings", ({ settings }) => {
        settings["defaultHandler"]["playerTag"] = playerTag;
        settings["defaultHandler"]["playerIndex"] = playerIndex;
        chrome.storage.sync.set({ settings });
    });
}
