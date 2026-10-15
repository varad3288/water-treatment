const fs = require('fs');
const path = require('path');

const deckScriptPath = path.join(__dirname, 'build_updated_deck.js');
let scriptContent = fs.readFileSync(deckScriptPath, 'utf8');

// 1. Refined CSS:
const cssStartMarker = '    html, body {';
const cssEndMarker = '    /* Footer & Notes */';

const startIdx = scriptContent.indexOf(cssStartMarker);
const endIdx = scriptContent.indexOf(cssEndMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find CSS markers:', { startIdx, endIdx });
  process.exit(1);
}

const refinedCss = `    html, body {
      height: 100%;
      height: 100dvh;
      overflow: hidden;
      margin: 0;
      background: var(--paper);
      color: var(--ink);
      font-family: var(--f-body);
      font-size: 13px;
      line-height: 1.38;
      -webkit-font-smoothing: antialiased;
    }

    body {
      display: flex;
      flex-direction: column;
      padding: 0 max(16px, env(safe-area-inset-right, 0px)) 0 max(16px, env(safe-area-inset-left, 0px));
    }

    /* Top Navigation Bar */
    .bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-block: 4px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--f-mono);
      font-size: 11px;
      flex-wrap: nowrap;
      flex: none;
      height: 38px;
    }

    .brand {
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink);
      white-space: nowrap;
      flex: none;
      font-size: 11px;
    }

    .rail {
      display: flex;
      align-items: center;
      gap: 2px;
      flex: 1;
      justify-content: center;
      min-width: 0;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding-inline: 4px;
    }

    .rail::-webkit-scrollbar {
      display: none;
    }

    .rail button {
      background: none;
      border: 1px solid transparent;
      border-radius: 2px;
      color: var(--ink2);
      padding: 4px 7px;
      cursor: pointer;
      font: 500 10.5px var(--f-mono);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      transition: all 0.15s;
      flex: none;
      white-space: nowrap;
    }

    .rail button span {
      opacity: 0.5;
      margin-right: 3px;
    }

    .rail button:hover {
      color: var(--ink);
      background: var(--panel);
    }

    .rail button.on {
      color: var(--ink);
      background: var(--panel);
      border-color: var(--rule);
      font-weight: 600;
    }

    .tools {
      display: flex;
      gap: 5px;
      flex: none;
    }

    .tools button {
      background: none;
      border: 1px solid var(--rule);
      border-radius: 2px;
      padding: 4px 8px;
      cursor: pointer;
      font: 500 10.5px var(--f-mono);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--ink2);
      transition: all 0.15s;
      white-space: nowrap;
    }

    .tools button:hover,
    .tools button[aria-pressed="true"] {
      color: var(--ink);
      border-color: var(--ink);
      background: var(--panel);
    }

    main {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4px 0;
    }

    .slide {
      display: none;
    }

    .slide.on {
      display: block;
    }

    .slide.topic.on {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
      gap: clamp(14px, 2vw, 24px);
      align-items: center;
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      max-height: calc(100dvh - 78px);
    }

    .slide.title.on {
      display: grid;
      grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
      gap: clamp(18px, 3vw, 36px);
      align-items: center;
      max-width: 1160px;
      margin: 0 auto;
      width: 100%;
      max-height: calc(100dvh - 78px);
    }

    .slide.wide.on {
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 1160px;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      max-height: calc(100dvh - 78px);
    }

    @media (max-width: 960px) {
      .slide.topic.on,
      .slide.title.on {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .eyebrow {
      margin: 0 0 3px;
      font: 600 10px var(--f-mono);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink2);
    }

    h1 {
      font: 800 clamp(22px, 2.5vw, 34px)/1.08 var(--f-display);
      letter-spacing: -0.03em;
      margin: 0 0 5px;
      max-width: 24ch;
      text-wrap: balance;
    }

    h2 {
      font: 800 clamp(17px, 1.9vw, 24px)/1.08 var(--f-display);
      letter-spacing: -0.025em;
      margin: 0 0 3px;
      text-wrap: balance;
    }

    h3 {
      margin: 0 0 3px;
      font: 600 10.5px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink2);
    }

    h4 {
      margin: 0;
      padding-bottom: 2px;
      border-bottom: 1.5px solid var(--ink);
      font: 600 10px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .lede {
      font-size: clamp(12px, 1vw, 13.5px);
      line-height: 1.35;
      margin: 0 0 4px;
      max-width: 60ch;
    }

    .by {
      margin: 4px 0 0;
      font: 400 11.5px var(--f-mono);
      color: var(--ink2);
    }

    .by b {
      color: var(--ink);
      font-weight: 600;
    }

    .agenda {
      list-style: none;
      margin: 8px 0 0;
      padding: 0;
      border-top: 1px solid var(--rule);
      max-width: 540px;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 12px;
    }

    .agenda li {
      border-bottom: 1px solid var(--rule);
    }

    .agenda button {
      display: flex;
      align-items: center;
      gap: 7px;
      width: 100%;
      text-align: left;
      background: none;
      border: 0;
      padding: 4px 2px;
      cursor: pointer;
      font-size: 12px;
      color: var(--ink);
      transition: background 0.15s, padding-left 0.15s;
    }

    .agenda button:hover {
      background: var(--panel);
      padding-left: 5px;
    }

    .agenda b {
      font: 600 10.5px var(--f-mono);
      color: var(--ink2);
      min-width: 1.8em;
    }

    .agenda span {
      display: none;
    }

    .key {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 5px 12px;
      margin: 0;
    }

    .key div {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      min-width: 0;
    }

    .key small {
      display: block;
      font: 400 10px var(--f-mono);
      color: var(--ink2);
    }

    .dot {
      flex: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--c);
      color: var(--iontext);
      display: grid;
      place-items: center;
      font: 600 9.5px var(--f-mono);
    }

    .legend {
      border: 1px solid var(--rule);
      background: var(--panel);
      padding: 10px 14px;
      border-radius: 2px;
    }

    .legend h3 {
      margin: 0 0 2px;
      font: 600 10.5px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink);
    }

    .legend .sub {
      margin: 0 0 6px;
      font: 400 10px var(--f-mono);
      color: var(--ink2);
      line-height: 1.3;
    }

    .quick-guide {
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px solid var(--rule);
    }

    .quick-guide h4 {
      margin: 0 0 3px;
      font: 600 10px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink2);
      border-bottom: 0;
      padding-bottom: 0;
    }

    .quick-guide ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
      font: 400 10.5px var(--f-mono);
      color: var(--ink2);
    }

    .quick-guide b {
      color: var(--ink);
      font-weight: 600;
    }

    /* Simulation stage wrapper & canvas */
    .stagewrap {
      min-width: 0;
    }

    .stagewrap canvas {
      display: block;
      width: 100%;
      max-height: calc(100dvh - 150px);
      height: auto;
      aspect-ratio: 800/520;
      border: 1px solid var(--rule);
      background: var(--paper);
    }

    .ctl {
      margin-top: 5px;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .grow {
      flex: 1;
    }

    .lab {
      font: 600 10px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink2);
    }

    .btn {
      background: transparent;
      border: 1px solid var(--ink);
      color: var(--ink);
      padding: 4px 10px;
      border-radius: 2px;
      cursor: pointer;
      font: 600 10.5px var(--f-mono);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      transition: background 0.15s, opacity 0.15s;
    }

    .btn:hover {
      background: var(--panel);
    }

    .btn.pri {
      background: var(--ink);
      color: var(--paper);
      min-width: 80px;
    }

    .btn.pri:hover {
      opacity: 0.88;
    }

    .btn.sm {
      padding: 3px 7px;
      border-color: var(--rule);
      color: var(--ink2);
      font-size: 10px;
    }

    .btn.sm.on {
      border-color: var(--ink);
      color: var(--ink);
      background: var(--panel);
    }

    .seg {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(0, 1fr);
      margin-top: 5px;
      border: 1px solid var(--ink);
    }

    .seg button {
      background: none;
      border: 0;
      border-left: 1px solid var(--ink);
      text-align: left;
      padding: 4px 6px 3px;
      cursor: pointer;
      color: var(--ink2);
      min-width: 0;
      transition: background 0.15s, color 0.15s;
    }

    .seg button:first-child {
      border-left: 0;
    }

    .seg b {
      display: block;
      font: 600 10px/1.2 var(--f-mono);
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .seg i {
      display: block;
      height: 2px;
      width: 0;
      margin-top: 3px;
      background: currentColor;
    }

    .seg button:hover {
      background: var(--panel);
      color: var(--ink);
    }

    .seg button.on {
      background: var(--ink);
      color: var(--paper);
    }

    /* Theory Column */
    .theory {
      min-width: 0;
      max-height: calc(100dvh - 80px);
      overflow-y: hidden;
      padding-right: 2px;
    }

    .now {
      margin: 4px 0 6px;
      font-size: 12px;
      line-height: 1.32;
      min-height: 0;
      padding: 5px 8px;
      background: var(--panel);
      border-left: 3px solid var(--ink);
    }

    .now::before {
      content: 'Live Stage';
      display: block;
      margin-bottom: 2px;
      font: 600 9.5px var(--f-mono);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink2);
    }

    .eqs {
      list-style: none;
      margin: 0 0 5px;
      padding: 0;
      border-top: 1.5px solid var(--ink);
    }

    .eqs::before {
      content: 'Chemical Reactions';
      display: block;
      padding: 3px 0 2px;
      font: 600 9.5px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink2);
      border-bottom: 1px solid var(--rule);
    }

    .eqs li {
      padding: 2.5px 6px;
      border-bottom: 1px solid var(--rule);
      font: 400 11px/1.3 var(--f-mono);
      color: var(--ink2);
      transition: background 0.2s, color 0.2s;
      overflow-wrap: anywhere;
      border-left: 3px solid transparent;
    }

    .eqs li.on {
      background: var(--panel);
      color: var(--ink);
      font-weight: 600;
      border-left: 3px solid var(--ink);
    }

    .pc {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px 12px;
      margin: 0 0 5px;
    }

    .pc>div {
      min-width: 0;
    }

    .pc p {
      margin: 2px 0 0;
      font-size: 11.5px;
      line-height: 1.3;
    }

    .tight {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .tight li {
      padding: 2px 0;
      border-bottom: 1px solid var(--rule);
      font-size: 11.5px;
      line-height: 1.3;
    }

    .sub4 {
      margin: 4px 0 2px;
      font-size: 10.5px;
    }

    .units {
      margin: 0 0 5px;
      padding: 4px 8px;
      background: var(--panel);
      font: 400 10.5px/1.35 var(--f-mono);
      border-left: 3px solid var(--rule);
    }

    .callout-box {
      margin: 5px 0 0;
      padding: 6px 8px;
      border: 1px solid var(--ink);
      background: var(--panel);
      font-size: 11.5px;
      line-height: 1.32;
    }

    .callout-box b {
      font-family: var(--f-mono);
      font-size: 10px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
    }

    /* Comparison Table & Viva Accordion */
    .tw {
      overflow-x: auto;
      max-height: calc(100dvh - 140px);
      overflow-y: hidden;
      margin-top: 8px;
      border: 1px solid var(--rule);
    }

    table {
      border-collapse: collapse;
      width: 100%;
      min-width: 820px;
    }

    th {
      font: 600 10px var(--f-mono);
      letter-spacing: 0.07em;
      text-transform: uppercase;
      text-align: left;
      color: var(--ink);
      background: var(--panel);
      border-bottom: 2px solid var(--ink);
      padding: 6px 8px;
      vertical-align: bottom;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    td {
      padding: 6px 8px;
      border-bottom: 1px solid var(--rule);
      vertical-align: top;
      font-size: 11.5px;
      line-height: 1.3;
      min-width: 0;
    }

    td:first-child {
      font: 700 12.5px/1.2 var(--f-display);
      letter-spacing: -0.01em;
      white-space: nowrap;
      background: var(--paper);
    }

    .foot-note {
      margin: 5px 0 0;
      font-size: 11px;
      color: var(--ink2);
      max-width: 84ch;
      line-height: 1.3;
    }

    .qa-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 24px;
      margin-top: 8px;
      max-height: calc(100dvh - 130px);
      overflow-y: hidden;
      padding-right: 4px;
    }

    details {
      border-bottom: 1px solid var(--rule);
      padding: 5px 0;
      min-width: 0;
    }

    details:first-child {
      border-top: 1px solid var(--rule);
    }

    summary {
      cursor: pointer;
      list-style: none;
      display: flex;
      gap: 6px;
      font-weight: 600;
      font-size: 11.5px;
      line-height: 1.3;
      color: var(--ink);
    }

    summary::-webkit-details-marker {
      display: none;
    }

    summary::before {
      content: '+';
      font: 600 12px var(--f-mono);
      color: var(--ink2);
      width: 1.1em;
      flex: none;
    }

    details[open] summary::before {
      content: '−';
    }

    details p {
      margin: 4px 0 0 16px;
      font-size: 11.5px;
      line-height: 1.35;
      color: var(--ink2);
    }

`;

