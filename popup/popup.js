//

let debug_msg = "[DEBUG] [popup.js] hi";
console.log(debug_msg);

//

chrome.storage.sync.get("settings", ({ settings }) => {
    let debug_msg = "[DEBUG] [popup.js] [chrome.storage.sync.get - settings] start";
    console.log(debug_msg);

    if (chrome.runtime.error) {
        let debug_msg = "[DEBUG] [popup.js] [chrome.storage.sync.get - settings] chrome runtime error";
        console.log(debug_msg);
    } else {
        let debug_msg = "[DEBUG] [popup.js] [chrome.storage.sync.get - settings] settings loaded";
        console.log(debug_msg, settings);

        let speedInput = document.getElementById("speedInput");
        let speedInputValue = settings["speed"];
        speedInput.value = speedInputValue;
        debug_msg = "[DEBUG] [popup.js] [chrome.storage.sync.get - settings] speedInput.value updated";
        console.log(debug_msg);

        let speedInputValueSpan = document.getElementById('speedInputValueSpan');
        speedInputValueSpan.innerHTML = parseFloat(speedInputValue).toFixed(1);
        debug_msg = "[DEBUG] [popup.js] [chrome.storage.sync.get - settings] speedInputValueSpan.innerHTML updated";
        console.log(debug_msg);
    }

    debug_msg = "[DEBUG] [popup.js] [chrome.storage.sync.get - settings] end";
    console.log(debug_msg);
});

//

function setPlaybackRate() {
    let debug_msg = "[DEBUG] [popup.js] [setPlaybackRate] start";
    console.log(debug_msg);

    chrome.storage.sync.get("settings", ({ settings }) => {
        let debug_msg = "[DEBUG] [popup.js] [setPlaybackRate] [chrome.storage.sync.get - settings] start";
        console.log(debug_msg);

        let speed = settings["speed"];
        document.getElementsByTagName("video")[0].playbackRate = speed;
        debug_msg = "[DEBUG] [popup.js] [setPlaybackRate] [chrome.storage.sync.get - settings] speed changed to";
        console.log(debug_msg, speed);

        debug_msg = "[DEBUG] [popup.js] [setPlaybackRate] [chrome.storage.sync.get - settings] end";
        console.log(debug_msg);
    });

    debug_msg = "[DEBUG] [popup.js] [setPlaybackRate] end";
    console.log(debug_msg);
}

let fixSpeedBtn = document.getElementById("fixSpeedBtn");

fixSpeedBtn.addEventListener("click", async () => {
    let debug_msg = "[DEBUG] [popup.js] [fixSpeedBtn.addEventListener - click] [async] start";
    console.log(debug_msg);

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: setPlaybackRate
        },
        () => {
            let debug_msg = "[DEBUG] [popup.js] [fixSpeedBtn.addEventListener - click] [async] [chrome.scripting.executeScript] finished";
            console.log(debug_msg);
        }
    );

    debug_msg = "[DEBUG] [popup.js] [fixSpeedBtn.addEventListener - click] [async] end";
    console.log(debug_msg);
});

//

let speedInput = document.getElementById("speedInput");

speedInput.addEventListener('change', async (event) => {
    let debug_msg = "[DEBUG] [popup.js] [speedInput.addEventListener - change] [async] start";
    console.log(debug_msg);

    chrome.storage.sync.get("settings", ({ settings }) => {
        let debug_msg = "[DEBUG] [popup.js] [speedInput.addEventListener - change] [async] [chrome.storage.sync.get - settings] start";
        console.log(debug_msg);

        let speed = event.target.value;
        settings['speed'] = speed;
        chrome.storage.sync.set({ settings });
        debug_msg = "[DEBUG] [popup.js] [speedInput.addEventListener - change] [async] [chrome.storage.sync.get - settings] setting updated, speed is";
        console.log(debug_msg, speed);

        debug_msg = "[DEBUG] [popup.js] [speedInput.addEventListener - change] [async] [chrome.storage.sync.get - settings] end";
        console.log(debug_msg);
    });

    debug_msg = "[DEBUG] [popup.js] [speedInput.addEventListener - change] [async] end";
    console.log(debug_msg);
});

speedInput.addEventListener('mousemove', (event) => {
    let speedInputValueSpan = document.getElementById('speedInputValueSpan');
    let speed = event.target.value;
    speedInputValueSpan.innerHTML = parseFloat(speed).toFixed(1);
});
