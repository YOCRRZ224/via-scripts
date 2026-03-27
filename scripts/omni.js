// ==UserScript==
// @name         Omni-Tool
// @namespace    yocrrz.dev
// @version      1.0
// @description  Universal toolkit: Unblock copy/paste, show passwords, and force zoom.
// @author       YOCRRZ
// @icon         🛠️
// @category     Daily
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 1. Create the Mini-Hub UI
    const menu = document.createElement('div');
    menu.id = 'omni-tool-panel';
    menu.style = `
        position: fixed; top: 10px; right: -180px; width: 180px;
        background: rgba(15, 15, 15, 0.95); border: 1px solid #333;
        border-radius: 8px 0 0 8px; z-index: 2147483647;
        transition: 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        font-family: sans-serif; padding: 10px; color: #fff;
        backdrop-filter: blur(10px); box-shadow: -5px 0 20px rgba(0,0,0,0.5);
    `;

    menu.innerHTML = `
        <div id="omni-handle" style="position:absolute; left:-35px; top:0; width:35px; height:45px; background:#ff3e3e; border-radius:8px 0 0 8px; display:flex; align-items:center; justify-content:center; cursor:pointer;">🛠️</div>
        <div style="font-size:10px; color:#ff3e3e; margin-bottom:10px; font-weight:bold; border-bottom:1px solid #333; padding-bottom:5px;">OMNI_TOOL_V1</div>
        <button class="omni-btn" onclick="window.omniActions.unblock()">🔓 UNBLOCK_COPY</button>
        <button class="omni-btn" onclick="window.omniActions.reveal()">👁️ SHOW_PASS</button>
        <button class="omni-btn" onclick="window.omniActions.images()">🖼️ EXTRACT_IMG</button>
        <style>
            .omni-btn { width:100%; background:#222; border:1px solid #333; color:#eee; padding:8px; margin-bottom:5px; border-radius:4px; font-size:11px; cursor:pointer; text-align:left; }
            .omni-btn:hover { background:#333; border-color:#ff3e3e; }
        </style>
    `;
    document.body.appendChild(menu);

    // 2. Toggle Logic
    let isOpen = false;
    document.getElementById('omni-handle').onclick = () => {
        isOpen = !isOpen;
        menu.style.right = isOpen ? '0px' : '-180px';
    };

    // 3. The Power Functions
    window.omniActions = {
        // Force-enable right click, selection, and copy
        unblock: () => {
            const style = document.createElement('style');
            style.innerHTML = '*{ -webkit-user-select: auto !important; -moz-user-select: auto !important; user-select: auto !important; }';
            document.head.appendChild(style);
            
            const events = ['contextmenu', 'copy', 'cut', 'paste', 'mousedown', 'mouseup', 'beforecopy', 'beforecut'];
            events.forEach(event => {
                document.addEventListener(event, e => e.stopPropagation(), true);
            });
            alert("Lockdown Bypassed: Selection Enabled.");
        },

        // Turn dots into readable characters
        reveal: () => {
            const passes = document.querySelectorAll('input[type="password"]');
            passes.forEach(p => p.type = (p.type === 'password' ? 'text' : 'password'));
        },

        // Open all high-res images in a new tab
        images: () => {
            const imgs = Array.from(document.querySelectorAll('img')).map(i => i.src);
            if (imgs.length === 0) return alert("No images found.");
            const win = window.open("");
            win.document.write(`<html><body style="background:#0a0a0a; color:#eee; font-family:sans-serif;">
                <h3>Found ${imgs.length} Images:</h3>
                ${imgs.map(src => `<img src="${src}" style="max-width:200px; margin:10px; border:1px solid #333;">`).join('')}
            </body></html>`);
        }
    };
none
