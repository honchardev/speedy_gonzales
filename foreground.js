//

let debug_msg = "[DEBUG] [foreground.js] hi";
console.log(debug_msg);

/* ===== init calls ===== */

presetSpeed();

/* ===== routines to handle preset logic ===== */

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
    let debug_msg = "[DEBUG] [foreground.js] [handlePlaybackSpeed] speed will be changed to:";
    console.log(debug_msg, speed);

    try {
        let debug_msg = "[DEBUG] [foreground.js] [handlePlaybackSpeed] try-catch start";
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

        let status_msg = "[SPEEDY GONZALES] [STATUS] [foreground.js] [handlePlaybackSpeed] changed speed to:";
        console.log(status_msg, speed);

        debug_msg = "[DEBUG] [foreground.js] [handlePlaybackSpeed] try-catch end";
        console.log(debug_msg);
    } catch (error) {
        let error_msg = "[SPEEDY GONZALES] [ERROR] [foreground.js] [handlePlaybackSpeed] catched exception:";
        console.log(error_msg, error);
    }
}

function presetSpeed() {
    let debug_msg = "[DEBUG] [foreground.js] [presetSpeed] start";
    console.log(debug_msg);

    chrome.storage.sync.get("settings", ({ settings }) => {
        let debug_msg = "[DEBUG] [foreground.js] [presetSpeed] [chrome.storage.sync.get - settings] start";
        console.log(debug_msg);

        let presetEnabled = settings["presetEnabled"];
        if (presetEnabled) {
            let debug_msg = "[DEBUG] [foreground.js] [presetSpeed] [chrome.storage.sync.get - settings] presetEnabled is true, proceed to handlePlaybackSpeed";
            console.log(debug_msg);

            handlePlaybackSpeed(settings);
        } else {
            let debug_msg = "[DEBUG] [foreground.js] [presetSpeed] [chrome.storage.sync.get - settings] presetEnabled is false, skip handlePlaybackSpeed";
            console.log(debug_msg);
        }

        debug_msg = "[DEBUG] [foreground.js] [presetSpeed] [chrome.storage.sync.get - settings] end";
        console.log(debug_msg);
    });

    debug_msg = "[DEBUG] [foreground.js] [presetSpeed] end";
    console.log(debug_msg);
}
