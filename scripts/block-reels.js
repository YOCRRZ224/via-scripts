// ==UserScript==
// @name         Instagram Clean Mode (Reels Blocker)
// @namespace    yocrrz.dev
// @version      1.1
// @description  Hides Instagram Reels tab, blocks reels pages, and adds a floating toggle button to enable/disable clean mode anytime.
// @author       Yocrrz
// @match        *://www.instagram.com/*
// @run-at       document-idle
// @grant        none
// @category     UI
// @icon         🧹
// ==/UserScript==

(function () {

  let enabled = localStorage.getItem("ig_clean_mode") !== "off";

  // 🔘 Toggle Button
  const btn = document.createElement("div");
  btn.innerText = enabled ? "🧹 ON" : "🧹 OFF";
  btn.style = `
    position:fixed;
    bottom:90px;
    right:16px;
    padding:8px 10px;
    background:#111;
    color:#ccc;
    border:1px solid #333;
    border-radius:8px;
    font-size:12px;
    z-index:999999;
    cursor:pointer;
    font-family:monospace;
  `;
  document.body.appendChild(btn);

  btn.onclick = () => {
    enabled = !enabled;
    localStorage.setItem("ig_clean_mode", enabled ? "on" : "off");
    btn.innerText = enabled ? "🧹 ON" : "🧹 OFF";
    location.reload();
  };

  function hideReels() {
    if (!enabled) return;

    // Hide reels tab
    document.querySelectorAll('a[href="/reels/"], a[href*="/reels"]').forEach(el => {
      el.style.display = "none";
    });
  }

  function blockReelsPage() {
    if (!enabled) return;

    if (location.pathname.startsWith("/reels")) {
      document.body.innerHTML = `
        <div style="
          color:#ccc;
          text-align:center;
          margin-top:80px;
          font-family:monospace;
        ">
          <h2>🚫 Reels Blocked</h2>
          <p>Stay focused.</p>
        </div>
      `;
    }
  }

  // Initial run
  hideReels();
  blockReelsPage();

  // Observer for dynamic UI
  const observer = new MutationObserver(() => {
    hideReels();
    blockReelsPage();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log("Instagram Clean Mode active");
})();
