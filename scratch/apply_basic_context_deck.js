const fs = require('fs');
const path = require('path');

const deckScriptPath = path.join(__dirname, 'build_updated_deck.js');
let scriptContent = fs.readFileSync(deckScriptPath, 'utf8');

// 1. Update CSS: comfortable, readable, elegant typography and clean card styling
const cssStartMarker = '    html, body {';
const cssEndMarker = '    /* Footer & Notes */';

const startIdx = scriptContent.indexOf(cssStartMarker);
const endIdx = scriptContent.indexOf(cssEndMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find CSS markers:', { startIdx, endIdx });
  process.exit(1);
}

const basicContextCss = `    html, body {
      height: 100%;
      height: 100dvh;
      overflow: hidden;
      margin: 0;
      background: var(--paper);
      color: var(--ink);
      font-family: var(--f-body);
      font-size: 13.5px;
      line-height: 1.42;
      -webkit-font-smoothing: antialiased;
    }

    body {
      display: flex;
      flex-direction: column;
      padding: 0 max(20px, env(safe-area-inset-right, 0px)) 0 max(20px, env(safe-area-inset-left, 0px));
    }

    /* Top Navigation Bar */
    .bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-block: 4px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--f-mono);
      font-size: 11px;
      flex-wrap: nowrap;
      flex: none;
      height: 40px;
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
      padding: 4px 8px;
      cursor: pointer;
      font: 500 11px var(--f-mono);
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
      gap: 6px;
      flex: none;
    }

    .tools button {
      background: none;
      border: 1px solid var(--rule);
      border-radius: 2px;
      padding: 4px 9px;
      cursor: pointer;
      font: 500 11px var(--f-mono);
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
      padding: 6px 0;
    }

    .slide {
      display: none;
    }

    .slide.on {
      display: block;
    }

    .slide.topic.on {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
      gap: clamp(16px, 2.4vw, 32px);
      align-items: center;
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      max-height: calc(100dvh - 84px);
    }

    .slide.title.on {
      display: grid;
      grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
      gap: clamp(18px, 3vw, 36px);
      align-items: center;
      max-width: 1160px;
      margin: 0 auto;
      width: 100%;
      max-height: calc(100dvh - 84px);
    }

    .slide.wide.on {
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 1160px;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      max-height: calc(100dvh - 84px);
    }

    @media (max-width: 960px) {
      .slide.topic.on,
      .slide.title.on {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .eyebrow {
      margin: 0 0 4px;
      font: 600 11px var(--f-mono);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink2);
    }

    h1 {
      font: 800 clamp(24px, 2.6vw, 36px)/1.08 var(--f-display);
      letter-spacing: -0.03em;
      margin: 0 0 6px;
      max-width: 24ch;
      text-wrap: balance;
    }

    h2 {
      font: 800 clamp(20px, 2.2vw, 28px)/1.08 var(--f-display);
      letter-spacing: -0.025em;
      margin: 0 0 6px;
      text-wrap: balance;
    }

    h3 {
      margin: 0 0 4px;
      font: 600 11px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink2);
    }

    h4 {
      margin: 0;
      padding-bottom: 3px;
      border-bottom: 1.5px solid var(--ink);
      font: 600 11px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .lede {
      font-size: clamp(13px, 1.08vw, 15px);
      line-height: 1.42;
      margin: 0 0 8px;
      max-width: 60ch;
      color: var(--ink);
    }

    .by {
      margin: 6px 0 0;
      font: 400 12px var(--f-mono);
      color: var(--ink2);
    }

    .by b {
      color: var(--ink);
      font-weight: 600;
    }

    .agenda {
      list-style: none;
      margin: 10px 0 0;
      padding: 0;
      border-top: 1px solid var(--rule);
      max-width: 540px;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 14px;
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
      padding: 5px 2px;
      cursor: pointer;
      font-size: 12.5px;
      color: var(--ink);
      transition: background 0.15s, padding-left 0.15s;
    }

    .agenda button:hover {
      background: var(--panel);
      padding-left: 5px;
    }

    .agenda b {
      font: 600 11px var(--f-mono);
      color: var(--ink2);
      min-width: 1.8em;
    }

    .key {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px 14px;
      margin: 0;
    }

    .key div {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      min-width: 0;
    }

    .key small {
      display: block;
      font: 400 10.5px var(--f-mono);
      color: var(--ink2);
    }

    .dot {
      flex: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: var(--c);
      color: var(--iontext);
      display: grid;
      place-items: center;
      font: 600 10px var(--f-mono);
    }

    .legend {
      border: 1px solid var(--rule);
      background: var(--panel);
      padding: 12px 16px;
      border-radius: 2px;
    }

    .legend h3 {
      margin: 0 0 2px;
      font: 600 11px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink);
    }

    .legend .sub {
      margin: 0 0 8px;
      font: 400 10.5px var(--f-mono);
      color: var(--ink2);
      line-height: 1.35;
    }

    .quick-guide {
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px solid var(--rule);
    }

    .quick-guide h4 {
      margin: 0 0 4px;
      font: 600 10.5px var(--f-mono);
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
      gap: 3px;
      font: 400 11px var(--f-mono);
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
      max-height: calc(100dvh - 165px);
      height: auto;
      aspect-ratio: 800/520;
      border: 1px solid var(--rule);
      background: var(--paper);
    }

    .ctl {
      margin-top: 8px;
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
      font: 600 10.5px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink2);
    }

    .btn {
      background: transparent;
      border: 1px solid var(--ink);
      color: var(--ink);
      padding: 6px 13px;
      border-radius: 2px;
      cursor: pointer;
      font: 600 11px var(--f-mono);
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
      min-width: 86px;
    }

    .btn.pri:hover {
      opacity: 0.88;
    }

    .btn.sm {
      padding: 4px 8px;
      border-color: var(--rule);
      color: var(--ink2);
      font-size: 10.5px;
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
      margin-top: 6px;
      border: 1px solid var(--ink);
    }

    .seg button {
      background: none;
      border: 0;
      border-left: 1px solid var(--ink);
      text-align: left;
      padding: 6px 8px 5px;
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
      font: 600 10.5px/1.2 var(--f-mono);
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .seg i {
      display: block;
      height: 2px;
      width: 0;
      margin-top: 4px;
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

    /* Theory / Context Column */
    .theory {
      min-width: 0;
      max-height: calc(100dvh - 84px);
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .now {
      margin: 8px 0 10px;
      font-size: 13.5px;
      line-height: 1.45;
      min-height: 0;
      padding: 8px 12px;
      background: var(--panel);
      border-left: 3px solid var(--ink);
    }

    .now::before {
      content: 'Live Stage';
      display: block;
      margin-bottom: 3px;
      font: 600 10px var(--f-mono);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink2);
    }

    .eqs {
      list-style: none;
      margin: 0 0 10px;
      padding: 0;
      border-top: 2px solid var(--ink);
    }

    .eqs::before {
      content: 'Chemical Reactions';
      display: block;
      padding: 4px 0 3px;
      font: 600 10px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink2);
      border-bottom: 1px solid var(--rule);
    }

    .eqs li {
      padding: 4px 8px;
      border-bottom: 1px solid var(--rule);
      font: 400 12px/1.35 var(--f-mono);
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
      gap: 10px 16px;
      margin: 0;
    }

    .pc>div {
      min-width: 0;
      background: var(--panel);
      padding: 8px 11px;
      border: 1px solid var(--rule);
    }

    .pc h4 {
      border-bottom: 1px solid var(--rule);
      padding-bottom: 3px;
      margin-bottom: 4px;
      color: var(--ink);
    }

    .pc p {
      margin: 0;
      font-size: 12.5px;
      line-height: 1.4;
      color: var(--ink2);
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
      font: 600 10.5px var(--f-mono);
      letter-spacing: 0.07em;
      text-transform: uppercase;
      text-align: left;
      color: var(--ink);
      background: var(--panel);
      border-bottom: 2px solid var(--ink);
      padding: 8px 10px;
      vertical-align: bottom;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    td {
      padding: 8px 10px;
      border-bottom: 1px solid var(--rule);
      vertical-align: top;
      font-size: 12px;
      line-height: 1.35;
      min-width: 0;
    }

    td:first-child {
      font: 700 13px/1.2 var(--f-display);
      letter-spacing: -0.01em;
      white-space: nowrap;
      background: var(--paper);
    }

    .foot-note {
      margin: 8px 0 0;
      font-size: 12px;
      color: var(--ink2);
      max-width: 84ch;
      line-height: 1.35;
    }

    .qa-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 28px;
      margin-top: 10px;
      max-height: calc(100dvh - 130px);
      overflow-y: hidden;
      padding-right: 4px;
    }

    details {
      border-bottom: 1px solid var(--rule);
      padding: 6px 0;
      min-width: 0;
    }

    details:first-child {
      border-top: 1px solid var(--rule);
    }

    summary {
      cursor: pointer;
      list-style: none;
      display: flex;
      gap: 7px;
      font-weight: 600;
      font-size: 12px;
      line-height: 1.35;
      color: var(--ink);
    }

    summary::-webkit-details-marker {
      display: none;
    }

    summary::before {
      content: '+';
      font: 600 13px var(--f-mono);
      color: var(--ink2);
      width: 1.1em;
      flex: none;
    }

    details[open] summary::before {
      content: '−';
    }

    details p {
      margin: 5px 0 0 18px;
      font-size: 12px;
      line-height: 1.4;
      color: var(--ink2);
    }

`;

