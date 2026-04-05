// ==UserScript==
// @name         Minecraft adblock
// @namespace    yocrrz.dev
// @version      1.0.0
// @description  Bypass adblock detection on specific Minecraft community sites.
// @author       YOCRRZ
// @category     Utility
// @icon         🛡️
// @include      *
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function(){const w = window;
const key=encodeURIComponent('adfixer');
const hostname = location.host;
const adfix = ["www.minecraft-schematics.com", "www.planetminecraft.com"];
const isaDark = adfix.some(keyword => {
    if (hostname.match(keyword)) {
      return true;
    };
    return false;
  });
if(w[key]|| !isaDark){return;}
try{
w[key]=true;
$(document).ready(function() { setTimeout(function() { adBlockNotDetected();}, 3000); });
}
catch(err){alert.log('adfixer：'+err);}
})();
