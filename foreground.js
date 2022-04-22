//

let debug_msg = "[DEBUG] [foreground.js] hi";
console.log(debug_msg);

//

function youtubeHandler(speed) {
    document.getElementsByTagName("video")[0].playbackRate = speed;
}

function kinokradHandler(speed) {
    document.getElementsByTagName("video")[0].playbackRate = speed;
}

chrome.storage.sync.get("settings", ({ settings }) => {
    let debug_msg = "[DEBUG] [foreground.js] [chrome.storage.sync.get - settings] start";
    console.log(debug_msg);

    let speed = settings['speed'];
    debug_msg = "[DEBUG] [foreground.js] [chrome.storage.sync.get - settings] speed should be changed to";
    console.log(debug_msg, speed);

    try {
        let debug_msg = "[DEBUG] [foreground.js] [chrome.storage.sync.get - settings] try-catch start";
        console.log(debug_msg);

        switch (window.location.origin) {
            case 'https://www.youtube.com':
                youtubeHandler(speed);
                break;
            case 'https://kinokrad.co':
                kinokradHandler(speed);
                break;

            default:
                break;
        }

        let status_msg = "[SPEEDY GONZALES] [STATUS] [foreground.js] playback speed changed to";
        console.log(status_msg, speed);

        debug_msg = "[DEBUG] [foreground.js] [chrome.storage.sync.get - settings] try-catch end";
        console.log(debug_msg);
    } catch (error) {
        let debug_msg = "[DEBUG] [foreground.js] [chrome.storage.sync.get - settings] exception catched";
        console.log(debug_msg, error);
    }

    debug_msg = "[DEBUG] [foreground.js] [chrome.storage.sync.get - settings] end";
    console.log(debug_msg);
});