scriptContent = scriptContent.slice(0, startIdx) + basicContextCss + scriptContent.slice(endIdx);

// 2. Streamline theory section in each slide:

// Slide 2 (Hard Water & Boiler Scale)
const slide2Old = scriptContent.slice(
  scriptContent.indexOf('<!-- 2 · HARD WATER -->'),
  scriptContent.indexOf('<!-- 3 · ZEOLITE -->')
);

const slide2New = `<!-- 2 · HARD WATER -->
    <section class="slide topic" data-sim="scale" data-name="Hard water">
      <div class="stagewrap">
        <canvas aria-label="Animation: hard water scaling on a heated surface"></canvas>
        <div class="ctl"></div>
      </div>
      <div class="theory">
        <p class="eyebrow">The Boiler Problem · Scale Formation</p>
        <h2>Hardness &amp; boiler scale</h2>
        <p class="lede">Raw feed water carries dissolved calcium and magnesium minerals. When heated inside a steam boiler, these soluble salts decompose and precipitate into rock-hard insulating scale.</p>
        <div class="now"></div>
        <ol class="eqs"></ol>
        <div class="pc">
          <div>
            <h4>Why It Happens</h4>
            <p>Boiling breaks unstable bicarbonates into insoluble CaCO_{3} crystals that deposit onto the heating surface.</p>
          </div>
          <div>
            <h4>The Industrial Hazard</h4>
            <p>Scale insulates water from metal walls. Metal overheats rapidly beyond safety limits, leading to bulging and tube rupture.</p>
          </div>
        </div>
      </div>
      <div class="notes">Key point for exams: Distinguish clearly between sludge and scale. Sludge is soft, slimy, non-adherent, and forms at cooler zones (flushed out by blow-down). Scale is hard, crystalline, tightly adherent, and forms on the hottest heating surfaces. Remind students why all hardness is expressed in terms of CaCO3 equivalent—because its molecular weight is exactly 100 and equivalent weight is 50, which simplifies stoichiometric calculations. Run the simulation to show how thermal decomposition of bicarbonate releases CO2 gas and precipitates insoluble CaCO3 crust.</div>
    </section>

    `;

