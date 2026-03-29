// ==UserScript==
// @name         Cinema Engine (Target-to-Player)
// @namespace    yocrrz.dev
// @version      3.5
// @description  Target a video to 'Teleport' it into a custom YOCRRZ Lab player.
// @author       YOCRRZ
// @icon         🎬
// @category     media
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    let isSelectionMode = false;
    let engineActive = false;
    let targetVideo = null;

    // 1. THE ENGINE OVERLAY (The Theater)
    const engineUI = document.createElement('div');
    engineUI.id = 'yocrrz-engine-view';
    engineUI.style = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000; z-index: 2147483640; display: none;
        flex-direction: column; align-items: center; justify-content: center;
        opacity: 0; transition: opacity 0.4s ease;
    `;
    engineUI.innerHTML = `
        <div style="position:absolute; top:20px; width:90%; color:#ff3e3e; font-family:monospace; font-size:10px; display:flex; justify-content:space-between;">
            <span>[ SYSTEM: CINEMA_ENGINE_V3.5 ]</span>
            <span onclick="window.closeEngine()" style="cursor:pointer; color:#fff;">[ EXIT_LAB ]</span>
        </div>
        <div id="player-container" style="width:100%; max-height:80vh; background:#000;"></div>
        <div id="custom-controls" style="width:90%; margin-top:15px; font-family:monospace; color:#ff3e3e; font-size:11px; display:flex; justify-content:space-around; border-top:1px solid #222; padding-top:15px;">
             <span id="p-btn" style="cursor:pointer">[ PLAY/PAUSE ]</span>
             <span id="f-btn" style="cursor:pointer">[ FULLSCREEN ]</span>
        </div>
    `;
    document.body.appendChild(engineUI);

    // 2. THE TARGETING SCANNER
    const scanner = document.createElement('div');
    scanner.style = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(255, 62, 62, 0.1); border: 4px dashed #ff3e3e;
        z-index: 2147483645; display: none; pointer-events: none;
        align-items: center; justify-content: center; color: #ff3e3e; font-family: monospace;
    `;
    scanner.innerHTML = '[ TARGET_SELECTION_ACTIVE ]';
    document.body.appendChild(scanner);

    // 3. THE TRIGGER BUTTON
    const fab = document.createElement('div');
    fab.innerHTML = '🎬';
    fab.style = `
        position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px;
        background: #ff3e3e; color: #fff; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        z-index: 2147483647; cursor: pointer; font-size: 22px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
    `;
    document.body.appendChild(fab);

    // --- CORE ENGINE LOGIC ---

    const startTargeting = () => {
        isSelectionMode = true;
        scanner.style.display = 'flex';
        fab.style.background = '#4af626'; // Green for selection
    };

    const handleTarget = (e) => {
        if (!isSelectionMode) return;
        e.preventDefault(); e.stopPropagation();

        // Identify what the user touched
        const el = document.elementFromPoint(e.clientX, e.clientY);
        targetVideo = el.closest('video, iframe, canvas') || el;

        bootEngine();
    };

    const bootEngine = () => {
        isSelectionMode = false;
        engineActive = true;
        scanner.style.display = 'none';
        fab.style.display = 'none'; // Hide FAB in Cinema
        
        // Show the Vantablack Overlay
        engineUI.style.display = 'flex';
        setTimeout(() => engineUI.style.opacity = '1', 10);

        // "Port" the video into our player container
        const container = document.getElementById('player-container');
        container.appendChild(targetVideo);

        // Standardize the target's look for our player
        targetVideo.style.cssText = `
            width: 100% !important; height: auto !important; 
            max-height: 80vh !important; display: block !important;
            border: 1px solid #222;
        `;

        document.body.style.overflow = 'hidden';
    };

    window.closeEngine = () => {
        engineActive = false;
        engineUI.style.opacity = '0';
        setTimeout(() => engineUI.style.display = 'none', 400);
        fab.style.display = 'flex';
        fab.style.background = '#ff3e3e';
        
        // Return video to original spot? 
        // Actually, refresh is easier or we can save original parent if needed.
        window.location.reload(); // Hard reset to restore page integrity
    };

    // --- BINDINGS ---
    fab.onclick = (e) => { e.stopPropagation(); startTargeting(); };
    window.addEventListener('click', handleTarget, true);

    // Simple custom controls logic
    document.getElementById('p-btn').onclick = () => {
        if (targetVideo.paused) targetVideo.play();
        else targetVideo.pause();
    };
    document.getElementById('f-btn').onclick = () => targetVideo.requestFullscreen();

})();