scriptContent = scriptContent.slice(0, startIdx) + refinedCss + scriptContent.slice(endIdx);

// 2. Streamline Slide 6 Theory HTML so it fits seamlessly:
const slide6Old = `      <div class="theory">
        <p class="eyebrow">Boiler Operational Troubles</p>
        <h2>Priming &amp; foaming</h2>
        <p class="lede">When impure water enters high-pressure boilers, it causes priming and foaming. Both phenomena produce 'carry-over'—liquid boiler water droplets entrained into the steam header, generating destructive wet steam.</p>
        <div class="now"></div>
        <ol class="eqs"></ol>
        <div class="pc">
          <div>
            <h4>Priming (Violent Mechanical Boiling)</h4>
            <p>Rapid carry-over of water droplets dragged out by excessively violent steam flow.</p>
            <p class="sub4"><b>Causes</b></p>
            <ul class="tight">
              <li>Excessively high steam velocity</li>
              <li>Sudden boiler pressure drops &amp; quick valve opening</li>
              <li>Water level maintained too high</li>
              <li>Faulty boiler design &amp; inadequate steam space</li>
            </ul>
            <p class="sub4"><b>Remedies</b></p>
            <ul class="tight">
              <li>Fit steam purifiers or anti-priming pipes</li>
              <li>Open steam stop valves gradually</li>
              <li>Maintain proper boiler water level</li>
              <li>Thoroughly soften &amp; demineralise feed water</li>
            </ul>
          </div>
          <div>
            <h4>Foaming (Chemical Froth Formation)</h4>
            <p>Formation of persistent, stable bubbles on the water surface that spill into the steam main.</p>
            <p class="sub4"><b>Causes</b></p>
            <ul class="tight">
              <li>Presence of oily grease and fatty substances</li>
              <li>Dissolved alkalis reacting to form soap</li>
              <li>Finely divided suspended solids</li>
            </ul>
            <p class="sub4"><b>Remedies</b></p>
            <ul class="tight">
              <li>Add anti-foaming agents: castor oil or polyamides (breaks bubble surface film)</li>
              <li>Coagulate &amp; remove oil with sodium aluminate</li>
              <li>Execute periodic bottom blow-down</li>
            </ul>
          </div>
        </div>
        <h4>Destructive Consequences of Wet Steam</h4>
        <ul class="tight">
          <li><b>Thermal efficiency collapse:</b> Wet steam carries far lower enthalpy than dry saturated or superheated steam.</li>
          <li><b>Turbine blade erosion &amp; salt deposits:</b> Entrained water droplets strike turbine blades at sonic velocities causing severe pitting; carried-over salts deposit on blades, destroying dynamic rotor balance.</li>
          <li><b>Erratic water-level readings:</b> Violent surging and foam cause the water level in the external gauge glass to bounce uncontrollably, blinding operators to the true water inventory.</li>
        </ul>
      </div>`;

