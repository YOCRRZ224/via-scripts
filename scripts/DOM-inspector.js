// ==UserScript==
// @name         YOCRRZ DOM Inspector
// @namespace    yocrrz.dev
// @version      1.0
// @description  YOCRRZ DOM Inspector is a lightweight on-page inspection tool designed for quick element analysis directly within the browser, especially on mobile where traditional developer tools are limited. It allows you to visually highlight elements by tapping on them, while displaying key structural information such as tag name, ID, and class in real time. With a simple toggle interface and non-intrusive overlay, it provides an efficient way to explore page layouts, debug UI structures, and understand DOM hierarchies without leaving the page or opening external tools.
// @author       YOCRRZ
// @category     Dev Tools
// @icon         🎯
// @tags         dom, inspector, debug, ui, elements
// @run-at       document-idle
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {

  let enabled = false;

  const btn = document.createElement("div");
  btn.innerText = "🎯";
  btn.style = `
    position:fixed;
    bottom:140px;
    right:20px;
    width:50px;
    height:50px;
    background:#000;
    color:#0f0;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    z-index:999999;
  `;
  document.body.appendChild(btn);

  const info = document.createElement("div");
  info.style = `
    position:fixed;
    top:10px;
    left:10px;
    background:#000;
    color:#0f0;
    padding:8px;
    border-radius:8px;
    z-index:999999;
    font-family:monospace;
  `;
  info.innerText = "Inspector OFF";
  document.body.appendChild(info);

  const highlight = document.createElement("div");
  highlight.style = `
    position:absolute;
    border:2px solid red;
    pointer-events:none;
    z-index:999998;
  `;
  document.body.appendChild(highlight);

  btn.onclick = () => {
    enabled = !enabled;
    info.innerText = enabled ? "Inspector ON" : "Inspector OFF";
  };

  document.addEventListener("click", (e) => {
    if (!enabled) return;

    e.preventDefault();
    e.stopPropagation();

    const el = e.target;
    const rect = el.getBoundingClientRect();

    highlight.style.top = rect.top + window.scrollY + "px";
    highlight.style.left = rect.left + window.scrollX + "px";
    highlight.style.width = rect.width + "px";
    highlight.style.height = rect.height + "px";

    info.innerText = `
Tag: ${el.tagName}
ID: ${el.id || "-"}
Class: ${el.className || "-"}
    `;
  }, true);

})();