scriptContent = scriptContent.replace(slide2Old, slide2New);

// Slide 3 (Zeolite Process)
const slide3Old = scriptContent.slice(
  scriptContent.indexOf('<!-- 3 · ZEOLITE -->'),
  scriptContent.indexOf('<!-- 4 · ION EXCHANGE -->')
);

const slide3New = `<!-- 3 · ZEOLITE -->
    <section class="slide topic" data-sim="zeolite" data-name="Zeolite">
      <div class="stagewrap">
        <canvas aria-label="Animation: zeolite softener"></canvas>
        <div class="ctl"></div>
      </div>
      <div class="theory">
        <p class="eyebrow">External Treatment · Cation Softener</p>
        <h2>Zeolite softening process</h2>
        <p class="lede">Hard water filters through a porous bed of sodium aluminosilicate (Na_{2}Ze). The active bed captures hard Ca^{2+} and Mg^{2+} ions and releases harmless Na^{+} ions into the soft effluent.</p>
        <div class="now"></div>
        <ol class="eqs"></ol>
        <div class="pc">
          <div>
            <h4>Cation Exchange Swap</h4>
            <p>Each divalent Ca^{2+} or Mg^{2+} ion captured in the lattice displaces exactly two monovalent Na^{+} ions into the soft water.</p>
          </div>
          <div>
            <h4>10% Brine Regeneration</h4>
            <p>When the bed exhausts, flushing with 10% NaCl salt water forces the equilibrium backwards, restoring active Na_{2}Ze for reuse.</p>
          </div>
        </div>
      </div>
      <div class="notes">Emphasize charge stoichiometry: exactly 2 Na+ ions leave for every 1 Ca2+ or Mg2+ captured to preserve net zero electrical charge. When explaining regeneration, mention Le Chatelier's principle—the huge concentration gradient of 10% sodium chloride forces the reversible reaction backwards. Crucial viva point: why zeolite water can cause caustic embrittlement in high-pressure boilers (NaHCO3 decomposes into NaOH, which attacks stressed rivet joints).</div>
    </section>

    `;

