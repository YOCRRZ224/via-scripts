// ==UserScript==
// @name         Fast-Pass
// @namespace    yocrrz.dev
// @version      1.0
// @description  Automatically skips 'Please Wait' timers and link-shortener redirects.
// @author       YOCRRZ
// @icon         🚀
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Core Bypass Logic
    const bypass = () => {
        // --- A. The "Timer" Sniper ---
        // Look for buttons that are disabled but have a countdown
        const buttons = document.querySelectorAll('button:disabled, a.disabled, .timer, #countdown');
        buttons.forEach(el => {
            // Force enable buttons immediately
            el.disabled = false;
            el.classList.remove('disabled');
            if (el.innerText.match(/\d+/)) {
                el.innerText = "YOCRRZ_BYPASS_ACTIVE";
            }
        });

        // --- B. The "Auto-Clicker" ---
        // Common button IDs for link shorteners
        const targets = [
            '#skip_button', '#continue-btn', '.btn-skip', 
            '.skip-ad', '#get-link', '.btn-success'
        ];
        targets.forEach(selector => {
            const btn = document.querySelector(selector);
            if (btn && !btn.dataset.clicked) {
                btn.click();
                btn.dataset.clicked = "true"; // Prevent infinite loops
            }
        });

        // --- C. The "Meta-Refresh" Force ---
        // If the page is just a redirector, speed it up
        const meta = document.querySelector('meta[http-equiv="refresh"]');
        if (meta) {
            const content = meta.getAttribute('content');
            const url = content.split('url=')[1];
            if (url) window.location.href = url;
        }
    };

    // 2. The Observer (Watches for late-loading popups)
    const observer = new MutationObserver(() => bypass());
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Initial run
    window.addEventListener('load', bypass);
    
    console.log("[YOCRRZ_LABS] Fast-Pass Bypasser Initialized.");
})();
