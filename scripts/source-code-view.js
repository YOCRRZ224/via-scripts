// ==UserScript==
// @name         YOCRRZ Source Explorer
// @namespace    yocrrz.dev
// @version      1.0
// @description  Full-page source code viewer with syntax highlighting for mobile debugging.
// @author       YOCRRZ
// @category     Dev Tools
// @icon         📄
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 1. Inject Highlight.js & Theme (Atom One Dark)
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
    document.head.appendChild(script);

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css";
    document.head.appendChild(style);

    // 2. Create the UI Elements
    const ui = document.createElement('div');
    ui.id = "yocrrz-source-viewer";
    ui.style = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #0a0a0a; z-index: 1000000; display: none;
        flex-direction: column; font-family: 'JetBrains Mono', monospace;
    `;

    ui.innerHTML = `
        <div style="background: #1a1a1a; padding: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
            <span style="color: #ff3e3e; font-weight: bold; font-size: 0.8rem;">[ SOURCE_EXPLORER_V1 ]</span>
            <div style="display: flex; gap: 10px;">
                <button id="copy-src" style="background: #333; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; font-size: 0.7rem;">COPY</button>
                <button id="close-src" style="background: #ff3e3e; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; font-size: 0.7rem;">EXIT</button>
            </div>
        </div>
        <pre style="margin: 0; flex: 1; overflow: auto; background: #0a0a0a;"><code class="language-html" id="code-box"></code></pre>
    `;
    document.body.appendChild(ui);

    // 3. Floating Trigger Button
    const trigger = document.createElement('div');
    trigger.innerText = "VIEW_SRC";
    trigger.style = `
        position: fixed; bottom: 80px; right: 20px;
        background: rgba(255, 62, 62, 0.8); color: white;
        padding: 8px 12px; border-radius: 4px; z-index: 999999;
        font-size: 0.65rem; font-weight: bold; cursor: pointer;
        backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.1);
    `;
    document.body.appendChild(trigger);

    // 4. Logic & Interaction
    trigger.onclick = () => {
        const rawHTML = document.documentElement.outerHTML;
        const codeBox = document.getElementById('code-box');
        
        // Escape HTML for display
        codeBox.textContent = rawHTML;
        ui.style.display = 'flex';
        
        // Trigger Highlight.js
        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(codeBox);
        }
    };

    document.getElementById('close-src').onclick = () => ui.style.display = 'none';

    document.getElementById('copy-src').onclick = () => {
        const text = document.getElementById('code-box').textContent;
        navigator.clipboard.writeText(text).then(() => {
            document.getElementById('copy-src').innerText = "COPIED!";
            setTimeout(() => { document.getElementById('copy-src').innerText = "COPY"; }, 2000);
        });
    };

})();
