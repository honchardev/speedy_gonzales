/* ===== init calls ===== */

window.addEventListener("load", () => {
    chrome.storage.sync.get("settings", ({ settings }) => {
        initFrontend(settings);
    });

    let fixSpeedBtn = document.getElementById("fixSpeedBtn");
    fixSpeedBtn.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        fixSpeedBtnClickHandler(tab);
    });

    let speedInput = document.getElementById("speedInput");
    speedInput.addEventListener("change", (event) => { speedInputChangeHandler(event); });
    speedInput.addEventListener("mousemove", (event) => { speedInputMousemoveHandler(event); });

    let presetInput = document.getElementById("presetInput");
    presetInput.addEventListener("change", (event) => { presetInputChangeHandler(event); });

    let speedSyncInput = document.getElementById("speedSyncInput");
    speedSyncInput.addEventListener("change", (event) => { speedSyncInputChangeHandler(event); });

    let optionsPageLink = document.getElementById("optionsPageLink");
    optionsPageLink.addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });
});

/* ===== routines to initialize frontend ===== */

function initFrontend(settings) {
    initFrontend_speedInput(settings);
    initFrontend_speedInputValueSpan(settings);
    initFrontend_presetInput(settings);
    initFrontend_speedSyncInput(settings);
}

function initFrontend_speedInput(settings) {
    let speedInput = document.getElementById("speedInput");
    let speedInputValue = settings["speed"];
    speedInput.value = speedInputValue;
}

function initFrontend_speedInputValueSpan(settings) {
    let speedInputValueSpan = document.getElementById("speedInputValueSpan");
    let speedInputValue = settings["speed"];
    speedInputValueSpan.innerHTML = parseFloat(speedInputValue).toFixed(1);
}

function initFrontend_presetInput(settings) {
    let presetInput = document.getElementById("presetInput");
    let presetEnabled = settings["presetEnabled"];
    presetInput.checked = presetEnabled;
}

function initFrontend_speedSyncInput(settings) {
    let speedSyncInput = document.getElementById("speedSyncInput");
    let speedSyncEnabled = settings["speedSyncEnabled"];
    speedSyncInput.checked = speedSyncEnabled;
}

/* ===== fix speed button events handlers ===== */

function handlePlaybackSpeedExecutor() {
    chrome.storage.sync.get("settings", ({ settings }) => {
        handlePlaybackSpeed(settings);
    });
}

function fixSpeedBtnClickHandler(tab) {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: handlePlaybackSpeedExecutor
        }
    );
}

/* ===== speed input events handlers ===== */

function speedInputChangeHandler(event) {
    let speed = event.target.value;

    let speedInputValueSpan = document.getElementById("speedInputValueSpan");
    speedInputValueSpan.innerHTML = parseFloat(speed).toFixed(1);

    chrome.storage.sync.get("settings", ({ settings }) => {
        settings["speed"] = speed;
        chrome.storage.sync.set({ settings });

        let speedSyncEnabled = settings["speedSyncEnabled"];
        if (speedSyncEnabled) {
            let fixSpeedBtn = document.getElementById("fixSpeedBtn");
            fixSpeedBtn.dispatchEvent(new CustomEvent("click"));
        }
    });
}

function speedInputMousemoveHandler(event) {
    let speedInputValueSpan = document.getElementById("speedInputValueSpan");
    let speed = event.target.value;
    speedInputValueSpan.innerHTML = parseFloat(speed).toFixed(1);
}

/* ===== preset input events handlers ===== */

function presetInputChangeHandler(event) {
    let isChecked = event.target.checked;

    chrome.storage.sync.get("settings", ({ settings }) => {
        settings["presetEnabled"] = isChecked;
        chrome.storage.sync.set({ settings });
    });
}

/* ===== speed sync input events handlers ===== */

function speedSyncInputChangeHandler(event) {
    let isChecked = event.target.checked;

    chrome.storage.sync.get("settings", ({ settings }) => {
        settings["speedSyncEnabled"] = isChecked;
        chrome.storage.sync.set({ settings });
    });
}
