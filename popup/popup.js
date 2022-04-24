//

let debug_msg = "[DEBUG] [popup.js] hi";
console.log(debug_msg);

/* ===== init calls ===== */

window.addEventListener("load", () => {
    let debug_msg = "[DEBUG] [popup.js] [window.addEventListener - load] start";
    console.log(debug_msg);

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

    debug_msg = "[DEBUG] [popup.js] [window.addEventListener - load] start";
    console.log(debug_msg);
});

/* ===== routines to initialize frontend ===== */

function initFrontend(settings) {
    let debug_msg = "[DEBUG] [popup.js] [initFrontend] start";
    console.log(debug_msg);

    initFrontend_speedInput(settings);
    initFrontend_speedInputValueSpan(settings);
    initFrontend_presetInput(settings);

    debug_msg = "[DEBUG] [popup.js] [initFrontend] end";
    console.log(debug_msg);
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

/* ===== fix speed button events handlers ===== */

function youtubeHandler(speed) {
    document.getElementsByTagName("video")[0].playbackRate = speed;
}

function kinokradHandler(speed) {
    document.getElementsByTagName("video")[0].playbackRate = speed;
}

function defaultHandler() {
    // do nothing
}

function handlePlaybackSpeed(settings) {
    let speed = settings["speed"];
    let debug_msg = "[DEBUG] [popup.js] [handlePlaybackSpeed] speed will be changed to:";
    console.log(debug_msg, speed);

    try {
        let debug_msg = "[DEBUG] [popup.js] [handlePlaybackSpeed] try-catch start";
        console.log(debug_msg);

        switch (window.location.origin) {
            case "https://www.youtube.com":
                youtubeHandler(speed);
                break;
            case "https://kinokrad.co":
                kinokradHandler(speed);
                break;

            default:
                defaultHandler();
                break;
        }

        let status_msg = "[SPEEDY GONZALES] [STATUS] [popup.js] [handlePlaybackSpeed] changed speed to:";
        console.log(status_msg, speed);

        debug_msg = "[DEBUG] [popup.js] [handlePlaybackSpeed] try-catch end";
        console.log(debug_msg);
    } catch (error) {
        let error_msg = "[SPEEDY GONZALES] [ERROR] [popup.js] [handlePlaybackSpeed] catched exception:";
        console.log(error_msg, error);
    }
}

function handlePlaybackSpeedExecutor() {
    let debug_msg = "[DEBUG] [popup.js] [handlePlaybackSpeedExecutor] start";
    console.log(debug_msg);

    chrome.storage.sync.get("settings", ({ settings }) => {
        let debug_msg = "[DEBUG] [popup.js] [handlePlaybackSpeedExecutor] [chrome.storage.sync.get - settings] start";
        console.log(debug_msg);

        handlePlaybackSpeed(settings);

        debug_msg = "[DEBUG] [popup.js] [handlePlaybackSpeedExecutor] [chrome.storage.sync.get - settings] end";
        console.log(debug_msg);
    });

    debug_msg = "[DEBUG] [popup.js] [handlePlaybackSpeedExecutor] end";
    console.log(debug_msg);
}

function fixSpeedBtnClickHandler(tab) {
    let debug_msg = "[DEBUG] [popup.js] [fixSpeedBtnClickHandler] start";
    console.log(debug_msg);

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: handlePlaybackSpeedExecutor
        },
        () => {
            let debug_msg = "[DEBUG] [popup.js] [fixSpeedBtnClickHandler] [chrome.scripting.executeScript] handlePlaybackSpeedExecutor finished";
            console.log(debug_msg);
        }
    );

    debug_msg = "[DEBUG] [popup.js] [fixSpeedBtnClickHandler] end";
    console.log(debug_msg);
}

/* ===== speed input events handlers ===== */

function speedInputChangeHandler(event) {
    let debug_msg = "[DEBUG] [popup.js] [speedInputChangeHandler] start";
    console.log(debug_msg);

    let speed = event.target.value;

    let speedInputValueSpan = document.getElementById("speedInputValueSpan");
    speedInputValueSpan.innerHTML = parseFloat(speed).toFixed(1);

    chrome.storage.sync.get("settings", ({ settings }) => {
        let debug_msg = "[DEBUG] [popup.js] [speedInputChangeHandler] [chrome.storage.sync.get - settings] start";
        console.log(debug_msg);

        settings["speed"] = speed;
        chrome.storage.sync.set({ settings });
        debug_msg = "[DEBUG] [popup.js] [speedInputChangeHandler] [chrome.storage.sync.get - settings] settings updated, new speed:";
        console.log(debug_msg, speed);

        debug_msg = "[DEBUG] [popup.js] [speedInputChangeHandler] [chrome.storage.sync.get - settings] end";
        console.log(debug_msg);
    });

    debug_msg = "[DEBUG] [popup.js] [speedInputChangeHandler] end";
    console.log(debug_msg);
}

function speedInputMousemoveHandler(event) {
    let speedInputValueSpan = document.getElementById("speedInputValueSpan");
    let speed = event.target.value;
    speedInputValueSpan.innerHTML = parseFloat(speed).toFixed(1);
}

/* ===== preset input events handlers ===== */

function presetInputChangeHandler(event) {
    let debug_msg = "[DEBUG] [popup.js] [presetInputChangeHandler] start";
    console.log(debug_msg);

    let isChecked = event.target.checked;

    chrome.storage.sync.get("settings", ({ settings }) => {
        let debug_msg = "[DEBUG] [popup.js] [presetInputChangeHandler] [chrome.storage.sync.get - settings] start";
        console.log(debug_msg);

        settings["presetEnabled"] = isChecked;
        chrome.storage.sync.set({ settings });
        debug_msg = "[DEBUG] [popup.js] [presetInputChangeHandler] [chrome.storage.sync.get - settings] settings updated, new presetEnabled:";
        console.log(debug_msg, isChecked);

        debug_msg = "[DEBUG] [popup.js] [presetInputChangeHandler] [chrome.storage.sync.get - settings] end";
        console.log(debug_msg);
    });

    debug_msg = "[DEBUG] [popup.js] [presetInputChangeHandler] end";
    console.log(debug_msg);
}
