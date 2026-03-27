// ==UserScript==
// @name         YOCRRZ Anti-Annoyance
// @namespace    yocrrz.dev
// @version      1.0
// @description  Automatically removes 'Disable Adblock' and 'Cookie Consent' overlays.
// @author       YOCRRZ
// @icon         ✨
// @category     Daily
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const ANNOYANCES = [
        'cookie', 'consent', 'overlay', 'modal-backdrop', 
        'adblock-msg', 'paywall', 'sp-message-container'
    ];

    const killAnnoyances = () => {
        ANNOYANCES.forEach(keyword => {
            // Find elements that contain these keywords in their ID or Class
            const elements = document.querySelectorAll(`[class*="${keyword}"], [id*="${keyword}"]`);
            elements.forEach(el => {
                // If it's a fixed/absolute overlay, nuke it
                const style = window.getComputedStyle(el);
                if (style.position === 'fixed' || style.zIndex > 1000) {
                    el.remove();
                }
            });
        });
        
        // Restore scrolling if the site tried to lock it
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    };

    // Run every 2 seconds to catch late-loading popups
    setInterval(killAnnoyances, 2000);
})();
