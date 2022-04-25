/* ===== init calls ===== */

let favouriteWebsites = [
    "https://www.youtube.com",
    "https://kinokrad.co"
];
if (favouriteWebsites.includes(window.location.origin)) {
    presetSpeed();
}


/* ===== routines to handle preset logic ===== */

function youtubeHandler(speed) {
    document.getElementsByTagName("video")[0].playbackRate = speed;
}

function kinokradHandler(speed) {
    document.getElementsByTagName("video")[0].playbackRate = speed;
}

function defaultHandler(settings) {
    let speed = settings["speed"];
    let playerTag = settings["defaultHandler"]["playerTag"];
    let playerIndex = settings["defaultHandler"]["playerIndex"];

    let players = document.getElementsByTagName(playerTag);
    if (players.length > 0) {
        players[playerIndex].playbackRate = speed;
    }
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
                defaultHandler(settings);
                return;
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
        let presetEnabled = settings["presetEnabled"];
        if (presetEnabled) {
            handlePlaybackSpeed(settings);
        }
    });
}
