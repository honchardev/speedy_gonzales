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

        let status_msg = "[SPEEDY GONZALES] [STATUS] [foreground.js] [handlePlaybackSpeed] changed speed to:";
        console.log(status_msg, speed);
    } catch (error) {
        let error_msg = "[SPEEDY GONZALES] [ERROR] [foreground.js] [handlePlaybackSpeed] catched exception:";
        console.log(error_msg, error);
    }
}

function presetSpeed() {
    chrome.storage.sync.get("settings", ({ settings }) => {
        handlePlaybackSpeed(settings);
    });
}
