// ==UserScript==
// @name         Desktop-Force
// @namespace    yocrrz.dev
// @version      1.0
// @description  Force websites to serve the full Desktop version by spoofing UA and screen.
// @author       YOCRRZ
// @icon         🖥️
// @category     Daily
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. THE FAKE IDENTITY (Windows PC / Chrome 120)
    const desktopUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    // 2. SPOOF THE USER AGENT
    Object.defineProperty(navigator, 'userAgent', { get: () => desktopUA });
    Object.defineProperty(navigator, 'appVersion', { get: () => desktopUA });
    Object.defineProperty(navigator, 'platform', { get: () => "Win32" });

    // 3. SPOOF THE SCREEN (Trick the site into seeing a 1920x1080 monitor)
    // This stops sites from using CSS Media Queries to hide desktop features.
    const spoofScreen = () => {
        Object.defineProperty(window, 'innerWidth', { get: () => 1920 });
        Object.defineProperty(window, 'innerHeight', { get: () => 1080 });
        Object.defineProperty(screen, 'width', { get: () => 1920 });
        Object.defineProperty(screen, 'height', { get: () => 1080 });
    };

    // 4. HIDE TOUCH CAPABILITIES (Optional)
    // Some sites check if 'ontouchstart' exists to force the mobile UI.
    // We keep it enabled but tell the site it's a mouse-capable device.
    Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 1 });

    // EXECUTE BEFORE SITE LOADS
    spoofScreen();
    console.log("[YOCRRZ_DESKTOP] Protocol Active: User-Agent Spoofed to Windows_x64.");

})();
