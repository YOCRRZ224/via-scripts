// ==UserScript==
// @name         Mobile DevTools
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
const dif= document.createElement('div');
  dif.innerHTML = "⚙️";
  dif.setAttribute('style', `
    position: fixed;
    bottom: 2.5%;
    right: 5%;user-select:none;
    z-index: 999999998;
  `);
document.documentElement.appendChild(dif);
dif.onclick=()=>{endure()};

function endure(){
 var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload =()=> { eruda.init() } ;
dif.style.display="none";
}

})();
