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
});

/* ===== routines to initialize frontend ===== */

function initFrontend(settings) {
    initFrontend_speedInput(settings);
    initFrontend_speedInputValueSpan(settings);
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

    try {
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
    } catch (error) {
        let error_msg = "[SPEEDY GONZALES] [ERROR] [popup.js] [handlePlaybackSpeed] catched exception:";
        console.log(error_msg, error);
    }
}

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
        },
        () => {
            // do nothing
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
    });
}

function speedInputMousemoveHandler(event) {
    let speedInputValueSpan = document.getElementById("speedInputValueSpan");
    let speed = event.target.value;
    speedInputValueSpan.innerHTML = parseFloat(speed).toFixed(1);
}
