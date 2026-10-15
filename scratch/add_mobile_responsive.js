const fs = require('fs');
const path = require('path');

const deckScriptPath = path.join(__dirname, 'build_updated_deck.js');
let content = fs.readFileSync(deckScriptPath, 'utf8');

// 1. Replace the existing basic @media (max-width: 960px) with comprehensive mobile rules
const oldMedia960 = `    @media (max-width: 960px) {
      .slide.topic.on,
      .slide.title.on {
        grid-template-columns: minmax(0, 1fr);
      }
    }`;

const newResponsiveCss = `    /* Mobile & Tablet Responsive Layouts */
    @media (max-width: 860px) {
      body {
        padding: 0 max(10px, env(safe-area-inset-right, 0px)) 0 max(10px, env(safe-area-inset-left, 0px));
      }

      main {
        overflow-y: auto;
        overflow-x: hidden;
        justify-content: flex-start;
        -webkit-overflow-scrolling: touch;
        padding: 8px 0 16px;
      }

      .slide.topic.on,
      .slide.title.on {
        display: flex;
        flex-direction: column;
        max-height: none;
        height: auto;
        gap: 16px;
      }

      .slide.wide.on {
        max-height: none;
        height: auto;
        justify-content: flex-start;
      }

      .stagewrap {
        width: 100%;
      }

      .stagewrap canvas {
        max-height: 46vh;
        width: 100%;
        height: auto;
      }

      .tw {
        max-height: none;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      .tw table {
        min-width: 720px;
      }
    }

    @media (max-width: 680px) {
      .bar {
        gap: 6px;
        height: 38px;
      }

      .brand {
        font-size: 10px;
        letter-spacing: 0.04em;
      }

      .rail button {
        padding: 4px 6px;
        font-size: 10px;
      }

      .tools button {
        padding: 4px 6px;
        font-size: 10px;
      }

      .tools #btnFs {
        display: none;
      }

      .seg {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-auto-flow: row;
      }

      .seg button {
        border-left: 1px solid var(--ink);
        border-top: 1px solid var(--ink);
        padding: 6px 6px 5px;
        font-size: 10px;
      }

      .seg button:nth-child(2n+1) {
        border-left: 0;
      }

      .seg button:nth-child(1),
      .seg button:nth-child(2) {
        border-top: 0;
      }

      .row {
        gap: 4px;
      }

      .btn {
        padding: 5px 8px;
        font-size: 10px;
      }

      .btn.pri {
        min-width: 68px;
      }
    }

    @media (max-width: 520px) {
      .brand {
        display: none;
      }

      .pc {
        grid-template-columns: 1fr;
        gap: 8px;
      }

      .agenda {
        grid-template-columns: 1fr;
        max-width: 100%;
      }

      .key {
        grid-template-columns: 1fr;
      }

      .legend {
        padding: 10px 12px;
      }

      .foot {
        gap: 8px;
        padding-block: 8px;
      }

      .foot button {
        padding: 4px 8px;
        font-size: 11px;
      }

      .foot .hint {
        display: none;
      }
    }`;

if (!content.includes(oldMedia960)) {
  console.error('Could not find oldMedia960');
  process.exit(1);
}
content = content.replace(oldMedia960, newResponsiveCss);

// 2. Add touch swipe handling for mobile devices
const touchHandlerCode = `
      /* Touch swipe gestures for mobile navigation */
      let touchStartX = 0, touchStartY = 0;
      window.addEventListener('touchstart', e => {
        if (e.touches && e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      window.addEventListener('touchend', e => {
        if (e.changedTouches && e.changedTouches.length === 1) {
          const dx = e.changedTouches[0].clientX - touchStartX;
          const dy = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
            if (dx < 0) show(cur + 1);
            else show(cur - 1);
          }
        }
      }, { passive: true });
`;

const frameCodeMarker = '      let last = performance.now();';
if (!content.includes(frameCodeMarker)) {
  console.error('Could not find frameCodeMarker');
  process.exit(1);
}
content = content.replace(frameCodeMarker, touchHandlerCode + '\n' + frameCodeMarker);

fs.writeFileSync(deckScriptPath, content, 'utf8');
console.log('Successfully updated build_updated_deck.js with mobile responsiveness and touch swipe.');

// Recompile to water-treatment.html
require('./build_updated_deck.js');
