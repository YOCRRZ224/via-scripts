// ==UserScript==
// @name         Instagram - Glass AMOLED Background
// @namespace    YOCRRZ
// @version      6.1
// @description  Blurred image background + AMOLED transparency + glass UI
// @match        https://www.instagram.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      wallpapercave.com
// ==/UserScript==

(function () {
    'use strict';

    // =========================================================
    // CONFIG
    // =========================================================

    const IMAGE_URL =
        'https://wallpapercave.com/mwp/wp13277854.png';

    const BLUR = 10;
    const BRIGHTNESS = 0.45;

    const BG_ID =
        'yocrrz-background';

    const STYLE_ID =
        'yocrrz-glass-style';


    // =========================================================
    // CSS
    // =========================================================

    const css = `

        /* =====================================================
           PAGE
        ===================================================== */

        html,
        body {

            background:
                transparent !important;

            background-color:
                transparent !important;

            color:
                #fff !important;
        }
/* =====================================================
   DM MESSAGE BUBBLE PROTECTION
   ===================================================== */

/* Don't let our transparency rules alter message
   bubble geometry or clipping. */

[role="main"] [style*="border-radius"],
[role="dialog"] [style*="border-radius"] {
    overflow: visible !important;
}


/* Preserve Instagram's message shapes */

[role="main"] svg,
[role="dialog"] svg,
[role="main"] svg path,
[role="dialog"] svg path {
    overflow: visible !important;
}


/* Don't apply glass effects to message internals */

[role="main"] [data-message-id],
[role="dialog"] [data-message-id] {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
}

        /* =====================================================
           AMOLED TRANSPARENCY
           IMPORTANT: include DIV again
        ===================================================== */

        body > div,
        #react-root,
        #react-root > div,

        div,
        section,
        article,
        header,
        footer,
        nav,
        main,
        aside,
        ul,
        ol,
        form {

            background-color:
                transparent !important;
        }


        /* =====================================================
           TEXT
        ===================================================== */

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        a,
        li,
        label,
        strong,
        b,
        em,
        i,
        cite,
        q,
        button {

            color:
                #fff !important;
        }


        span {

            color:
                inherit !important;
        }


        /* =====================================================
           ICONS
        ===================================================== */

        button svg,
        a svg,
        [role="button"] svg,
        [aria-label] > svg {

            color:
                #fff !important;
        }


        /* =====================================================
           MEDIA
        ===================================================== */

        img,
        video,
        iframe,
        canvas,
        picture {

            background-color:
                transparent !important;
        }


        /* =====================================================
           BACKGROUND IMAGE
        ===================================================== */

        #${BG_ID} {

            position:
                fixed !important;

            top:
                -25px !important;

            left:
                -25px !important;

            width:
                calc(100vw + 50px) !important;

            height:
                calc(100vh + 50px) !important;

            object-fit:
                cover !important;

            filter:
                blur(${BLUR}px)
                brightness(${BRIGHTNESS}) !important;

            z-index:
                0 !important;

            pointer-events:
                none !important;

            user-select:
                none !important;

            -webkit-user-select:
                none !important;

            display:
                block !important;
        }


        /* =====================================================
           INSTAGRAM ROOT
        ===================================================== */

        #react-root {

            position:
                relative !important;

            z-index:
                2 !important;

            background:
                transparent !important;

            background-color:
                transparent !important;
        }


        #react-root > div {

            background:
                transparent !important;

            background-color:
                transparent !important;
        }


        /* =====================================================
           TOP NAVIGATION
        ===================================================== */
/* =====================================================
   INSTAGRAM ACTION BUTTONS
   ===================================================== */

button {

    color:
        #fff !important;

    -webkit-text-fill-color:
        #fff !important;

    font-family:
        inherit !important;
}


/* Profile / action buttons */

button[type="button"] {

    color:
        #fff !important;
}


/* Button text */

button span {

    color:
        inherit !important;

    -webkit-text-fill-color:
        inherit !important;
}


/* =====================================================
   GLASS ACTION BUTTON
   ===================================================== */

.yocrrz-action-button {

    background:
        rgba(255,255,255,.13) !important;

    border:
        1px solid
        rgba(255,255,255,.20) !important;

    border-radius:
        10px !important;

    backdrop-filter:
        blur(14px) saturate(140%) !important;

    -webkit-backdrop-filter:
        blur(14px) saturate(140%) !important;

    box-shadow:
        inset 0 1px 0
        rgba(255,255,255,.12),

        0 4px 15px
        rgba(0,0,0,.18) !important;

    color:
        #fff !important;

    transition:
        background .15s ease,
        transform .15s ease !important;
}


.yocrrz-action-button:hover {

    background:
        rgba(255,255,255,.20) !important;
}


.yocrrz-action-button:active {

    transform:
        scale(.97) !important;
}
        nav,
        [role="navigation"] {

            background:
                rgba(255,255,255,.09) !important;

            backdrop-filter:
                blur(20px) saturate(140%) !important;

            -webkit-backdrop-filter:
                blur(20px) saturate(140%) !important;

            border:
                1px solid
                rgba(255,255,255,.14) !important;

            box-shadow:
                0 8px 30px
                rgba(0,0,0,.25),

                inset 0 1px 0
                rgba(255,255,255,.12) !important;

            border-radius:
                18px !important;

            overflow:
                visible !important;

            position:
                relative !important;

            z-index:
                20 !important;
        }


        /* =====================================================
           TOP NAV HIGHLIGHT
        ===================================================== */

        nav::before,
        [role="navigation"]::before {

            content:
                "" !important;

            position:
                absolute !important;

            inset:
                0 !important;

            border-radius:
                inherit !important;

            pointer-events:
                none !important;

            background:
                linear-gradient(
                    135deg,
                    rgba(255,255,255,.12),
                    transparent 45%
                ) !important;

            opacity:
                .8 !important;

            z-index:
                0 !important;
        }


        /* =====================================================
           BOTTOM NAV
        ===================================================== */

        .yocrrz-bottom-glass {

            background:
                rgba(255,255,255,.10) !important;

            backdrop-filter:
                blur(22px) saturate(145%) !important;

            -webkit-backdrop-filter:
                blur(22px) saturate(145%) !important;

            border:
                1px solid
                rgba(255,255,255,.15) !important;

            box-shadow:
                0 -8px 30px
                rgba(0,0,0,.25),

                inset 0 1px 0
                rgba(255,255,255,.12) !important;

           

            overflow:
                visible !important;

            z-index:
                20 !important;
        }


        /* =====================================================
           BOTTOM GLASS HIGHLIGHT
        ===================================================== */

        .yocrrz-bottom-glass::before {

            content:
                "" !important;

            position:
                absolute !important;

            inset:
                0 !important;

            border-radius:
                inherit !important;

            pointer-events:
                none !important;

            background:
                linear-gradient(
                    135deg,
                    rgba(255,255,255,.10),
                    transparent 50%
                ) !important;
        }


        /* =====================================================
           INPUT GLASS
        ===================================================== */

        .yocrrz-input-glass {

            background:
                rgba(255,255,255,.12) !important;

            backdrop-filter:
                blur(20px) saturate(150%) !important;

            -webkit-backdrop-filter:
                blur(20px) saturate(150%) !important;

            border:
                1px solid
                rgba(255,255,255,.18) !important;

            box-shadow:
                inset 0 1px 0
                rgba(255,255,255,.12),

                0 5px 25px
                rgba(0,0,0,.20) !important;

            

            overflow:
                visible !important;

            position:
                relative !important;

            z-index:
                30 !important;
        }


        .yocrrz-input-glass:focus-within {

            background:
                rgba(255,255,255,.17) !important;

            border-color:
                rgba(255,255,255,.28) !important;

            box-shadow:
                inset 0 1px 0
                rgba(255,255,255,.16),

                0 6px 28px
                rgba(0,0,0,.25) !important;
        }


        /* =====================================================
           ACTUAL INPUT
        ===================================================== */

        input,
        textarea,
        [contenteditable="true"] {

            color:
                rgba(255,255,255,.96) !important;

            caret-color:
                #fff !important;

            background:
                transparent !important;

            border:
                none !important;

            outline:
                none !important;

            box-shadow:
                none !important;

            opacity:
                1 !important;

            -webkit-text-fill-color:
                rgba(255,255,255,.96) !important;
        }


        input::placeholder,
        textarea::placeholder {

            color:
                rgba(255,255,255,.62) !important;

            opacity:
                1 !important;
        }


        /* =====================================================
           SEARCH CONTAINER
        ===================================================== */

        [role="search"] {

            color:
                #fff !important;

            overflow:
                visible !important;

            position:
                relative !important;

            z-index:
                50 !important;
        }


        [role="search"] svg {

            color:
                rgba(255,255,255,.9) !important;

            opacity:
                .9 !important;
        }


        /* =====================================================
           SEARCH GLASS
        ===================================================== */

        .yocrrz-search-glass {

            background:
                rgba(255,255,255,.14) !important;

            backdrop-filter:
                blur(18px) saturate(145%) !important;

            -webkit-backdrop-filter:
                blur(18px) saturate(145%) !important;

            border:
                1px solid
                rgba(255,255,255,.18) !important;

            border-radius:
                14px !important;

            box-shadow:
                inset 0 1px 0
                rgba(255,255,255,.12),

                0 5px 25px
                rgba(0,0,0,.18) !important;

            overflow:
                visible !important;

            position:
                relative !important;

            z-index:
                50 !important;
        }


        /* =====================================================
           SEARCH RESULTS
        ===================================================== */

        [role="dialog"],
        [role="listbox"],
        [role="list"] {

            overflow:
                visible !important;
        }


        [role="dialog"],
        [role="listbox"] {

            position:
                relative !important;

            z-index:
                100 !important;
        }


        /* =====================================================
           SEARCH RESULTS / CONTENT
        ===================================================== */

        [role="main"] {

            position:
                relative !important;

            z-index:
                5 !important;

            overflow:
                visible !important;
        }


        /* =====================================================
           SEARCH MODE
        ===================================================== */

        body.yocrrz-search-active
        .yocrrz-bottom-glass {

            background:
                rgba(255,255,255,.08) !important;

            backdrop-filter:
                blur(18px) !important;

            -webkit-backdrop-filter:
                blur(18px) !important;

            z-index:
                5 !important;
        }


        /* =====================================================
           MESSAGE / SVG SAFETY
        ===================================================== */

        [role="dialog"] svg,
        [role="main"] svg {

            overflow:
                visible !important;
        }


        /* =====================================================
           BUTTONS
        ===================================================== */

        button {

            color:
                #fff !important;
        }


        /* =====================================================
           LINKS
        ===================================================== */

        a {

            color:
                #fff !important;
        }

    `;


    // =========================================================
    // INJECT CSS
    // =========================================================

    const style =
        document.createElement('style');

    style.id =
        STYLE_ID;

    style.textContent =
        css;

    document.documentElement.appendChild(
        style
    );
    


    // =========================================================
    // LOAD BACKGROUND
    // =========================================================

    GM_xmlhttpRequest({

        method:
            'GET',

        url:
            IMAGE_URL,

        responseType:
            'blob',

        onload:
            function (response) {

                if (
                    response.status < 200 ||
                    response.status >= 300
                ) {

                    console.error(
                        '[YOCRRZ] Image HTTP error:',
                        response.status
                    );

                    return;
                }


                const objectURL =
                    URL.createObjectURL(
                        response.response
                    );


                const old =
                    document.getElementById(
                        BG_ID
                    );


                if (old) {

                    old.remove();
                }


                const image =
                    document.createElement(
                        'img'
                    );


                image.id =
                    BG_ID;

                image.src =
                    objectURL;

                image.alt =
                    '';


                document.documentElement
                    .prepend(image);


                console.log(
                    '[YOCRRZ] Background loaded 🔥'
                );
            },


        onerror:
            function (error) {

                console.error(
                    '[YOCRRZ] Image request failed:',
                    error
                );
            }

    });


    // =========================================================
    // SEARCH DETECTION
    // =========================================================
    function detectActionButtons() {

    const buttons =
        document.querySelectorAll(
            'button, [role="button"]'
        );

    for (const button of buttons) {

        if (
            button.id === BG_ID
        ) {
            continue;
        }

        const text =
            (
                button.innerText ||
                button.textContent ||
                ''
            )
            .trim()
            .toLowerCase();

        if (!text) {
            continue;
        }

        const isAction =
            text === 'follow' ||
            text === 'following' ||
            text === 'unfollow' ||
            text === 'edit profile' ||
            text === 'message' ||
            text === 'requested' ||
            text === 'subscribe' ||
            text === 'subscribed';

        if (
            isAction
        ) {

            button.classList.add(
                'yocrrz-action-button'
            );
        }
    }
}

    function isSearchMode() {

        const path =
            location.pathname;


        if (
            path.includes(
                '/explore/search'
            )
        ) {

            return true;
        }


        const active =
            document.activeElement;


        if (
            active &&
            active.matches &&
            active.matches(
                'input, textarea, [contenteditable="true"]'
            )
        ) {

            const placeholder =
                (
                    active.getAttribute(
                        'placeholder'
                    ) || ''
                ).toLowerCase();


            const aria =
                (
                    active.getAttribute(
                        'aria-label'
                    ) || ''
                ).toLowerCase();


            if (
                placeholder.includes('search') ||
                aria.includes('search')
            ) {

                return true;
            }
        }


        return !!document.querySelector(
            '[role="search"]'
        );
    }


    // =========================================================
    // SEARCH STATE
    // =========================================================

    function updateSearchState() {

        if (
            isSearchMode()
        ) {

            document.body.classList.add(
                'yocrrz-search-active'
            );

        } else {

            document.body.classList.remove(
                'yocrrz-search-active'
            );
        }
    }


    // =========================================================
    // BOTTOM NAV DETECTOR
    // =========================================================

    function detectBottomNavigation() {

        const searchActive =
            isSearchMode();


        const elements =
            document.querySelectorAll(
                'body *'
            );


        for (
            const element of elements
        ) {

            if (
                element.id === BG_ID
            ) {

                continue;
            }


            if (
                element === document.body ||
                element === document.documentElement
            ) {

                continue;
            }


            const rect =
                element.getBoundingClientRect();


            const computed =
                getComputedStyle(
                    element
                );


            /* Only genuinely fixed elements. */

            if (
                computed.position !==
                'fixed'
            ) {

                continue;
            }


            /* Must touch bottom. */

            const distanceFromBottom =
                Math.abs(
                    window.innerHeight -
                    rect.bottom
                );


            if (
                distanceFromBottom > 15
            ) {

                continue;
            }


            /* Wide enough to be navigation. */

            if (
                rect.width <
                window.innerWidth * .55
            ) {

                continue;
            }


            /* Reasonable navigation height. */

            if (
                rect.height < 45 ||
                rect.height > 90
            ) {

                continue;
            }


            /* Ignore invisible elements. */

            if (
                computed.display === 'none' ||
                computed.visibility === 'hidden' ||
                computed.opacity === '0'
            ) {

                continue;
            }


            /*
             * Don't style obvious search/result
             * containers as bottom navigation.
             */

            if (
                element.matches(
                    'form, [role="search"], [role="dialog"], [role="listbox"], [role="list"]'
                )
            ) {

                continue;
            }


            /*
             * Search can have fixed result layers.
             * Don't aggressively detect them.
             */

            if (
                searchActive &&
                (
                    element.querySelector(
                        'input'
                    ) ||
                    element.querySelector(
                        '[role="search"]'
                    )
                )
            ) {

                continue;
            }


            element.classList.add(
                'yocrrz-bottom-glass'
            );
        }
    }


    // =========================================================
    // INPUT WRAPPER DETECTOR
    // =========================================================

    function detectInputs() {

        const inputs =
            document.querySelectorAll(
                'input, textarea, [contenteditable="true"]'
            );


        for (
            const input of inputs
        ) {

            let parent =
                input.parentElement;


            for (
                let level = 0;
                level < 5 && parent;
                level++
            ) {

                const rect =
                    parent.getBoundingClientRect();


                const computed =
                    getComputedStyle(
                        parent
                    );


                const isFlex =
                    computed.display ===
                        'flex' ||

                    computed.display ===
                        'inline-flex';


                if (
                    !isFlex
                ) {

                    parent =
                        parent.parentElement;

                    continue;
                }


                /*
                 * Don't style giant responsive
                 * containers.
                 */

                const reasonableWidth =
                    rect.width >=
                    180 &&

                    rect.width <=
                    window.innerWidth * .95;


                const reasonableHeight =
                    rect.height >=
                    35 &&

                    rect.height <=
                    100;


                if (
                    reasonableWidth &&
                    reasonableHeight
                ) {

                    /*
                     * Don't glass the bottom
                     * navigation itself.
                     */

                    if (
                        !parent.classList.contains(
                            'yocrrz-bottom-glass'
                        )
                    ) {

                        parent.classList.add(
                            'yocrrz-input-glass'
                        );
                    }

                    break;
                }


                parent =
                    parent.parentElement;
            }
        }
    }


    // =========================================================
    // SEARCH FORM DETECTOR
    // =========================================================

    function detectSearch() {

        const forms =
            document.querySelectorAll(
                'form'
            );


        for (
            const form of forms
        ) {

            const input =
                form.querySelector(
                    'input, textarea'
                );


            if (
                !input
            ) {

                continue;
            }


            const rect =
                form.getBoundingClientRect();


            /*
             * Don't style huge responsive
             * page containers.
             */

            if (
                rect.width >
                window.innerWidth * .95
            ) {

                continue;
            }


            if (
                rect.width < 150 ||
                rect.height < 30 ||
                rect.height > 100
            ) {

                continue;
            }


            form.classList.add(
                'yocrrz-search-glass'
            );
        }
    }


    // =========================================================
    // CLEANUP
    // =========================================================

    function cleanupBottomGlass() {

        const elements =
            document.querySelectorAll(
                '.yocrrz-bottom-glass'
            );


        for (
            const element of elements
        ) {

            const rect =
                element.getBoundingClientRect();


            const computed =
                getComputedStyle(
                    element
                );


            const valid =
                computed.position ===
                    'fixed' &&

                Math.abs(
                    window.innerHeight -
                    rect.bottom
                ) <= 15 &&

                rect.width >
                    window.innerWidth * .55 &&

                rect.height >= 45 &&

                rect.height <= 90;


            if (
                !valid
            ) {

                element.classList.remove(
                    'yocrrz-bottom-glass'
                );
            }
        }
    }


    // =========================================================
    // FORCE ROOT TRANSPARENCY
    // =========================================================

    function forceRootTransparency() {

        const root =
            document.getElementById(
                'react-root'
            );


        if (
            !root
        ) {

            return;
        }


        root.style.setProperty(
            'background',
            'transparent',
            'important'
        );


        root.style.setProperty(
            'background-color',
            'transparent',
            'important'
        );


        const children =
            root.querySelectorAll(
                ':scope > div'
            );


        for (
            const child of children
        ) {

            /*
             * Don't overwrite an actual glass
             * component.
             */

            if (
                child.classList.contains(
                    'yocrrz-input-glass'
                ) ||

                child.classList.contains(
                    'yocrrz-search-glass'
                ) ||

                child.classList.contains(
                    'yocrrz-bottom-glass'
                )
            ) {

                continue;
            }


            child.style.setProperty(
                'background-color',
                'transparent',
                'important'
            );
        }
    }


    // =========================================================
    // UI SCAN
    // =========================================================
function scanUI() {

    updateSearchState();

    forceRootTransparency();

    detectBottomNavigation();

    detectInputs();

    detectSearch();

    detectActionButtons();

    cleanupBottomGlass();
}

    // =========================================================
    // THROTTLED SCANNER
    // =========================================================

    let scanQueued =
        false;


    function requestScan() {

        if (
            scanQueued
        ) {

            return;
        }


        scanQueued =
            true;


        requestAnimationFrame(
            function () {

                scanQueued =
                    false;

                scanUI();
            }
        );
    }


    // =========================================================
    // INITIAL SCANS
    // =========================================================

    function startScanner() {

        requestScan();


        setTimeout(
            requestScan,
            250
        );


        setTimeout(
            requestScan,
            600
        );


        setTimeout(
            requestScan,
            1200
        );


        setTimeout(
            requestScan,
            2500
        );


        setTimeout(
            requestScan,
            5000
        );
    }


    // =========================================================
    // MUTATION OBSERVER
    // =========================================================

    const observer =
        new MutationObserver(
            function () {

                requestScan();
            }
        );


    observer.observe(
        document.documentElement,
        {
            childList:
                true,

            subtree:
                true
        }
    );


    // =========================================================
    // URL CHANGES
    // =========================================================

    let lastURL =
        location.href;


    setInterval(
        function () {

            if (
                location.href !==
                lastURL
            ) {

                lastURL =
                    location.href;

                requestScan();
            }

        },
        400
    );


    // =========================================================
    // START
    // =========================================================

    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            startScanner,
            {
                once:
                    true
            }
        );

    } else {

        startScanner();
    }


    // =========================================================
    // RESIZE
    // =========================================================

    let resizeTimer;


    window.addEventListener(
        'resize',
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    requestScan,
                    150
                );
        }
    );


    // =========================================================
    // FOCUS
    // =========================================================

    document.addEventListener(
        'focusin',
        function () {

            requestScan();

        },
        true
    );


    document.addEventListener(
        'focusout',
        function () {

            setTimeout(
                requestScan,
                80
            );

        },
        true
    );


    // =========================================================
    // DEBUG
    // =========================================================

    console.log(
        '[YOCRRZ] Glass AMOLED v6.1 loaded ✨'
    );

})();