scriptContent = scriptContent.replace(slide3Old, slide3New);

// Slide 4 (Ion Exchange Demineralisation)
const slide4Old = scriptContent.slice(
  scriptContent.indexOf('<!-- 4 · ION EXCHANGE -->'),
  scriptContent.indexOf('<!-- 5 · ELECTRODIALYSIS -->')
);

const slide4New = `<!-- 4 · ION EXCHANGE -->
    <section class="slide topic" data-sim="ionex" data-name="Ion exchange">
      <div class="stagewrap">
        <canvas aria-label="Animation: ion-exchange demineralisation"></canvas>
        <div class="ctl"></div>
      </div>
      <div class="theory">
        <p class="eyebrow">External Treatment · Pure Water</p>
        <h2>Ion-exchange demineralisation</h2>
        <p class="lede">High-pressure boilers require water completely free of all mineral salts. Water flows through two resin beds in series to eliminate both cations and anions, producing ultra-pure DM water.</p>
        <div class="now"></div>
        <ol class="eqs"></ol>
        <div class="pc">
          <div>
            <h4>Two-Column Removal</h4>
            <p>Column 1 (Cation) swaps metal ions for H^{+}. Column 2 (Anion) swaps acid ions for OH^{−}. The released H^{+} and OH^{−} combine into pure H_{2}O.</p>
          </div>
          <div>
            <h4>Why Cation First</h4>
            <p>Passing raw water into the anion bed first would make it strongly alkaline, instantly choking the resin pores with insoluble hydroxide sludge.</p>
          </div>
        </div>
      </div>
      <div class="notes">Walk through the two columns in order: Cation bed releases H+, Anion bed releases OH-, and they neutralize into neutral H2O. Point to the live meter transitioning from PURE to IONS during exhaustion. Remind students that Ion Exchange is the ONLY method among these three that removes all dissolved salts, making it suitable for modern high-pressure boilers. Mention that the cation bed is regenerated with dilute HCl, and the anion bed with dilute NaOH.</div>
    </section>

    `;

scriptContent = scriptContent.replace(slide4Old, slide4New);

