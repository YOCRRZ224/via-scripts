// ==UserScript==
// @name         Mobile DevTools (no lazy load)
// @namespace    yocrrz.dev
// @version      2.0
// @description  Injects Eruda console for mobile debugging with lazy-load support.
// @author       YOCRRZ
// @category     Dev Tools
// @icon         ⚙️
// @match        https://*/*
// @exclude      play.google.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
 var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload =()=> { eruda.init() } ;
dif.style.display="none";
})();