const slide6New = `      <div class="theory">
        <p class="eyebrow">Boiler Operational Troubles</p>
        <h2>Priming &amp; foaming</h2>
        <p class="lede">Impure feed water causes priming (mechanical surge) and foaming (chemical froth), entraining liquid droplets into steam ('carry-over').</p>
        <div class="now"></div>
        <ol class="eqs"></ol>
        <div class="pc">
          <div>
            <h4>Priming (Mechanical Boiling)</h4>
            <ul class="tight">
              <li><b>Causes:</b> High steam velocity, sudden valve opening, excessive water level, small steam space.</li>
              <li><b>Remedies:</b> Fit anti-priming steam purifiers, open valves gradually, maintain proper water level, soften feed water.</li>
            </ul>
          </div>
          <div>
            <h4>Foaming (Chemical Froth)</h4>
            <ul class="tight">
              <li><b>Causes:</b> Oily grease, dissolved alkalis forming soap, fine suspended solids.</li>
              <li><b>Remedies:</b> Add anti-foamer (castor oil / polyamides), coagulate oil with NaAlO_{2}, regular blow-down.</li>
            </ul>
          </div>
        </div>
        <div class="callout-box">
          <b>Consequences of Carry-Over (Wet Steam)</b>
          Entrained droplets strike turbine blades at sonic velocities causing blade erosion and salt scaling; collapses thermal efficiency and causes false water gauge readings.
        </div>
      </div>`;

if (scriptContent.includes(slide6Old)) {
  scriptContent = scriptContent.replace(slide6Old, slide6New);
}

fs.writeFileSync(deckScriptPath, scriptContent, 'utf8');
console.log('Successfully updated build_updated_deck.js with zero-scroll configuration.');

// Run build
require('./build_updated_deck.js');