// Slide 5 (Electrodialysis)
const slide5Old = scriptContent.slice(
  scriptContent.indexOf('<!-- 5 · ELECTRODIALYSIS -->'),
  scriptContent.indexOf('<!-- 6 · PRIMING & FOAMING -->')
);

const slide5New = `<!-- 5 · ELECTRODIALYSIS -->
    <section class="slide topic" data-sim="ed" data-name="Electrodialysis">
      <div class="stagewrap">
        <canvas aria-label="Animation: electrodialysis stack"></canvas>
        <div class="ctl"></div>
      </div>
      <div class="theory">
        <p class="eyebrow">Membrane Desalination · Brackish Water</p>
        <h2>Electrodialysis desalter</h2>
        <p class="lede">A direct-current (DC) electric field pulls dissolved salt ions across alternating ion-selective plastic membranes, separating brackish feed into desalted water and reject brine.</p>
        <div class="now"></div>
        <ol class="eqs"></ol>
        <div class="pc">
          <div>
            <h4>Selective Barriers</h4>
            <p>Cation membranes (CM) permit only positive ions toward the cathode (−). Anion membranes (AM) permit only negative ions toward the anode (+).</p>
          </div>
          <div>
            <h4>Continuous Dual Streams</h4>
            <p>Alternate compartments collect fresh desalted water while adjacent chambers collect reject brine. Runs purely on DC electrical power.</p>
          </div>
        </div>
      </div>
      <div class="notes">Highlight that Electrodialysis is an electrochemical membrane process, not an ion exchange bed. It does not require acids or alkalis for regeneration, but it consumes DC electrical power. Alternate chambers become concentrated brine and dilute product water. Don't forget the limitation: non-ionic impurities like bacteria and organic colloids are unaffected by the electric field.</div>
    </section>

    `;

scriptContent = scriptContent.replace(slide5Old, slide5New);

// Slide 6 (Priming & Foaming)
const slide6Old = scriptContent.slice(
  scriptContent.indexOf('<!-- 6 · PRIMING & FOAMING -->'),
  scriptContent.indexOf('<!-- 7 · COMPARE -->')
);

const slide6New = `<!-- 6 · PRIMING & FOAMING -->
    <section class="slide topic" data-sim="boiler" data-name="Priming &amp; foaming">
      <div class="stagewrap">
        <canvas aria-label="Animation: boiler priming and foaming"></canvas>
        <div class="ctl"></div>
      </div>
      <div class="theory">
        <p class="eyebrow">Boiler Operational Troubles</p>
        <h2>Priming &amp; foaming</h2>
        <p class="lede">When feed water quality is neglected, water droplets get dragged into the steam header ('carry-over'). This produces wet steam that erodes turbine blades and reduces efficiency.</p>
        <div class="now"></div>
        <ol class="eqs"></ol>
        <div class="pc">
          <div>
            <h4>Priming (Mechanical Surge)</h4>
            <p>Violent boiling surges drag water droplets into the steam pipe. Prevented with anti-priming steam purifiers and gradual valve operation.</p>
          </div>
          <div>
            <h4>Foaming (Chemical Froth)</h4>
            <p>Oily grease and alkalis form persistent bubble froth on the water surface. Collapsed by castor oil anti-foam drops and boiler blow-down.</p>
          </div>
        </div>
      </div>
      <div class="notes">Distinguish clearly: Priming is mechanical (violent boiling drags droplets); Foaming is chemical (oil or alkalis lower surface tension and create stable foam). Both cause carry-over of wet steam. Watch the gauge glass flicker during priming and foaming, and point out how castor oil instantly collapses foam bubbles while blow-down flushes the sludge.</div>
    </section>

    `;

scriptContent = scriptContent.replace(slide6Old, slide6New);

fs.writeFileSync(deckScriptPath, scriptContent, 'utf8');
console.log('Successfully updated build_updated_deck.js with clean basic-context content.');

// Build updated HTML
require('./build_updated_deck.js');
