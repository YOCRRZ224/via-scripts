// ==UserScript==
// @name         Dark Mode Fix
// @namespace    yocrrz.dev
// @version      1.0.0
// @description  Forces a dark theme on specific Minecraft wiki and community domains.
// @author       YOCRRZ
// @category     UI Enhancement
// @icon         🌙
// @include      *
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function(){const w = window;
const key=encodeURIComponent('DarkFixer');
const hostname = location.host;
const darkfix = ["minecraft.fandom.com","www.planetminecraft.com"];
const isDark = darkfix.some(keyword => {
    if (hostname.match(keyword)) {
      return true;
    };
    return false;
  });
if(w[key]|| !isDark){return;}
try{
w[key]=true;
const y=typeof(document.documentElement)!="undefined"?document.documentElement:document.body;
const d=document.createElement('style');
d.innerHTML=":not(a){color:white !important; background-color:black !important;}"
y.append(d);
}
catch(err){console.log('DarkReader：',err);}
})();
