# speedy_gonzales
Chrome extension to speed up video playback speed on my favourite websites

# TODO
1. Advanced options (options.html)
    2.1. Customize tagname for default handler
    2.2. Customize player index for default handler
    2.3. copy all settinsg from popup to options.html
    2.4. Add advanced options link to main popup (?)
2. Default handler
3. Add tests.html (https://stackoverflow.com/questions/2869827/how-to-test-chrome-extensions)
4. youtube case - look at window change, not page update - hashwindow.addEventListener('popstate', function(e){console.log('url changed')});
    - https://stackoverflow.com/questions/6497548/chrome-extension-make-it-run-every-page-load
5. package instead of [same playbackChange for both background.js/foreground.js]

# Notes
1. chrome extension structure: https://github.com/SimGus/chrome-extension-v3-starter
2. about host_permission parameter:
    - https://stackoverflow.com/questions/67963337/do-i-need-to-declare-host-permissions-in-my-chrome-extension
        - "Those are only required if you want to inject something in a matching page, download from a matching URL, or observe via webRequest and similar API."""
    - https://chromium.googlesource.com/chromium/src/+/main/extensions/docs/permissions.md#Runtime-Host-Permissions
3. onInstalled vs onStartup
    - onInstalled
        - https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
        - "Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version."
    - onStartup
        - https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
        - "Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode."

# Borrowings
1. buttons css source:
    - https://dev.to/webdeasy/top-20-css-buttons-animations-f41 (#4 icon buttons)
2. logo svg source:
    - https://en.wikipedia.org/wiki/Speedy_Gonzales#/media/File:Speedy_Gonzales.svg
