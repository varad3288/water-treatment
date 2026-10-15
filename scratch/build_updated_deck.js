const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'water-treatment.html');
const raw = fs.readFileSync(srcPath, 'utf8');

const rootIdx = raw.indexOf(':root {');
if (rootIdx === -1) {
  console.error('Could not find :root {');
  process.exit(1);
}

const fontHeader = raw.slice(0, rootIdx);

const updatedBody = `:root {
      --f-display: 'Archivo', 'Arial Narrow', Arial, sans-serif;
      --f-body: 'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
      --f-mono: 'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace;
      --paper: #FFFFFF;
      --panel: #F4F7F6;
      --ink: #0F231F;
      --ink2: #485C59;
      --rule: #D2DEDC;
      --wsolid: #D8ECF5;
      --ca: #A82042;
      --mg: #6E40BC;
      --na: #B87800;
      --h: #D9531C;
      --oh: #2563EB;
      --cl: #258654;
      --so4: #0F7F8F;
      --h2o: #3698C2;
      --hco3: #586B8F;
      --iontext: #FFFFFF;
      --imp: #7D5230;
      --scale: #8E9894;
      --glow: #E8892B;
      color-scheme: light;
    }

    * {
      box-sizing: border-box;
    }

    html, body {
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
      background: var(--paper);
      color: var(--ink);
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

    /* Mobile & Tablet Responsive Layouts */
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

    /* Footer & Notes */
    .foot {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-block: 10px;
      border-top: 1px solid var(--rule);
      font: 400 12px var(--f-mono);
      color: var(--ink2);
      flex-wrap: nowrap;
    }

    .foot button {
      background: none;
      border: 1px solid var(--rule);
      border-radius: 2px;
      padding: 5px 12px;
      cursor: pointer;
      font: 600 12px var(--f-mono);
      color: var(--ink);
      transition: border-color 0.15s, background 0.15s;
    }

    .foot button:hover {
      border-color: var(--ink);
      background: var(--panel);
    }

    .foot #count {
      font-weight: 600;
      color: var(--ink);
      letter-spacing: 0.04em;
    }

    .foot .hint {
      margin-left: auto;
      font-size: 11.5px;
      letter-spacing: 0.02em;
      opacity: 0.75;
      white-space: nowrap;
    }

    @media (max-width: 760px) {
      .foot .hint {
        display: none;
      }
    }

    #notes {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 40;
      background: var(--panel);
      color: var(--ink);
      max-height: 32vh;
      overflow: auto;
      padding: 14px max(24px, env(safe-area-inset-right, 0px)) calc(16px + env(safe-area-inset-bottom, 0px)) max(24px, env(safe-area-inset-left, 0px));
      border-top: 2px solid var(--ink);
      box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.1);
    }

    .notes-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--rule);
    }

    #notes h3 {
      color: var(--ink2);
      margin: 0;
      font: 600 11px var(--f-mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    #notes .close-notes {
      background: none;
      border: 1px solid var(--rule);
      border-radius: 2px;
      color: var(--ink);
      font: 500 11px var(--f-mono);
      cursor: pointer;
      padding: 2px 8px;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    #notes .close-notes:hover {
      background: var(--paper);
      border-color: var(--ink);
    }

    #notes p {
      margin: 0;
      max-width: 86ch;
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--ink);
    }

    .notes {
      display: none;
    }
  </style>
</head>

<body>

  <header class="bar">
    <div class="brand">Water Chemistry · FE Sem I</div>
    <nav class="rail" id="rail" aria-label="Slides"></nav>
    <div class="tools">
      <button id="btnNotes" aria-pressed="false" title="Speaker notes (N)">Notes</button>
      
      <button id="btnFs" title="Fullscreen (F)">Fullscreen</button>
    </div>
  </header>

  <main id="deck">

    <!-- 1 · TITLE -->
    <section class="slide title on" data-name="Intro">
      <div>
        <p class="eyebrow">Engineering Chemistry · Water Technology &amp; Steam Systems</p>
        <h1>Water treatment &amp; boiler troubles</h1>
        <p class="lede">Four external water treatment technologies (Zeolite, Ion Exchange, Electrodialysis, Reverse Osmosis) and boiler troubles. Interactive thermodynamic models beside exam-focused theory.</p>
        <p class="by">Presented by <b>Varad</b> · FE Semester I · SPPU</p>
        <ul class="agenda" id="agenda"></ul>
      </div>
      <aside class="legend">
        <h3>Ion Key · Standardized Notation</h3>
        <p class="sub">Color-coded markers in all 5 simulation stages</p>
        <div class="key">
          <div><span class="dot" style="--c:var(--ca)">Ca</span><span>Calcium<small class="chem">Ca²⁺</small></span></div>
          <div><span class="dot" style="--c:var(--mg)">Mg</span><span>Magnesium<small class="chem">Mg²⁺</small></span></div>
          <div><span class="dot" style="--c:var(--na)">Na</span><span>Sodium<small class="chem">Na⁺</small></span></div>
          <div><span class="dot" style="--c:var(--h)">H</span><span>Hydrogen<small class="chem">H⁺</small></span></div>
          <div><span class="dot" style="--c:var(--oh)">OH</span><span>Hydroxide<small class="chem">OH⁻</small></span></div>
          <div><span class="dot" style="--c:var(--cl)">Cl</span><span>Chloride<small class="chem">Cl^{−}</small></span></div>
          <div><span class="dot" style="--c:var(--so4)">SO</span><span>Sulphate<small class="chem">SO_{4}^{2−}</small></span></div>
          <div><span class="dot" style="--c:var(--hco3)">HCO</span><span>Bicarbonate<small class="chem">HCO_{3}^{−}</small></span></div>
        </div>
        <div class="quick-guide">
          <h4>Deck Controls</h4>
          <ul>
            <li><b>Space:</b> Play / pause live canvas simulation</li>
            <li><b>← / →:</b> Navigate between presentation slides</li>
            <li><b>N / T:</b> Toggle speaker notes / dark theme</li>
          </ul>
        </div>
      </aside>
      <div class="notes">Open with the industrial stakes: raw water contains dissolved mineral salts that precipitate under heat, forming insulating scale that ruptures boiler tubes and causes catastrophic plant downtime. Introduce the presentation structure: three treatment technologies (Zeolite softening, Ion Exchange demineralisation, Electrodialysis) and the physical-chemical boiler failures that occur when feed water is substandard (Priming &amp; Foaming). Point to the ion color key once so the audience recognizes every particle in the live simulations.</div>
    </section>

    <!-- 2 · HARD WATER -->
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
            <p>Boiling breaks unstable bicarbonates into insoluble CaCO₃ crystals that deposit onto the heating surface.</p>
          </div>
          <div>
            <h4>The Industrial Hazard</h4>
            <p>Scale insulates water from metal walls. Metal overheats rapidly beyond safety limits, leading to bulging and tube rupture.</p>
          </div>
        </div>
      </div>
      <div class="notes">Key point for exams: Distinguish clearly between sludge and scale. Sludge is soft, slimy, non-adherent, and forms at cooler zones (flushed out by blow-down). Scale is hard, crystalline, tightly adherent, and forms on the hottest heating surfaces. Remind students why all hardness is expressed in terms of CaCO3 equivalent—because its molecular weight is exactly 100 and equivalent weight is 50, which simplifies stoichiometric calculations. Run the simulation to show how thermal decomposition of bicarbonate releases CO2 gas and precipitates insoluble CaCO3 crust.</div>
    </section>

    <!-- 3 · ZEOLITE -->
    <section class="slide topic" data-sim="zeolite" data-name="Zeolite">
      <div class="stagewrap">
        <canvas aria-label="Animation: zeolite softener"></canvas>
        <div class="ctl"></div>
      </div>
      <div class="theory">
        <p class="eyebrow">External Treatment · Cation Softener</p>
        <h2>Zeolite softening process</h2>
        <p class="lede">Hard water filters through a porous bed of sodium aluminosilicate (Na₂Ze). The active bed captures hard Ca²⁺ and Mg²⁺ ions and releases harmless Na⁺ ions into the soft effluent.</p>
        <div class="now"></div>
        <ol class="eqs"></ol>
        <div class="pc">
          <div>
            <h4>Cation Exchange Swap</h4>
            <p>Each divalent Ca²⁺ or Mg²⁺ ion captured in the lattice displaces exactly two monovalent Na⁺ ions into the soft water.</p>
          </div>
          <div>
            <h4>10% Brine Regeneration</h4>
            <p>When the bed exhausts, flushing with 10% NaCl salt water forces the equilibrium backwards, restoring active Na₂Ze for reuse.</p>
          </div>
        </div>
      </div>
      <div class="notes">Emphasize charge stoichiometry: exactly 2 Na+ ions leave for every 1 Ca2+ or Mg2+ captured to preserve net zero electrical charge. When explaining regeneration, mention Le Chatelier's principle—the huge concentration gradient of 10% sodium chloride forces the reversible reaction backwards. Crucial viva point: why zeolite water can cause caustic embrittlement in high-pressure boilers (NaHCO3 decomposes into NaOH, which attacks stressed rivet joints).</div>
    </section>

    <!-- 4 · ION EXCHANGE -->
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
            <p>Column 1 (Cation) swaps metal ions for H⁺. Column 2 (Anion) swaps acid ions for OH⁻. The released H⁺ and OH⁻ combine into pure H₂O.</p>
          </div>
          <div>
            <h4>Why Cation First</h4>
            <p>Passing raw water into the anion bed first would make it strongly alkaline, instantly choking the resin pores with insoluble hydroxide sludge.</p>
          </div>
        </div>
      </div>
      <div class="notes">Walk through the two columns in order: Cation bed releases H+, Anion bed releases OH-, and they neutralize into neutral H2O. Point to the live meter transitioning from PURE to IONS during exhaustion. Remind students that Ion Exchange is the ONLY method among these three that removes all dissolved salts, making it suitable for modern high-pressure boilers. Mention that the cation bed is regenerated with dilute HCl, and the anion bed with dilute NaOH.</div>
    </section>

    <!-- 5 · ELECTRODIALYSIS -->
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

        <!-- 6 · REVERSE OSMOSIS -->
    <section class="slide topic" data-sim="ro" data-name="Reverse osmosis">
      <div class="stagewrap">
        <canvas aria-label="Animation: reverse osmosis membrane separation"></canvas>
        <div class="ctl"></div>
      </div>
      <div class="theory">
        <p class="eyebrow">Membrane Separation · External Treatment</p>
        <h2>Reverse osmosis (RO)</h2>
        <p class="lede">When hydraulic pressure greater than osmotic pressure (P &gt; π) is applied to saline feed water, pure water molecules are forced backward through a semi-permeable membrane, leaving concentrated salts behind.</p>
        <div class="now"></div>
        <ol class="eqs"></ol>
        <div class="pc">
          <div>
            <h4>Membrane Rejection</h4>
            <p>Porous polymer thin-film (cellulose acetate / polyamide) blocks 95–99% of dissolved ions, silica, bacteria, and pyrogens.</p>
          </div>
          <div>
            <h4>Advantages &amp; Limits</h4>
            <p>Delivers near-distilled quality without chemical regenerants. Membranes require pre-filtration to prevent chlorine attack and scaling.</p>
          </div>
        </div>
      </div>
      <div class="notes">Reverse Osmosis is a pressure-driven membrane process. Explain the three regimes: 1) P &lt; π is natural osmosis where water moves dilute to concentrated; 2) P = π is osmotic equilibrium with zero net flow; 3) P &gt; π (15–40 bar) forces water backward from concentrated to dilute. Highlight membrane materials: cellulose acetate (hydrolyzes above 35°C, limited pH) and polyamide (intolerant of free chlorine). Emphasize that RO rejects bacteria, viruses, pyrogens, and 99% of mineral salts.</div>
    </section>

    <!-- 7 · PRIMING & FOAMING -->
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

    <!-- 8 · COMPARE -->
    <section class="slide wide" data-name="Compare">
      <p class="eyebrow">Comprehensive Engineering Comparison</p>
      <h2>Industrial water treatment comparison</h2>
      <div class="tw">
        <table>
          <thead>
            <tr>
              <th>Process</th>
              <th>Operating Principle</th>
              <th>Hardness Achieved</th>
              <th>Total Dissolved Solids (TDS)</th>
              <th>Regenerant Chemical</th>
              <th>Chief Limitation</th>
              <th>Boiler Suitability</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Zeolite (Permutit)</td>
              <td class="chem">Reversible cation exchange on aluminosilicate: Ca²⁺ / Mg²⁺ swap for 2 Na⁺</td>
              <td>~10–15 ppm</td>
              <td>Unchanged (replaces Ca/Mg salts with equivalent Na salts)</td>
              <td>10% NaCl brine solution</td>
              <td>Softened but not demineralised; NaHCO_{3} decomposes to NaOH causing caustic embrittlement. Fouled by turbidity, Fe, Mn.</td>
              <td>Low to medium pressure boilers only (&lt; 20 bar)</td>
            </tr>
            <tr>
              <td>Ion Exchange (Demineralisation)</td>
              <td class="chem">Dual-bed synthetic resins: Cation bed releases H⁺, Anion bed releases OH⁻ → H₂O</td>
              <td>&lt; 2 ppm (near zero)</td>
              <td>Virtually zero (electrical conductivity &lt; 0.1 μS/cm)</td>
              <td>Dilute HCl / H_{2}SO_{4} (cation), Dilute NaOH (anion)</td>
              <td>High capital cost, recurring acid/alkali expense, resin bed damaged by turbidity.</td>
              <td>High-pressure &amp; supercritical boilers (&gt; 60 bar)</td>
            </tr>
            <tr>
              <td>Electrodialysis (ED)</td>
              <td>DC electric field drives ions across alternating cation (CM) and anion (AM) selective membranes</td>
              <td>Reduces bulk mineral ions by 80–90%</td>
              <td>Significantly reduced in product compartments</td>
              <td>None (purely electrical energy driven)</td>
              <td>High electrical power cost at high salinity; leaves uncharged organics, silica, and bacteria untouched.</td>
              <td>Brackish water desalination; feed pre-treatment</td>
            </tr>
            <tr>
              <td>Reverse Osmosis (RO)</td>
              <td>Hydraulic pressure P &gt; π forces solvent backward through semi-permeable membrane</td>
              <td>Rejects 95–99% of dissolved mineral ions</td>
              <td>Reduced by 95–99% (near-distilled purity)</td>
              <td>None (15–40 bar mechanical pump power)</td>
              <td>Membranes sensitive to chlorine, pH extremes, and scaling; requires pre-treatment.</td>
              <td>High-pressure boilers, seawater/brackish feed, pure water</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="foot-note">Summary Takeaway: Zeolite softens water for low-pressure systems; Ion Exchange and RO deliver ultra-pure demineralised feed for high-pressure boilers; Electrodialysis desalts brackish water via electric fields. Neglected feed water leads directly to priming, foaming, and tube rupture.</p>
      <div class="notes">Read across one row at a time. Zeolite is the cheap softener for low-pressure heating systems. Ion exchange gives the purest water suitable for thermal power stations. Electrodialysis desalts brackish water without regeneration chemicals but consumes DC electricity and ignores non-ionic impurities. Close by stating that priming and foaming are the direct operational consequences of neglected feed water treatment.</div>
    </section>

  </main>

  <footer class="foot">
    <button id="prev" aria-label="Previous slide">← Prev</button>
    <button id="next" aria-label="Next slide">Next →</button>
    <span id="count">1 / 8</span>
    <span class="hint">Space: play · ← →: slides · N: notes · T: theme</span>
  </footer>

  <div id="notes" hidden>
    <div class="notes-head">
      <h3>Speaker Notes</h3>
      <button class="close-notes" title="Close notes (N)">×</button>
    </div>
    <p></p>
  </div>

  <script>
    (() => {
      'use strict';
      /* ============ shared helpers ============ */
      const LW = 800, LH = 520, TAU = Math.PI * 2;
      const rnd = (a, b) => a + Math.random() * (b - a);
      const pick = a => a[(Math.random() * a.length) | 0];
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

      const chemHTML = s => s.replace(/_\{([^}]*)\}/g, '<sub>$1</sub>').replace(/\\^\\{([^}]*)\\}/g, '<sup>$1</sup>');
      document.querySelectorAll('.chem').forEach(e => { e.innerHTML = chemHTML(e.innerHTML) });

      const MONO = "'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace";
      const DISP = "'Archivo', 'Arial Narrow', Arial, sans-serif";
      const TOK = ['paper', 'panel', 'ink', 'ink2', 'rule', 'wsolid', 'ca', 'mg', 'na', 'h', 'oh', 'cl', 'so4', 'h2o', 'hco3', 'iontext', 'imp', 'scale', 'glow'];
      const COL = {};
      function readColors() {
        const cs = getComputedStyle(document.documentElement);
        TOK.forEach(k => { COL[k] = cs.getPropertyValue('--' + k).trim() });
      }
      readColors();

      function rr(c, x, y, w, h, r) {
        c.beginPath();
        if (c.roundRect) c.roundRect(x, y, w, h, r);
        else c.rect(x, y, w, h);
      }

      /* text with _{sub} and ^{sup} markup */
      function fx(c, s, x, y, size, color, align, weight) {
        weight = weight || 500;
        const parts = s.split(/(_\\{[^}]*\\}|\\^\\{[^}]*\\})/).filter(Boolean).map(p => {
          const m = /^([_^])\\{([^}]*)\\}$/.exec(p);
          return m ? { t: m[2], k: m[1], z: size * 0.68 } : { t: p, k: '', z: size };
        });
        let w = 0;
        parts.forEach(p => {
          c.font = weight + ' ' + p.z + 'px ' + MONO;
          p.w = c.measureText(p.t).width;
          w += p.w;
        });
        let cx = align === 'left' ? x : align === 'right' ? x - w : x - w / 2;
        c.fillStyle = color;
        c.textBaseline = 'middle';
        c.textAlign = 'left';
        parts.forEach(p => {
          c.font = weight + ' ' + p.z + 'px ' + MONO;
          const dy = p.k === '_' ? size * 0.3 : p.k === '^' ? -size * 0.38 : 0;
          c.fillText(p.t, cx, y + dy);
          cx += p.w;
        });
      }

      function follow(p, dt, sp) {
        const t = p.path[p.pi];
        if (!t) return true;
        const dx = t[0] - p.x, dy = t[1] - p.y, d = Math.hypot(dx, dy);
        const m = sp * Math.min(dt, 0.04);
        if (d <= m || d < 0.5) {
          p.x = t[0];
          p.y = t[1];
          p.pi++;
          return p.pi >= p.path.length;
        }
        p.x += dx / d * m;
        p.y += dy / d * m;
        return false;
      }

      function pipe(c, pts, w) {
        c.lineCap = 'butt';
        c.lineJoin = 'round';
        c.beginPath();
        pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]));
        c.strokeStyle = COL.ink;
        c.lineWidth = w + 4;
        c.stroke();
        c.strokeStyle = COL.wsolid;
        c.lineWidth = w;
        c.stroke();
      }

      function funnel(c, cx) {
        c.fillStyle = COL.panel;
        c.strokeStyle = COL.ink;
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(cx - 60, 450);
        c.lineTo(cx + 60, 450);
        c.lineTo(cx + 24, 478);
        c.lineTo(cx - 24, 478);
        c.closePath();
        c.fill();
        c.stroke();
        fx(c, 'DRAIN', cx, 498, 10, COL.ink2);
      }

      function strainer(c, x, y, w) {
        c.setLineDash([5, 4]);
        c.strokeStyle = COL.ink2;
        c.lineWidth = 1.5;
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x + w, y);
        c.stroke();
        c.setLineDash([]);
      }

      const IONS = {
        Ca: { l: 'Ca', q: '2+', r: 15, c: 'ca' },
        Mg: { l: 'Mg', q: '2+', r: 15, c: 'mg' },
        Na: { l: 'Na', q: '+', r: 12, c: 'na' },
        H: { l: 'H', q: '+', r: 12, c: 'h' },
        OH: { l: 'OH', q: '−', r: 12, c: 'oh' },
        Cl: { l: 'Cl', q: '−', r: 12, c: 'cl' },
        SO4: { l: 'SO_{4}', q: '2−', r: 17, c: 'so4', fs: 9.5 },
        HCO3: { l: 'HCO_{3}', q: '−', r: 17, c: 'hco3', fs: 9 },
        H2O: { l: 'H₂O', q: '', r: 13, c: 'h2o', fs: 9 }
      };

      function ion(c, t, x, y) {
        const d = IONS[t];
        c.beginPath();
        c.arc(x, y, d.r, 0, TAU);
        c.fillStyle = COL[d.c];
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = COL.ink;
        c.globalAlpha = 0.4;
        c.stroke();
        c.globalAlpha = 1;
        fx(c, d.l + (d.q ? '^{' + d.q + '}' : ''), x, y, d.fs || 11, COL.iontext, 'center', 600);
      }

      function chip(c, t, x, y) {
        const d = IONS[t];
        c.beginPath();
        c.arc(x, y, 8.5, 0, TAU);
        c.fillStyle = COL[d.c];
        c.fill();
        fx(c, d.l, x, y, t === 'SO4' || t === 'HCO3' ? 6.5 : 8.5, COL.iontext, 'center', 600);
      }

      /* ============ exchange bed: sites with two slots each ============ */
      class Bed {
        constructor(o) {
          Object.assign(this, o);
          this.res = new Array(o.cols).fill(0);
          this.sites = [];
          for (let r = 0; r < o.rows; r++) {
            for (let c = 0; c < o.cols; c++) {
              this.sites.push({
                c, r,
                x: o.x + (c + 0.5) * o.cw,
                y: o.y + (r + 0.5) * o.rh,
                s: [{ t: o.counter, d: false, z: false }, { t: o.counter, d: false, z: false }]
              });
            }
          }
        }
        at(r, c) { return this.sites[r * this.cols + c]; }
        colX(c) { return this.x + (c + 0.5) * this.cw; }
        free(s) { return (s.s[0].t === this.counter ? 1 : 0) + (s.s[1].t === this.counter ? 1 : 0); }
        freeSlots(c) {
          let n = 0;
          for (let r = 0; r < this.rows; r++) n += this.free(this.at(r, c));
          return n;
        }
        boundSlots(c) { return this.rows * 2 - this.freeSlots(c); }
        frac() {
          let n = 0;
          for (const s of this.sites) n += 2 - this.free(s);
          return n / (this.sites.length * 2);
        }
        capSite(c, z) {
          for (let r = 0; r < this.rows; r++) {
            const s = this.at(r, c), f = this.free(s);
            if (z === 2 ? f === 2 : f >= 1) return s;
          }
          return null;
        }
        take(s, t, z) {
          let n = 0;
          for (const k of s.s) {
            if (k.t === this.counter && n < z) {
              k.t = t;
              k.d = z === 2;
              k.z = false;
              n++;
            }
          }
        }
        regenSite(c) {
          for (let r = 0; r < this.rows; r++) {
            const s = this.at(r, c);
            if (s.s[0].t !== this.counter || s.s[1].t !== this.counter) return s;
          }
          return null;
        }
        give(s) {
          const k = s.s.find(q => q.t !== this.counter);
          if (!k) return null;
          const t = k.t, wasD = k.d, wasZ = k.z;
          k.t = this.counter;
          k.d = false;
          k.z = false;
          if (wasD) {
            const o = s.s.find(q => q.t === t && q.d);
            if (o) {
              o.d = false;
              o.z = true;
              return null;
            }
          }
          return { t, z: (wasD || wasZ) ? 2 : 1 };
        }
        assignCap(z) {
          let best = [], m = -1;
          for (let c = 0; c < this.cols; c++) {
            const f = this.freeSlots(c) - this.res[c];
            if (f >= z) {
              if (f > m) { m = f; best = []; }
              if (f === m) best.push(c);
            }
          }
          if (!best.length) return -1;
          const c = pick(best);
          this.res[c] += z;
          return c;
        }
        assignRegen() {
          let best = [], m = 0;
          for (let c = 0; c < this.cols; c++) {
            const f = this.boundSlots(c) - this.res[c];
            if (f >= 1) {
              if (f > m) { m = f; best = []; }
              if (f === m) best.push(c);
            }
          }
          if (!best.length) return -1;
          const c = pick(best);
          this.res[c] += 1;
          return c;
        }
        fillWith(fn, anion) {
          for (const s of this.sites) {
            if (anion) {
              if (Math.random() < 0.5) {
                s.s[0] = { t: 'SO4', d: true, z: false };
                s.s[1] = { t: 'SO4', d: true, z: false };
              } else {
                s.s[0] = { t: 'Cl', d: false, z: false };
                s.s[1] = { t: 'Cl', d: false, z: false };
              }
            } else {
              const t = fn();
              s.s[0] = { t, d: true, z: false };
              s.s[1] = { t, d: true, z: false };
            }
          }
        }
        draw(c, label) {
          for (const s of this.sites) {
            c.fillStyle = COL.panel;
            c.strokeStyle = COL.ink2;
            c.lineWidth = 1;
            rr(c, s.x - 17, s.y - 11, 34, 22, 4);
            c.fill();
            c.stroke();
            const a = s.s[0], b = s.s[1];
            if (a.d && b.d && a.t === b.t) ion(c, a.t, s.x, s.y);
            else {
              fx(c, label, s.x, s.y, 9, COL.ink2);
              chip(c, a.t, s.x - 22.5, s.y);
              chip(c, b.t, s.x + 22.5, s.y);
            }
          }
        }
      }

      /* ============ base simulation ============ */
      class Sim {
        constructor(sec) {
          this.sec = sec;
          this.cv = sec.querySelector('canvas');
          this.c = this.cv.getContext('2d');
          this.speed = 1;
          this.playing = false;
          this.stage = 0;
          this.t = 0;
          this.clock = 0;
          this.ps = [];
          this.log = [];
        }
        start() { this.buildUI(); this.reset(); }
        buildUI() {
          const ctl = this.sec.querySelector('.ctl');
          ctl.innerHTML = '<div class="row"><button class="btn pri" data-a="play">Play</button><button class="btn" data-a="reset">Reset</button><span class="grow"></span><span class="lab">Speed</span>'
            + [0.5, 1, 2].map(s => '<button class="btn sm' + (s === 1 ? ' on' : '') + '" data-s="' + s + '" aria-pressed="' + (s === 1) + '">' + s + '×</button>').join('')
            + '</div><div class="seg">' + this.stages.map((s, i) => '<button data-i="' + i + '"><b>' + s.name + '</b><i></i></button>').join('') + '</div>';
          this.btnPlay = ctl.querySelector('[data-a=play]');
          ctl.addEventListener('click', e => {
            const b = e.target.closest('button');
            if (!b) return;
            b.blur();
            if (b.dataset.a === 'play') this.toggle();
            else if (b.dataset.a === 'reset') this.reset();
            else if (b.dataset.s) {
              this.speed = +b.dataset.s;
              ctl.querySelectorAll('[data-s]').forEach(x => {
                const on = x === b;
                x.classList.toggle('on', on);
                x.setAttribute('aria-pressed', on);
              });
            } else if (b.dataset.i !== undefined) this.jump(+b.dataset.i);
          });
          this.segs = [...ctl.querySelectorAll('.seg button')];
          this.now = this.sec.querySelector('.now');
          const eq = this.sec.querySelector('.eqs');
          if (this.eqs && this.eqs.length) {
            eq.innerHTML = this.eqs.map(e => '<li>' + chemHTML(e) + '</li>').join('');
            this.eqEls = [...eq.children];
          } else {
            eq.hidden = true;
            this.eqEls = [];
          }
        }
        isDone() { const st = this.stages[this.stage]; return st.done ? st.done(this) : this.t >= st.dur; }
        finished() { return !this.playing && this.stage === this.stages.length - 1 && this.isDone(); }
        toggle() {
          if (this.finished()) this.reset();
          this.playing = !this.playing;
          this.sync();
        }
        reset() {
          this.playing = false;
          this.clock = 0;
          this.ps = [];
          this.log = [];
          this.init();
          this.stage = 0;
          this.t = 0;
          this.ui();
          this.sync();
          this.draw();
        }
        jump(i) {
          const was = this.playing;
          this.ps = [];
          this.log = [];
          this.init();
          this.stage = i;
          this.t = 0;
          this.prepare(i);
          this.playing = was;
          this.ui();
          this.sync();
          this.draw();
        }
        prevStage() { this.jump(Math.max(0, this.stage - 1)); }
        nextStage() { this.jump(Math.min(this.stages.length - 1, this.stage + 1)); }
        go(i) { this.stage = i; this.t = 0; this.ui(); }
        ui() {
          const st = this.stages[this.stage];
          this.now.innerHTML = chemHTML(st.text);
          this.segs.forEach((b, i) => b.classList.toggle('on', i === this.stage));
          this.eqEls.forEach((li, i) => li.classList.toggle('on', (st.eq || []).includes(i)));
        }
        sync() {
          this.btnPlay.textContent = this.playing ? 'Pause' : (this.finished() ? 'Replay' : (this.clock > 0 ? 'Resume' : 'Play'));
        }
        prog() { const st = this.stages[this.stage]; return st.prog ? st.prog(this) : this.t / st.dur; }
        bars() {
          this.segs.forEach((b, i) => {
            const v = i < this.stage ? 1 : i > this.stage ? 0 : this.prog();
            b.lastElementChild.style.width = (clamp(v, 0, 1) * 100).toFixed(1) + '%';
          });
        }
        tick(dt) {
          if (this.playing) {
            const d = Math.min(dt, 0.05) * this.speed;
            this.t += d;
            this.clock += d;
            this.update(d);
            this.ps = this.ps.filter(p => !p.dead);
            if (this.isDone()) {
              if (this.stage < this.stages.length - 1) this.go(this.stage + 1);
              else { this.playing = false; this.sync(); }
            }
          }
          this.draw();
          this.bars();
        }
        fit() {
          const w = this.cv.clientWidth;
          if (!w) return false;
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const W = Math.round(w * dpr);
          if (this.cv.width !== W) {
            this.cv.width = W;
            this.cv.height = Math.round(W * LH / LW);
          }
          return true;
        }
        begin() {
          const cv = this.cv, k = cv.width / LW, c = this.c;
          c.setTransform(k, 0, 0, k, 0, 0);
          c.clearRect(0, 0, LW, LH);
          c.fillStyle = COL.paper;
          c.fillRect(0, 0, LW, LH);
          c.textBaseline = 'middle';
          return c;
        }
        gauge(w) {
          let n = 0, h = 0;
          for (let i = this.log.length - 1; i >= 0; i--) {
            const e = this.log[i];
            if (this.clock - e.t > (w || 5)) break;
            n++;
            if (e.bad) h++;
          }
          return { n, f: n ? h / n : 0 };
        }
      }

      /* ============ 1 · hard water: scale forming ============ */
      class Scale extends Sim {
        constructor(sec) {
          super(sec);
          this.stages = [
            { name: 'Cold water', dur: 6, text: 'Ca(HCO_{3})_{2} is completely dissolved as free Ca²⁺ and HCO_{3}^{−} ions. At room temperature, kinetic energy is insufficient to break chemical bonds.', eq: [] },
            { name: 'Heating', done: s => s.reacted >= s.total * 0.5, prog: s => s.reacted / (s.total * 0.5), text: 'Applied heat breaks bicarbonate ions apart into insoluble CaCO₃, water, and escaping CO_{2} gas. Solid CaCO₃ crystallites begin settling.', eq: [0] },
            { name: 'Scale growth', done: s => s.reacted >= s.total && s.t > 2, prog: s => (s.reacted - s.total * 0.5) / (s.total * 0.5), text: 'Insoluble CaCO₃ crystals cement onto the heated surface, forming a hard, adherent scale crust. Scale acts as a heat insulator, wasting fuel and risking tube rupture.', eq: [0, 1] }
          ];
          this.eqs = [
            'Ca(HCO_{3})_{2} (heat Δ) → CaCO₃↓ + H₂O + CO_{2}↑',
            'Mg(HCO_{3})_{2} (heat Δ) → Mg(OH)_{2}↓ + 2CO_{2}↑'
          ];
          this.start();
        }
        init() {
          this.total = 7;
          this.reacted = 0;
          this.bins = new Array(6).fill(0);
          this.fxs = [];
          const mk = t => ({ t, x: rnd(262, 538), y: rnd(165, 370), wx: 0, wy: 0, wt: 0, st: 'free' });
          for (let i = 0; i < this.total; i++) this.ps.push(mk('Ca'));
          for (let i = 0; i < this.total * 2; i++) this.ps.push(mk('HCO3'));
        }
        prepare(i) {
          if (i >= 2) {
            for (let k = 0; k < 1200 && this.reacted < this.total * 0.5; k++) {
              this.update(0.05);
              this.ps = this.ps.filter(p => !p.dead);
            }
          }
        }
        hgt() { return Math.max(...this.bins); }
        update(d) {
          const hot = this.stage >= 1;
          for (const p of this.ps) {
            if (p.st === 'free') {
              p.wt -= d;
              if (p.wt <= 0) {
                const a = rnd(0, TAU), s = rnd(12, 32);
                p.wx = Math.cos(a) * s;
                p.wy = Math.sin(a) * s + (hot ? 14 : 0);
                p.wt = rnd(0.3, 0.8);
              }
              const r = IONS[p.t].r;
              const binIdx = clamp(Math.floor((p.x - 230) / 56.67), 0, 5);
              const localH = this.bins[binIdx] || 0;
              p.x = clamp(p.x + p.wx * d, 230 + r, 570 - r);
              p.y = clamp(p.y + p.wy * d, 146 + r, 402 - localH - r);
            }
          }
          if (hot) {
            for (const ca of this.ps) {
              const binIdx = clamp(Math.floor((ca.x - 230) / 56.67), 0, 5);
              const localH = this.bins[binIdx] || 0;
              if (ca.t !== 'Ca' || ca.st !== 'free' || ca.y < 402 - localH - 70) continue;
              const fr = this.ps.filter(q => q.t === 'HCO3' && q.st === 'free').sort((a, b) => Math.hypot(a.x - ca.x, a.y - ca.y) - Math.hypot(b.x - ca.x, b.y - ca.y));
              if (fr.length >= 2) {
                ca.st = 'rx';
                ca.m = [fr[0], fr[1]];
                fr[0].st = 'mv';
                fr[1].st = 'mv';
                fr[0].to = ca;
                fr[1].to = ca;
              }
            }
          }
          for (const q of this.ps) {
            if (q.st === 'mv') {
              const ca = q.to;
              if (!ca || ca.dead) { q.st = 'free'; continue; }
              const dx = ca.x - q.x, dy = ca.y - q.y, dd = Math.hypot(dx, dy);
              if (dd > 6) {
                q.x += dx / dd * 130 * d;
                q.y += dy / dd * 130 * d;
              } else {
                q.near = true;
              }
            }
          }
          for (const ca of this.ps) {
            if (ca.st === 'rx' && ca.m && ca.m[0] && ca.m[1] && ca.m[0].near && ca.m[1].near) {
              ca.m[0].dead = ca.m[1].dead = ca.dead = true;
              this.reacted++;
              this.fxs.push({ k: 'xt', x: ca.x, y: ca.y });
              this.fxs.push({ k: 'co', x: ca.x + 12, y: ca.y - 8 });
            }
          }
          for (const f of this.fxs) {
            if (f.k === 'xt') {
              f.y += 85 * d;
              const b = clamp(Math.floor((f.x - 230) / 56.67), 0, 5);
              if (f.y >= 402 - this.bins[b] - 9) {
                this.bins[b] += 18;
                f.dead = true;
              }
            } else {
              f.y -= 64 * d;
              f.x += Math.sin(f.y * 0.06) * 8 * d;
              if (f.y < 145) f.dead = true;
            }
          }
          this.fxs = this.fxs.filter(f => !f.dead);
        }
        draw() {
          const c = this.begin();
          c.fillStyle = COL.wsolid;
          c.fillRect(230, 140, 340, 262);
          c.strokeStyle = COL.ink;
          c.lineWidth = 3;
          c.beginPath();
          c.moveTo(228, 110);
          c.lineTo(228, 402);
          c.lineTo(572, 402);
          c.lineTo(572, 110);
          c.stroke();
          c.strokeStyle = COL.h2o;
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(230, 140);
          c.lineTo(570, 140);
          c.stroke();
          const hot = this.stage >= 1;
          c.fillStyle = hot ? COL.h : COL.ink2;
          c.fillRect(220, 402, 360, 22);
          if (hot) {
            c.strokeStyle = COL.glow;
            c.lineWidth = 2;
            for (let k = 0; k < 7; k++) {
              const x = 250 + k * 50;
              c.beginPath();
              for (let y = 0; y <= 24; y += 3) {
                const xx = x + Math.sin(y * 0.5 + this.clock * 7 + k) * 4;
                y ? c.lineTo(xx, 430 + y) : c.moveTo(xx, 430);
              }
              c.stroke();
            }
          }
          for (let b = 0; b < 6; b++) {
            const h = this.bins[b];
            if (h > 0) {
              const bx = 230 + b * 56.67;
              c.fillStyle = COL.scale;
              c.fillRect(bx, 402 - h, 56.67, h);
              c.strokeStyle = COL.ink2;
              c.lineWidth = 1;
              c.strokeRect(bx, 402 - h, 56.67, h);
              // subtle crystal grain line
              c.strokeStyle = COL.paper;
              c.lineWidth = 1;
              c.beginPath();
              c.moveTo(bx + 4, 402 - h + 2);
              c.lineTo(bx + 52, 402 - h + 2);
              c.stroke();
            }
          }
          for (const p of this.ps) ion(c, p.t, p.x, p.y);
          for (const f of this.fxs) {
            if (f.k === 'xt') {
              c.fillStyle = COL.scale;
              c.strokeStyle = COL.ink;
              c.lineWidth = 1;
              rr(c, f.x - 14, f.y - 9, 28, 18, 3);
              c.fill();
              c.stroke();
              fx(c, 'CaCO₃', f.x, f.y, 8, COL.paper, 'center', 600);
            } else {
              c.beginPath();
              c.arc(f.x, f.y, 10, 0, TAU);
              c.fillStyle = COL.paper;
              c.globalAlpha = 0.6;
              c.fill();
              c.globalAlpha = 1;
              c.strokeStyle = COL.ink2;
              c.lineWidth = 1.2;
              c.stroke();
              fx(c, 'CO_{2}', f.x, f.y, 8, COL.ink, 'center', 500);
            }
          }
          fx(c, 'HEATED VESSEL', 20, 150, 10.5, COL.ink2, 'left');
          fx(c, 'hard water', 20, 168, 12, COL.ink, 'left');
          fx(c, 'HEATING SURFACE', 20, 414, 10.5, COL.ink2, 'left');
          fx(c, 'DISSOLVED Ca(HCO_{3})_{2}', 596, 150, 10.5, COL.ink2, 'left');
          c.font = '800 30px ' + DISP;
          c.fillStyle = COL.ink;
          c.textAlign = 'left';
          c.fillText((this.total - this.reacted) + ' / ' + this.total, 596, 182);
          fx(c, 'ions left in bulk', 596, 206, 11, COL.ink2, 'left');
          fx(c, 'CaCO₃ SCALE', 596, 372, 10.5, COL.ink2, 'left');
          c.strokeStyle = COL.ink2;
          c.lineWidth = 1;
          c.beginPath();
          c.moveTo(592, 385);
          c.lineTo(574, 392);
          c.stroke();
          fx(c, hot ? 'insulating crust' : 'no deposit yet', 596, 392, 12, COL.ink, 'left');
        }
      }

      /* ============ 2 · zeolite ============ */
      class Zeolite extends Sim {
        constructor(sec) {
          super(sec);
          this.stages = [
            { name: 'Service', prog: s => s.bed.frac(), done: s => s.bed.frac() >= 0.97, text: 'Raw hard water percolates down through the active Na₂Ze bed. Each divalent Ca²⁺ or Mg²⁺ ion displaces two monovalent Na⁺ ions into the effluent. Soft water leaves.', eq: [0, 1, 2] },
            { name: 'Exhaustion', dur: 7, text: 'Exchange sites saturate with Ca²⁺ and Mg²⁺. Hardness breakthrough occurs; unexchanged hard ions slip into the effluent, turning the outlet gauge HARD.', eq: [] },
            { name: 'Regeneration', prog: s => 1 - s.bed.frac(), done: s => s.bed.frac() <= 0.02 && s.t > 2, text: 'A concentrated 10% NaCl brine solution floods the bed. Le Chatelier excess of Na⁺ reverses the equilibrium, washing CaCl_{2} and MgCl_{2} out to drain.', eq: [3, 4] },
            { name: 'Back in service', dur: 8, text: 'Rinsing completes; the bed is restored to active Na₂Ze form. Hard water enters and pure softened water leaves. The cyclic operation resumes.', eq: [0, 1, 2] }
          ];
          this.eqs = [
            'Na₂Ze + Ca(HCO_{3})_{2} → CaZe + 2NaHCO_{3}',
            'Na₂Ze + MgCl_{2} → MgZe + 2NaCl',
            'Na₂Ze + CaSO_{4} → CaZe + Na_{2}SO_{4}',
            'CaZe + 2NaCl (10% brine) ⇌ Na₂Ze + CaCl_{2}',
            'MgZe + 2NaCl (10% brine) ⇌ Na₂Ze + MgCl_{2}'
          ];
          this.start();
        }
        init() {
          this.bed = new Bed({ x: 235, y: 216, cols: 5, rows: 5, cw: 66, rh: 34, counter: 'Na' });
          this.sp = 0;
          this.cx = 400;
        }
        prepare(i) {
          if (i === 1 || i === 2) this.bed.fillWith(() => pick(['Ca', 'Ca', 'Mg']));
        }
        mk(t, col, o, lag) {
          const x = this.bed.colX(col);
          return Object.assign({ t, x: -14 - (lag || 0), y: 108, col, mode: 'pipe', path: [[x, 108], [x, 206]], pi: 0 }, o);
        }
        route(x) {
          return this.stage === 2 ? [[x, 432], [this.cx, 458], [this.cx, 540]] : [[x, 424], [830, 424]];
        }
        out(t, x, y, o) {
          this.ps.push(Object.assign({ t, x, y, mode: 'out', path: this.route(x), pi: 0 }, o || {}));
        }
        update(d) {
          const b = this.bed, st = this.stage;
          this.sp -= d;
          if (this.sp <= 0) {
            if (st === 2) {
              this.sp = 0.2;
              const c = b.assignRegen();
              this.ps.push(this.mk('Na', c < 0 ? (Math.random() * 5 | 0) : c, { react: true, regen: true, resv: c < 0 ? 0 : 1 }));
              this.ps.push(this.mk('Cl', (Math.random() * 5) | 0, {}, 38));
            } else {
              this.sp = 0.5;
              const h = Math.random() < 0.65 ? 'Ca' : 'Mg', c = b.assignCap(2);
              this.ps.push(this.mk(h, c < 0 ? (Math.random() * 5 | 0) : c, { react: true, resv: c < 0 ? 0 : 2 }));
              for (let k = 1; k <= 2; k++) {
                this.ps.push(this.mk('Cl', (Math.random() * 5) | 0, {}, k * 34));
              }
            }
          }
          const bot = b.y + b.rows * b.rh;
          for (const p of this.ps) {
            if (p.mode === 'pipe') {
              if (follow(p, d, 150)) p.mode = 'sink';
            } else if (p.mode === 'sink') {
              p.y += (p.y < b.y ? 110 : (p.react ? 58 : 125)) * d;
              if (p.react) {
                const s = p.regen ? b.regenSite(p.col) : b.capSite(p.col, 2);
                if (s && p.y >= s.y - 6) {
                  b.res[p.col] = Math.max(0, b.res[p.col] - (p.resv || 0));
                  p.resv = 0;
                  if (p.regen) {
                    const rel = b.give(s);
                    if (rel) this.out(rel.t, s.x, s.y);
                  } else {
                    b.take(s, p.t, 2);
                    this.out('Na', s.x - 20, s.y);
                    this.out('Na', s.x + 20, s.y);
                  }
                  p.dead = true;
                  continue;
                }
                if (!s && p.y >= bot) {
                  b.res[p.col] = Math.max(0, b.res[p.col] - (p.resv || 0));
                  p.resv = 0;
                  p.mode = 'out';
                  p.path = this.route(p.x);
                  p.pi = 0;
                }
              } else if (p.y >= bot) {
                p.mode = 'out';
                p.path = this.route(p.x);
                p.pi = 0;
              }
            } else if (p.mode === 'out') {
              if (!p.lg && p.x > 568 && this.stage !== 2) {
                p.lg = 1;
                if (p.t !== 'Cl') this.log.push({ t: this.clock, bad: p.t !== 'Na' });
              }
              if (follow(p, d, 110)) p.dead = true;
            }
          }
        }
        dp(c, p, b) {
          const bot = b.y + b.rows * b.rh;
          const inb = p.y > b.y - 10 && p.y < bot + 10 && p.x > b.x && p.x < b.x + b.cols * b.cw;
          c.globalAlpha = inb && !(p.mode === 'sink' && p.react) ? 0.5 : 1;
          ion(c, p.t, p.x, p.y);
          c.globalAlpha = 1;
        }
        draw() {
          const c = this.begin(), b = this.bed, bot = b.y + b.rows * b.rh;
          funnel(c, this.cx);
          c.fillStyle = COL.wsolid;
          c.strokeStyle = COL.ink;
          c.lineWidth = 3;
          rr(c, 235, 66, 330, 384, 5);
          c.fill();
          c.stroke();
          c.fillStyle = COL.panel;
          c.globalAlpha = 0.6;
          c.fillRect(237, b.y - 2, 326, b.rows * b.rh + 4);
          c.globalAlpha = 1;
          strainer(c, 237, bot + 4, 326);
          pipe(c, [[0, 108], [239, 108]], 22);
          pipe(c, [[561, 424], [800, 424]], 22);
          b.draw(c, 'Ze');
          for (const p of this.ps) this.dp(c, p, b);
          fx(c, this.stage === 2 ? 'BRINE 10% NaCl' : 'HARD WATER IN', 12, 84, 10.5, COL.ink2, 'left');
          fx(c, 'ZEOLITE BED', 20, 300, 10.5, COL.ink2, 'left');
          fx(c, 'Na₂Ze grains', 20, 318, 12, COL.ink, 'left');
          c.strokeStyle = COL.ink2;
          c.lineWidth = 1;
          c.beginPath();
          c.moveTo(150, 300);
          c.lineTo(232, 300);
          c.stroke();
          if (this.stage !== 2) fx(c, 'SOFT WATER OUT', 796, 400, 10.5, COL.ink2, 'right');
          const g = this.gauge();
          let word = '—', col = COL.ink2, sub = '';
          if (this.stage === 2) {
            word = 'DRAIN';
            sub = 'CaCl_{2} + MgCl_{2} + NaCl';
          } else if (g.n) {
            const bad = g.f > 0.15;
            word = bad ? 'HARD' : 'SOFT';
            col = bad ? COL.ca : COL.oh;
            sub = 'hard ions in effluent: ' + Math.round(g.f * 100) + '%';
          }
          fx(c, 'EFFLUENT QUALITY', 596, 66, 10.5, COL.ink2, 'left');
          c.font = '800 32px ' + DISP;
          c.fillStyle = col;
          c.textAlign = 'left';
          c.fillText(word, 596, 98);
          c.fillStyle = COL.rule;
          c.fillRect(596, 122, 190, 6);
          c.fillStyle = COL.ca;
          c.fillRect(596, 122, 190 * (this.stage === 2 ? 0 : g.f), 6);
          fx(c, sub, 596, 144, 10, COL.ink2, 'left');
          fx(c, 'BED EXHAUSTION', 596, 180, 10.5, COL.ink2, 'left');
          c.fillStyle = COL.rule;
          c.fillRect(596, 196, 190, 6);
          c.fillStyle = COL.ink;
          c.fillRect(596, 196, 190 * b.frac(), 6);
          fx(c, Math.round(b.frac() * 100) + '% of grains saturated', 596, 218, 10, COL.ink2, 'left');
        }
      }

      /* ============ 3 · ion exchange (demineralisation) ============ */
      class IonEx extends Sim {
        constructor(sec) {
          super(sec);
          this.stages = [
            { name: 'Demineralisation', prog: s => s.A.frac(), done: s => s.A.frac() >= 0.97, text: 'Raw water flows through Cation bed (trading Ca²⁺, Mg²⁺ for H⁺), then through Anion bed (trading Cl^{−}, SO_{4}^{2−} for OH⁻). H⁺ and OH⁻ neutralize into pure H₂O.', eq: [0, 1, 2] },
            { name: 'Resin exhausted', dur: 8, text: 'Cation capacity depletes; hard ions break through into effluent. Free OH⁻ finds no H⁺ to neutralize. Electrical conductivity climbs sharply.', eq: [] },
            { name: 'Regen cations', prog: s => 1 - s.A.frac(), done: s => s.A.frac() <= 0.02 && s.t > 2, text: 'Dilute acid (HCl or H_{2}SO_{4}) regenerates the cation resin, replenishing H⁺ and flushing stripped CaCl_{2} and MgCl_{2} out to drain.', eq: [3] },
            { name: 'Regen anions', prog: s => 1 - s.B.frac(), done: s => s.B.frac() <= 0.02 && s.t > 2, text: 'Dilute alkali (NaOH) regenerates the anion resin, replenishing OH⁻ groups and flushing out bound chlorides and sulphates.', eq: [4] }
          ];
          this.eqs = [
            'RH_{2} + Ca²⁺ → RCa + 2H⁺ (cation exchange)',
            'R′(OH)_{2} + 2Cl^{−} → R′Cl_{2} + 2OH⁻ (anion exchange)',
            'H⁺ + OH⁻ → H₂O (pure DM water neutralization)',
            'RCa + 2HCl → RH_{2} + CaCl_{2} (acid regeneration)',
            'R′Cl_{2} + 2NaOH → R′(OH)_{2} + 2NaCl (alkali regeneration)'
          ];
          this.start();
        }
        init() {
          this.A = new Bed({ x: 36, y: 216, cols: 4, rows: 5, cw: 66, rh: 34, counter: 'H' });
          this.B = new Bed({ x: 420, y: 216, cols: 4, rows: 5, cw: 66, rh: 34, counter: 'OH' });
          this.sp = 0;
          this.cxA = 168;
          this.cxB = 552;
          this.ripples = [];
        }
        prepare(i) {
          if (i >= 1) this.A.fillWith(() => pick(['Ca', 'Ca', 'Mg']));
          if (i >= 1 && i !== 2 || i === 2) this.B.fillWith(null, true);
          if (i === 3) this.A = new Bed({ x: 36, y: 216, cols: 4, rows: 5, cw: 66, rh: 34, counter: 'H' });
        }
        mk(t, bn, col, o, lag, x0) {
          const b = bn === 'A' ? this.A : this.B, x = b.colX(col);
          return Object.assign({ t, bed: bn, col, x: (x0 == null ? -14 : x0) - (lag || 0), y: 108, mode: 'pipe', path: [[x, 108], [x, 206]], pi: 0 }, o);
        }
        rc(n) { return (Math.random() * n) | 0; }
        feedUnit() {
          const c = this.A.assignCap(2), h = Math.random() < 0.6 ? 'Ca' : 'Mg';
          this.ps.push(this.mk(h, 'A', c < 0 ? this.rc(4) : c, { rA: true, resv: c < 0 ? 0 : 2 }));
          (Math.random() < 0.5 ? ['SO4'] : ['Cl', 'Cl']).forEach((t, k) => this.ps.push(this.mk(t, 'A', this.rc(4), { an: true, z: t === 'SO4' ? 2 : 1 }, (k + 1) * 34)));
        }
        update(d) {
          const st = this.stage;
          this.sp -= d;
          if (this.sp <= 0) {
            if (st === 2) {
              this.sp = 0.22;
              const c = this.A.assignRegen();
              this.ps.push(this.mk('H', 'A', c < 0 ? this.rc(4) : c, { rA: true, regen: true, resv: c < 0 ? 0 : 1 }));
              this.ps.push(this.mk('Cl', 'A', this.rc(4), {}, 34));
            } else if (st === 3) {
              this.sp = 0.22;
              const c = this.B.assignRegen();
              this.ps.push(this.mk('OH', 'B', c < 0 ? this.rc(4) : c, { rB: true, regen: true, resv: c < 0 ? 0 : 1 }, 0, 368));
              this.ps.push(this.mk('Na', 'B', this.rc(4), {}, 0, 368));
            } else {
              this.sp = 0.8;
              this.feedUnit();
            }
          }
          for (const p of this.ps) {
            if (p.dead) continue;
            if (p.mode === 'pipe') {
              if (follow(p, d, 150)) p.mode = p.bed === 'A' ? 'sinkA' : 'sinkB';
            } else if (p.mode === 'sinkA') this.sink(p, d, this.A);
            else if (p.mode === 'sinkB') this.sink(p, d, this.B);
            else if (p.mode === 'xfer') {
              if (follow(p, d, 140)) p.mode = 'sinkB';
            } else if (p.mode === 'ch') this.chamber(p, d);
            else if (p.mode === 'mate') this.mate(p, d);
            else if (p.mode === 'out') {
              if (!p.lg && p.x > 690 && this.stage < 2) {
                p.lg = 1;
                this.log.push({ t: this.clock, bad: p.t !== 'H2O' });
              }
              if (follow(p, d, 110)) p.dead = true;
            }
          }
          this.pairing();
        }
        release(t, x, y, bn) {
          this.ps.push({ t, bed: bn, col: 0, x, y, mode: bn === 'A' ? 'sinkA' : 'sinkB', pi: 0 });
        }
        sink(p, d, b) {
          const isA = b === this.A, bot = b.y + b.rows * b.rh;
          const react0 = isA ? p.rA : p.rB;
          p.y += (p.y < b.y ? 110 : (react0 ? 58 : 125)) * d;
          const react = isA ? p.rA : p.rB;
          if (react) {
            const z = p.z || 2, s = p.regen ? b.regenSite(p.col) : b.capSite(p.col, z);
            if (s && p.y >= s.y - 6) {
              b.res[p.col] = Math.max(0, b.res[p.col] - (p.resv || 0));
              p.resv = 0;
              if (p.regen) {
                const rel = b.give(s);
                if (rel) this.release(rel.t, s.x, s.y, isA ? 'A' : 'B');
              } else {
                b.take(s, p.t, z);
                for (let k = 0; k < z; k++) {
                  this.release(isA ? 'H' : 'OH', s.x + (k ? 20 : -20), s.y, isA ? 'A' : 'B');
                }
              }
              p.dead = true;
              return;
            }
            if (!s && p.y >= bot) {
              b.res[p.col] = Math.max(0, b.res[p.col] - (p.resv || 0));
              p.resv = 0;
              if (isA) p.rA = false; else p.rB = false;
              this.exitBed(p, isA);
            }
          } else if (p.y >= bot) this.exitBed(p, isA);
        }
        exitBed(p, isA) {
          if (isA) {
            if (this.stage === 2) {
              p.mode = 'out';
              p.path = [[p.x, 432], [this.cxA, 458], [this.cxA, 540]];
              p.pi = 0;
            } else {
              let cb;
              p.rB = false;
              if (p.an) {
                cb = this.B.assignCap(p.z);
                if (cb < 0) { cb = this.rc(4); p.resv = 0; } else { p.resv = p.z; }
                p.rB = true;
              } else cb = this.rc(4);
              p.col = cb;
              p.bed = 'B';
              const xb = this.B.colX(cb);
              p.mode = 'xfer';
              p.path = [[p.x, 424], [360, 424], [360, 108], [xb, 108], [xb, 206]];
              p.pi = 0;
            }
          } else {
            if (this.stage === 3) {
              p.mode = 'out';
              p.path = [[p.x, 432], [this.cxB, 458], [this.cxB, 540]];
              p.pi = 0;
            } else {
              p.mode = 'ch';
              p.wait = (p.t === 'H' || p.t === 'OH') ? 5 : 1.5;
              p.wx = 0; p.wy = 0; p.wt = 0;
              p.y = Math.max(p.y, 402);
            }
          }
        }
        chamber(p, d) {
          const B = this.B;
          p.wt -= d;
          if (p.wt <= 0) {
            const a = rnd(0, TAU), s = rnd(10, 28);
            p.wx = Math.cos(a) * s;
            p.wy = Math.sin(a) * s * 0.6;
            p.wt = rnd(0.4, 0.9);
          }
          p.x = clamp(p.x + p.wx * d, B.x + 16, B.x + B.cols * B.cw - 16);
          p.y = clamp(p.y + p.wy * d, B.y + B.rows * B.rh + 16, 436);
          p.wait -= d;
          if (p.wait <= 0) {
            p.mode = 'out';
            p.path = [[684, 424], [830, 424]];
            p.pi = 0;
          }
        }
        pairing() {
          const hs = [], os = [];
          for (const p of this.ps) {
            if (p.dead || p.mode === 'mate' || p.x <= 424 || p.x > 700) continue;
            if (p.t === 'H') hs.push(p);
            else if (p.t === 'OH') os.push(p);
          }
          for (const o of os) {
            let best = null, bd = 1e9;
            for (const h of hs) {
              if (h.mate) continue;
              const dd = Math.hypot(h.x - o.x, h.y - o.y);
              if (dd < bd) { bd = dd; best = h; }
            }
            if (best && bd < 260) {
              o.mate = best;
              best.mate = o;
              o.mode = 'mate';
              best.mode = 'mate';
            }
          }
        }
        mate(p, d) {
          const m = p.mate;
          if (!m || m.dead) {
            p.mate = null;
            p.mode = 'ch';
            p.wait = 2.5;
            p.wt = 0; p.wx = 0; p.wy = 0;
            return;
          }
          const dx = m.x - p.x, dy = m.y - p.y, dd = Math.hypot(dx, dy);
          if (dd < 12) {
            if (!p.dead && !m.dead) {
              const x = (p.x + m.x) / 2, y = (p.y + m.y) / 2;
              p.dead = true;
              m.dead = true;
              this.ps.push({ t: 'H2O', bed: 'B', x, y, mode: 'out', path: [[x, 424], [830, 424]], pi: 0 });
              this.ripples.push({ x, y, r: 4, alpha: 1.0 });
            }
            return;
          }
          const sp = 95 * d;
          p.x += dx / dd * sp;
          p.y += dy / dd * sp;
        }
        draw() {
          const c = this.begin(), A = this.A, B = this.B;
          funnel(c, this.cxA);
          funnel(c, this.cxB);
          for (const b of [A, B]) {
            c.fillStyle = COL.wsolid;
            c.strokeStyle = COL.ink;
            c.lineWidth = 3;
            rr(c, b.x - 3, 66, b.cols * b.cw + 6, 384, 5);
            c.fill();
            c.stroke();
            c.fillStyle = COL.panel;
            c.globalAlpha = 0.6;
            c.fillRect(b.x, b.y - 2, b.cols * b.cw, b.rows * b.rh + 4);
            c.globalAlpha = 1;
            strainer(c, b.x, b.y + b.rows * b.rh + 4, b.cols * b.cw);
          }
          pipe(c, [[0, 108], [40, 108]], 22);
          pipe(c, [[300, 424], [360, 424], [360, 108], [424, 108]], 22);
          pipe(c, [[680, 424], [800, 424]], 22);
          A.draw(c, 'R');
          B.draw(c, "R'");
          for (const p of this.ps) {
            const bd = p.bed === 'B' ? B : A;
            const inb = p.y > bd.y - 10 && p.y < bd.y + bd.rows * bd.rh + 10 && p.x > bd.x && p.x < bd.x + bd.cols * bd.cw;
            const rx = p.bed === 'B' ? p.rB : p.rA;
            c.globalAlpha = inb && !(rx && (p.mode === 'sinkA' || p.mode === 'sinkB')) ? 0.5 : 1;
            ion(c, p.t, p.x, p.y);
            c.globalAlpha = 1;
          }
          // neutralization ripples
          for (const rp of this.ripples) {
            c.save();
            c.beginPath();
            c.arc(rp.x, rp.y, rp.r, 0, TAU);
            c.strokeStyle = COL.h2o;
            c.lineWidth = 1.5;
            c.globalAlpha = rp.alpha;
            c.stroke();
            c.restore();
            rp.r += 32 * 0.03;
            rp.alpha -= 1.6 * 0.03;
          }
          this.ripples = this.ripples.filter(rp => rp.alpha > 0);

          fx(c, 'CATION EXCHANGER', 168, 40, 10.5, COL.ink2);
          fx(c, 'resin RH_{2}', 168, 56, 12, COL.ink);
          fx(c, 'ANION EXCHANGER', 552, 40, 10.5, COL.ink2);
          fx(c, "resin R'(OH)_{2}", 552, 56, 12, COL.ink);
          if (this.stage === 2) fx(c, 'DILUTE HCl REGEN', 12, 84, 10.5, COL.ink2, 'left');
          else if (this.stage === 3) fx(c, 'DILUTE NaOH REGEN', 362, 86, 10.5, COL.ink2);
          else fx(c, 'RAW FEED WATER', 12, 84, 10.5, COL.ink2, 'left');
          const g = this.gauge();
          let word = '—', col = COL.ink2, sub = '';
          if (this.stage >= 2) {
            word = 'DRAIN';
            sub = 'spent regenerant + mineral waste';
          } else if (g.n) {
            const bad = g.f > 0.12;
            word = bad ? 'IONS' : 'PURE DM';
            col = bad ? COL.ca : COL.oh;
            sub = 'ion leakage: ' + Math.round(g.f * 100) + '%';
          }
          fx(c, 'OUTLET EFFLUENT', 706, 64, 10.5, COL.ink2, 'left');
          c.font = '800 24px ' + DISP;
          c.fillStyle = col;
          c.textAlign = 'left';
          c.fillText(word, 706, 90);
          c.fillStyle = COL.rule;
          c.fillRect(706, 108, 86, 6);
          c.fillStyle = COL.ca;
          c.fillRect(706, 108, 86 * (this.stage >= 2 ? 0 : g.f), 6);
          fx(c, sub, 706, 126, 9, COL.ink2, 'left');
          fx(c, 'cation bed', 706, 170, 10, COL.ink2, 'left');
          c.fillStyle = COL.rule;
          c.fillRect(706, 182, 86, 6);
          c.fillStyle = COL.ink;
          c.fillRect(706, 182, 86 * A.frac(), 6);
          fx(c, 'anion bed', 706, 206, 10, COL.ink2, 'left');
          c.fillStyle = COL.rule;
          c.fillRect(706, 218, 86, 6);
          c.fillStyle = COL.ink;
          c.fillRect(706, 218, 86 * B.frac(), 6);
          fx(c, 'RESIN EXHAUSTION', 706, 150, 9, COL.ink2, 'left');
        }
      }

      /* ============ 4 · electrodialysis ============ */
      class ED extends Sim {
        constructor(sec) {
          super(sec);
          this.stages = [
            { name: 'Power off', dur: 6, text: 'Brackish water fills all five stack compartments. With zero electric field, ions disperse randomly by Brownian motion. CM membranes pass cations; AM membranes pass anions.', eq: [] },
            { name: 'Voltage on', prog: s => 1 - s.dilFrac(), done: s => s.dilFrac() <= 0.1, text: 'DC field applied: Cations (Na⁺, Ca²⁺) migrate toward the negative Cathode (−); anions (Cl^{−}) run toward the positive Anode (+). Membranes selectively block or pass ions.', eq: [0, 1] },
            { name: 'Steady separation', dur: 9, text: 'Compartments 2 and 4 are depleted of mineral ions, yielding fresh desalted product. Compartments 1, 3, and 5 collect concentrated reject brine.', eq: [0, 1] }
          ];
          this.eqs = [
            'Cathode (−): 2H₂O + 2e^{−} → H_{2}↑ + 2OH⁻',
            'Anode (+): 2Cl^{−} → Cl_{2}↑ + 2e^{−} (or 2H₂O → O_{2}↑ + 4H⁺ + 4e^{−})'
          ];
          this.start();
        }
        init() {
          const X0 = 84, X1 = 716, M = 10, w = (X1 - X0 - 4 * M) / 5;
          this.w = w;
          this.M = M;
          this.X0 = X0;
          this.X1 = X1;
          this.top = 138;
          this.bot = 412;
          this.V = false;
          this.n0 = 18;
          this.mem = [0, 1, 2, 3].map(k => ({ x: X0 + (k + 1) * w + k * M, type: k % 2 ? 'AM' : 'CM' }));
          this.ps = [];
          for (let ci = 0; ci < 5; ci++) {
            const x0 = X0 + ci * (w + M);
            const mk = (t, n) => {
              for (let i = 0; i < n; i++) {
                this.ps.push({ t, x: x0 + rnd(16, w - 16), y: rnd(this.top + 16, this.bot - 16), wx: 0, wy: 0, wt: 0 });
              }
            };
            mk('Na', 6);
            mk('Ca', 2);
            mk('Cl', 10);
          }
        }
        prepare(i) {
          if (i >= 2) {
            this.V = true;
            for (let k = 0; k < 1600; k++) this.update(0.03);
          }
        }
        comp(x) {
          let k = 0;
          for (const m of this.mem) if (x > m.x + this.M / 2) k++;
          return k;
        }
        dilFrac() {
          let n = 0;
          for (const p of this.ps) {
            const ci = this.comp(p.x);
            if (ci === 1 || ci === 3) n++;
          }
          return n / (2 * this.n0);
        }
        update(d) {
          if (this.stage >= 1) this.V = true;
          for (const p of this.ps) {
            p.wt -= d;
            if (p.wt <= 0) {
              const a = rnd(0, TAU), s = rnd(8, 26);
              p.wx = Math.cos(a) * s;
              p.wy = Math.sin(a) * s;
              p.wt = rnd(0.3, 0.8);
            }
            const cat = p.t !== 'Cl';
            const dr = this.V ? (cat ? -1 : 1) * (p.t === 'Ca' ? 30 : 26) : 0;
            const r = IONS[p.t].r;
            let nx = p.x + (p.wx + dr) * d;
            let ny = p.y + p.wy * d;
            // Robust one-sided boundary collision prevention
            for (const m of this.mem) {
              const ok = (m.type === 'CM') === cat;
              if (!ok) {
                if (p.x <= m.x) {
                  nx = Math.min(nx, m.x - r * 0.65);
                } else if (p.x >= m.x + this.M) {
                  nx = Math.max(nx, m.x + this.M + r * 0.65);
                }
              }
            }
            p.x = clamp(nx, this.X0 + r * 0.6, this.X1 - r * 0.6);
            p.y = clamp(ny, this.top + r, this.bot - r);
          }
        }
        draw() {
          const c = this.begin(), X0 = this.X0, X1 = this.X1, w = this.w, M = this.M, top = this.top, bot = this.bot;
          const cnt = [0, 0, 0, 0, 0];
          for (const p of this.ps) cnt[this.comp(p.x)]++;
          for (let ci = 0; ci < 5; ci++) {
            const x0 = X0 + ci * (w + M);
            c.fillStyle = COL.wsolid;
            c.fillRect(x0, top, w, bot - top);
            if (this.V) {
              const dil = ci === 1 || ci === 3, f = cnt[ci] / this.n0;
              c.fillStyle = dil ? COL.paper : COL.ink;
              c.globalAlpha = dil ? (1 - clamp(f, 0, 1)) * 0.8 : clamp(f - 1, 0, 2) * 0.12;
              c.fillRect(x0, top, w, bot - top);
              c.globalAlpha = 1;
            }
          }
          for (const m of this.mem) {
            c.fillStyle = COL.ink2;
            c.globalAlpha = m.type === 'CM' ? 0.95 : 0.6;
            c.fillRect(m.x, top - 8, M, bot - top + 16);
            c.globalAlpha = 1;
            for (let y = top + 8; y < bot; y += 22) {
              fx(c, m.type === 'CM' ? '−' : '+', m.x + M / 2, y, 10, COL.paper, 'center', 700);
            }
            fx(c, m.type, m.x + M / 2, top - 20, 11, COL.ink, 'center', 700);
          }
          c.fillStyle = COL.ink;
          c.fillRect(X0 - 16, top - 8, 16, bot - top + 16);
          c.fillRect(X1, top - 8, 16, bot - top + 16);
          /* wiring + DC source */
          c.strokeStyle = COL.ink;
          c.lineWidth = 2.5;
          c.lineJoin = 'round';
          c.beginPath();
          c.moveTo(X0 - 8, top - 8);
          c.lineTo(X0 - 8, 44);
          c.lineTo(382, 44);
          c.moveTo(418, 44);
          c.lineTo(X1 + 8, 44);
          c.lineTo(X1 + 8, top - 8);
          c.stroke();
          c.lineWidth = 3;
          c.beginPath();
          c.moveTo(382, 34);
          c.lineTo(382, 54);
          c.stroke();
          c.lineWidth = 5;
          c.beginPath();
          c.moveTo(396, 28);
          c.lineTo(396, 60);
          c.stroke();
          c.lineWidth = 2.5;
          c.beginPath();
          c.moveTo(396, 44);
          c.lineTo(418, 44);
          c.stroke();
          fx(c, '−', 370, 26, 13, COL.ink, 'center', 700);
          fx(c, '+', 410, 26, 13, COL.ink, 'center', 700);
          fx(c, 'DC VOLTAGE SUPPLY', 396, 76, 9.5, COL.ink2);
          for (let ci = 0; ci < 5; ci++) {
            const x0 = X0 + ci * (w + M), mid = x0 + w / 2, dil = ci === 1 || ci === 3;
            let lab = 'feed';
            if (this.V) lab = dil ? 'DILUTE (PRODUCT)' : 'CONCENTRATE (BRINE)';
            fx(c, lab, mid, bot + 22, 10, this.V && dil ? COL.oh : COL.ink2, 'center', this.V ? 600 : 500);
            fx(c, (ci + 1) + (this.V ? '  ·  ' + Math.round(cnt[ci] / this.n0 * 100) + '% salinity' : ''), mid, bot + 40, 9.5, COL.ink2);
          }
          fx(c, 'CATHODE (−)', X0 - 8, bot + 66, 10.5, COL.ink2);
          fx(c, 'ANODE (+)', X1 + 8, bot + 66, 10.5, COL.ink2);
          for (const p of this.ps) ion(c, p.t, p.x, p.y);
          fx(c, 'cations migrate to cathode (−)  ·  anions migrate to anode (+)', 400, 500, 10.5, this.V ? COL.ink : COL.ink2);
        }
      }

      /* ============ 5 · reverse osmosis (RO) ============ */
      class RO extends Sim {
        constructor(sec) {
          super(sec);
          this.stages = [
            { name: 'Natural Osmosis (P < π)', dur: 7, text: 'Without applied pressure (P < π), water molecules naturally diffuse through the semi-permeable membrane into the concentrated saline arm to balance chemical potential.', eq: [0] },
            { name: 'Equilibrium (P = π)', dur: 6, text: 'Applied hydrostatic pressure balances solution osmotic pressure (P = π). Net solvent migration across the membrane drops to zero.', eq: [1] },
            { name: 'Reverse Osmosis (P > π)', dur: 18, text: 'Applied pressure exceeds osmotic pressure (P > π = 15–40 bar). Pure H₂O molecules are forced through membrane pores into the freshwater arm; ions are rejected.', eq: [2] },
            { name: 'Concentrate Flush', dur: 9, text: 'Pure desalted permeate overflows into the product tank. Concentrated reject brine is purged through the discharge valve to prevent membrane scaling.', eq: [2] }
          ];
          this.eqs = [
            'P < π : Natural Osmosis (solvent moves dilute → concentrated)',
            'P = π : Osmotic Equilibrium (hydrostatic pressure balances π)',
            'P > π : Reverse Osmosis (pure solvent forced concentrated → dilute, 99% ions rejected)'
          ];
          this.start();
        }
        init() {
          this.pistonY = 175;
          this.freshLevel = 200;
          this.appliedP = 0; // bar
          this.flux = 'left';
          this.permeateCount = 0;
          this.brineDrain = false;

          // Water particles: move between chambers or circulate
          this.h2o = [];
          for (let i = 0; i < 26; i++) {
            this.h2o.push({
              x: rnd(140, 310),
              y: rnd(200, 420),
              vx: rnd(-12, 12),
              vy: rnd(-12, 12),
              side: 'salt'
            });
          }
          for (let i = 0; i < 18; i++) {
            this.h2o.push({
              x: rnd(480, 650),
              y: rnd(220, 420),
              vx: rnd(-12, 12),
              vy: rnd(-12, 12),
              side: 'fresh'
            });
          }

          // Dissolved salt ions: strictly trapped in the salt chamber (left)
          this.ions = [];
          const mk = (t, n) => {
            for (let i = 0; i < n; i++) {
              this.ions.push({
                t,
                x: rnd(145, 315),
                y: rnd(210, 415),
                vx: rnd(-16, 16),
                vy: rnd(-16, 16)
              });
            }
          };
          mk('Na', 7);
          mk('Cl', 7);
          mk('Ca', 4);

          // Outflow droplets
          this.drops = [];
          this.ripples = [];
        }
        prepare(i) {
          if (i === 0) {
            this.pistonY = 170;
            this.freshLevel = 195;
            this.appliedP = 0;
            this.flux = 'left';
            this.brineDrain = false;
          } else if (i === 1) {
            this.pistonY = 175;
            this.freshLevel = 205;
            this.appliedP = 15;
            this.flux = 'none';
            this.brineDrain = false;
          } else if (i === 2) {
            this.pistonY = 190;
            this.freshLevel = 170;
            this.appliedP = 35;
            this.flux = 'right';
            this.brineDrain = false;
          } else if (i === 3) {
            this.pistonY = 230;
            this.freshLevel = 155;
            this.appliedP = 35;
            this.flux = 'right';
            this.brineDrain = true;
          }
        }
        update(d) {
          const X_L0 = 130, X_L1 = 330;
          const X_R0 = 470, X_R1 = 670;
          const X_MEM = 400, W_MEM = 18;
          const Y_BOT = 430, Y_MID_TOP = 320;

          // Animate pressure and levels per stage
          if (this.stage === 0) {
            this.appliedP = 0;
            this.flux = 'left';
            this.pistonY = Math.max(160, this.pistonY - d * 2);
            this.freshLevel = Math.min(220, this.freshLevel + d * 2);
            this.brineDrain = false;
          } else if (this.stage === 1) {
            this.appliedP = 15;
            this.flux = 'none';
            this.brineDrain = false;
          } else if (this.stage === 2) {
            this.appliedP = 35;
            this.flux = 'right';
            this.pistonY = Math.min(245, this.pistonY + d * 3.5);
            this.freshLevel = Math.max(155, this.freshLevel - d * 3.5);
            this.brineDrain = false;
          } else if (this.stage === 3) {
            this.appliedP = 35;
            this.flux = 'right';
            this.brineDrain = true;
          }

          // Update salt ions (restricted strictly to salt chamber and left half of connecting tube)
          for (const p of this.ions) {
            p.x += p.vx * d;
            p.y += p.vy * d;

            // Bounce off left chamber walls
            if (p.x < X_L0 + 12) { p.x = X_L0 + 12; p.vx = Math.abs(p.vx); }
            if (p.y > Y_BOT - 12) { p.y = Y_BOT - 12; p.vy = -Math.abs(p.vy); }

            // Top boundary: piston
            if (p.x <= X_L1 && p.y < this.pistonY + 16) {
              p.y = this.pistonY + 16;
              p.vy = Math.abs(p.vy);
            }

            // Tube entrance: between X_L1 and X_MEM
            if (p.x > X_L1 && p.y < Y_MID_TOP + 12) {
              p.y = Y_MID_TOP + 12;
              p.vy = Math.abs(p.vy);
            }

            // MEMBRANE EXCLUSION: cannot cross X_MEM - W_MEM / 2
            if (p.x > X_MEM - W_MEM / 2 - 12) {
              p.x = X_MEM - W_MEM / 2 - 12;
              p.vx = -Math.abs(p.vx);
              // Small rejection pulse
              if (Math.random() < 0.2) {
                this.ripples.push({ x: X_MEM - W_MEM / 2, y: p.y, r: 2, maxR: 12, alpha: 0.8, col: COL.ca });
              }
            }
          }

          // Update water molecules
          for (const p of this.h2o) {
            // Apply drift based on flux
            if (this.flux === 'right' && p.x < X_MEM) {
              p.vx += (rnd(18, 45) - p.vx) * d * 3;
            } else if (this.flux === 'left' && p.x > X_MEM) {
              p.vx += (rnd(-40, -15) - p.vx) * d * 3;
            } else {
              p.vx += rnd(-15, 15) * d;
              p.vy += rnd(-15, 15) * d;
            }
            p.vx = clamp(p.vx, -40, 40);
            p.vy = clamp(p.vy, -35, 35);

            p.x += p.vx * d;
            p.y += p.vy * d;

            // Water crossing membrane from left to right (Reverse Osmosis)
            if (this.flux === 'right' && p.x >= X_MEM - 4 && p.x <= X_MEM + 12 && p.y >= Y_MID_TOP && p.y <= Y_BOT) {
              p.x = X_MEM + 16 + rnd(2, 10);
              p.vx = rnd(15, 35);
              p.side = 'fresh';
              this.permeateCount++;
              this.ripples.push({ x: X_MEM + W_MEM / 2, y: p.y, r: 2, maxR: 14, alpha: 0.85, col: COL.h2o });
            }

            // Water crossing membrane from right to left (Natural Osmosis)
            if (this.flux === 'left' && p.x <= X_MEM + 4 && p.x >= X_MEM - 12 && p.y >= Y_MID_TOP && p.y <= Y_BOT) {
              p.x = X_MEM - 16 - rnd(2, 10);
              p.vx = rnd(-35, -15);
              p.side = 'salt';
            }

            // Left side boundaries
            if (p.x < X_MEM) {
              if (p.x < X_L0 + 8) { p.x = X_L0 + 8; p.vx = Math.abs(p.vx); }
              if (p.y > Y_BOT - 8) { p.y = Y_BOT - 8; p.vy = -Math.abs(p.vy); }
              if (p.x <= X_L1 && p.y < this.pistonY + 8) { p.y = this.pistonY + 8; p.vy = Math.abs(p.vy); }
              if (p.x > X_L1 && p.y < Y_MID_TOP + 6) { p.y = Y_MID_TOP + 6; p.vy = Math.abs(p.vy); }
            }

            // Right side boundaries
            if (p.x >= X_MEM) {
              if (p.y > Y_BOT - 8) { p.y = Y_BOT - 8; p.vy = -Math.abs(p.vy); }
              if (p.x < X_R0 && p.y < Y_MID_TOP + 6) { p.y = Y_MID_TOP + 6; p.vy = Math.abs(p.vy); }
              if (p.x > X_R1 - 8) { p.x = X_R1 - 8; p.vx = -Math.abs(p.vx); }
              if (p.x >= X_R0 && p.y < this.freshLevel + 8) {
                // If at overflow height on fresh side, can spill over
                if (this.freshLevel <= 165 && p.x > X_R1 - 25) {
                  this.drops.push({ x: X_R1 + 10, y: 165, vy: rnd(40, 80) });
                  p.y = Y_BOT - 16;
                  p.x = rnd(X_R0 + 20, X_R1 - 20);
                } else {
                  p.y = this.freshLevel + 8;
                  p.vy = Math.abs(p.vy);
                }
              }
            }
          }

          // Outflow droplets animation
          for (const dp of this.drops) {
            dp.y += dp.vy * d;
            dp.vy += 120 * d;
          }
          this.drops = this.drops.filter(dp => dp.y < 380);

          // Ripples
          for (const rp of this.ripples) {
            rp.r += 24 * d;
            rp.alpha -= 1.4 * d;
          }
          this.ripples = this.ripples.filter(rp => rp.alpha > 0);
        }
        draw() {
          const c = this.begin();
          if (!c) return;

          const X_L0 = 130, X_L1 = 330;
          const X_R0 = 470, X_R1 = 670;
          const X_MEM = 400, W_MEM = 18;
          const Y_BOT = 430, Y_MID_TOP = 320;
          const W_COL = 200;

          // 1. Water liquid fills
          // Salt water fill (Left)
          c.fillStyle = COL.wsolid;
          c.beginPath();
          c.moveTo(X_L0, this.pistonY);
          c.lineTo(X_L1, this.pistonY);
          c.lineTo(X_L1, Y_MID_TOP);
          c.lineTo(X_MEM - W_MEM / 2, Y_MID_TOP);
          c.lineTo(X_MEM - W_MEM / 2, Y_BOT);
          c.lineTo(X_L0, Y_BOT);
          c.closePath();
          c.fill();

          // Fresh water fill (Right)
          c.fillStyle = COL.wsolid;
          c.beginPath();
          c.moveTo(X_R0, this.freshLevel);
          c.lineTo(X_R1, this.freshLevel);
          // Spout opening if level reaches 165
          if (this.freshLevel <= 165) {
            c.lineTo(X_R1 + 24, 165);
            c.lineTo(X_R1 + 24, 178);
            c.lineTo(X_R1, 178);
          }
          c.lineTo(X_R1, Y_BOT);
          c.lineTo(X_MEM + W_MEM / 2, Y_BOT);
          c.lineTo(X_MEM + W_MEM / 2, Y_MID_TOP);
          c.lineTo(X_R0, Y_MID_TOP);
          c.closePath();
          c.fill();

          // 2. Ripples
          for (const rp of this.ripples) {
            c.strokeStyle = rp.col;
            c.globalAlpha = Math.max(0, rp.alpha);
            c.lineWidth = 1.5;
            c.beginPath();
            c.arc(rp.x, rp.y, rp.r, 0, TAU);
            c.stroke();
            c.globalAlpha = 1;
          }

          // 3. Draw water molecules (small clean spheres)
          for (const p of this.h2o) {
            c.fillStyle = COL.h2o;
            c.beginPath();
            c.arc(p.x, p.y, 4, 0, TAU);
            c.fill();
            c.strokeStyle = COL.paper;
            c.lineWidth = 0.8;
            c.stroke();
          }

          // 4. Draw salt ions on left
          for (const p of this.ions) {
            ion(c, p.t, p.x, p.y);
          }

          // 5. Overflow droplets into collection beaker
          c.fillStyle = COL.h2o;
          for (const dp of this.drops) {
            c.beginPath();
            c.arc(dp.x, dp.y, 3.5, 0, TAU);
            c.fill();
          }

          // 6. Draw U-Tube Glass Vessel Outlines
          c.strokeStyle = COL.ink;
          c.lineWidth = 3;
          c.lineCap = 'round';
          c.lineJoin = 'round';

          // Outer boundary
          c.beginPath();
          c.moveTo(X_L0, 80);
          c.lineTo(X_L0, Y_BOT);
          c.lineTo(X_R1, Y_BOT);
          c.lineTo(X_R1, 165);
          c.lineTo(X_R1 + 24, 165); // Spout top
          c.lineTo(X_R1 + 24, 178); // Spout lip
          c.lineTo(X_R1, 178);
          c.lineTo(X_R1, 80);
          c.stroke();

          // Inner U notch
          c.beginPath();
          c.moveTo(X_L1, 80);
          c.lineTo(X_L1, Y_MID_TOP);
          c.lineTo(X_R0, Y_MID_TOP);
          c.lineTo(X_R0, 80);
          c.stroke();

          // Collection beaker at right
          c.beginPath();
          c.moveTo(X_R1 + 14, 250);
          c.lineTo(X_R1 + 14, 340);
          c.lineTo(X_R1 + 64, 340);
          c.lineTo(X_R1 + 64, 250);
          c.stroke();
          c.fillStyle = COL.wsolid;
          c.fillRect(X_R1 + 16, 290, 46, 48);
          fx(c, 'PURE WATER', X_R1 + 39, 360, 9.5, COL.ink, 'center', 600);

          // Brine flush valve at bottom left
          c.beginPath();
          c.moveTo(X_L0 + 40, Y_BOT);
          c.lineTo(X_L0 + 40, Y_BOT + 28);
          c.lineTo(X_L0 + 60, Y_BOT + 28);
          c.lineTo(X_L0 + 60, Y_BOT);
          c.stroke();
          if (this.brineDrain) {
            c.fillStyle = COL.ca;
            c.fillRect(X_L0 + 44, Y_BOT, 12, 40);
            fx(c, 'BRINE PURGE ACTIVE', X_L0 + 50, Y_BOT + 52, 9.5, COL.ca, 'center', 600);
          } else {
            fx(c, 'brine valve (closed)', X_L0 + 50, Y_BOT + 44, 9, COL.ink2, 'center');
          }

          // 7. Semi-Permeable Membrane (SPM)
          c.fillStyle = COL.panel;
          c.fillRect(X_MEM - W_MEM / 2, Y_MID_TOP - 4, W_MEM, Y_BOT - Y_MID_TOP + 8);
          c.strokeStyle = COL.ink;
          c.lineWidth = 2;
          c.strokeRect(X_MEM - W_MEM / 2, Y_MID_TOP - 4, W_MEM, Y_BOT - Y_MID_TOP + 8);

          // Pores texture inside membrane
          c.strokeStyle = COL.rule;
          c.lineWidth = 1.5;
          for (let y = Y_MID_TOP + 8; y < Y_BOT; y += 14) {
            c.beginPath();
            c.moveTo(X_MEM - W_MEM / 2 + 3, y);
            c.lineTo(X_MEM + W_MEM / 2 - 3, y);
            c.stroke();
          }

          // 8. Piston Mechanism on Left Arm
          c.fillStyle = COL.ink;
          c.fillRect(X_L0 + 2, this.pistonY, W_COL - 4, 18);
          // Piston rod
          c.fillRect(X_L0 + W_COL / 2 - 8, this.pistonY - 60, 16, 60);

          // Applied Pressure Arrow
          if (this.appliedP > 0) {
            const arrColor = this.appliedP > 15 ? COL.oh : COL.na;
            c.fillStyle = arrColor;
            c.strokeStyle = arrColor;
            c.lineWidth = 3;
            const ax = X_L0 + W_COL / 2, ay = this.pistonY - 72;
            c.beginPath();
            c.moveTo(ax, ay - 35);
            c.lineTo(ax, ay);
            c.stroke();
            c.beginPath();
            c.moveTo(ax - 10, ay - 12);
            c.lineTo(ax, ay);
            c.lineTo(ax + 10, ay - 12);
            c.closePath();
            c.fill();

            fx(c, 'APPLIED PRESSURE', ax, ay - 50, 11, arrColor, 'center', 700);
            fx(c, 'P = ' + this.appliedP + ' bar ' + (this.appliedP > 15 ? '(P > π)' : '(P = π)'), ax, ay - 36, 10.5, arrColor, 'center', 600);
          } else {
            fx(c, 'NO PRESSURE (P = 0 < π)', X_L0 + W_COL / 2, this.pistonY - 30, 10, COL.ink2, 'center');
          }

          // 9. Water flow direction indicator
          if (this.flux === 'right') {
            c.strokeStyle = COL.oh;
            c.lineWidth = 2.5;
            c.beginPath();
            c.moveTo(270, 468);
            c.lineTo(530, 468);
            c.stroke();
            c.fillStyle = COL.oh;
            c.beginPath();
            c.moveTo(520, 463);
            c.lineTo(534, 468);
            c.lineTo(520, 473);
            c.closePath();
            c.fill();
            fx(c, 'WATER FLOW (REVERSE OSMOSIS: CONCENTRATED → DILUTE)', 400, 488, 10.5, COL.oh, 'center', 600);
          } else if (this.flux === 'left') {
            c.strokeStyle = COL.ca;
            c.lineWidth = 2;
            c.beginPath();
            c.moveTo(530, 468);
            c.lineTo(270, 468);
            c.stroke();
            c.fillStyle = COL.ca;
            c.beginPath();
            c.moveTo(280, 463);
            c.lineTo(266, 468);
            c.lineTo(280, 473);
            c.closePath();
            c.fill();
            fx(c, 'WATER FLOW (NATURAL OSMOSIS: DILUTE → CONCENTRATED)', 400, 488, 10.5, COL.ca, 'center', 600);
          } else {
            fx(c, 'OSMOTIC EQUILIBRIUM (NET SOLVENT FLUX = 0)', 400, 488, 10.5, COL.ink2, 'center', 600);
          }

          // 10. Top Dashboards & Labels
          fx(c, 'SALT WATER FEED', X_L0 + W_COL / 2, 65, 11, COL.ink, 'center', 700);
          fx(c, 'concentrated solution', X_L0 + W_COL / 2, 79, 10, COL.ink2, 'center');

          fx(c, 'FRESH WATER', X_R0 + W_COL / 2, 65, 11, COL.ink, 'center', 700);
          fx(c, 'dilute permeate', X_R0 + W_COL / 2, 79, 10, COL.ink2, 'center');

          fx(c, 'SEMI-PERMEABLE MEMBRANE', X_MEM, Y_MID_TOP - 22, 10.5, COL.ink, 'center', 700);
          fx(c, 'pore size ~0.0001 µm', X_MEM, Y_MID_TOP - 10, 9.5, COL.ink2, 'center');

          // Permeate Purity & Salt Rejection Meters
          fx(c, 'SALT REJECTION', 690, 52, 10, COL.ink2, 'left');
          c.font = '700 18px ' + DISP;
          c.fillStyle = this.stage >= 2 ? COL.cl : COL.ink2;
          c.fillText(this.stage >= 2 ? '99.4%' : '—', 690, 74);

          fx(c, 'SOLVENT FLUX', 690, 96, 10, COL.ink2, 'left');
          c.font = '600 12px ' + MONO;
          c.fillStyle = this.flux === 'right' ? COL.oh : this.flux === 'left' ? COL.ca : COL.ink2;
          c.fillText(this.flux === 'right' ? '→ FORCED P>π' : this.flux === 'left' ? '← NATURAL' : 'EQUILIBRIUM', 690, 114);
        }
      }

      /* ============ 6 · boiler: priming and foaming ============ */
      const PR = [
        { rate: 5, steam: 44 },
        { rate: 15, steam: 140 },
        { rate: 11, steam: 44, foam: 1, imp: 1 },
        { rate: 4, steam: 38, fix: 1 }
      ];
      class Boiler extends Sim {
        constructor(sec) {
          super(sec);
          this.stages = [
            { name: 'Normal steaming', dur: 9, text: 'Boiling proceeds smoothly. Saturated steam bubbles rise and burst cleanly at the surface, entering the steam space as dry steam. Stray droplets fall back by gravity.', eq: [] },
            { name: 'Priming', dur: 12, text: 'Steam demand surges; rapid boiling turns violent. High upward steam velocity hauls liquid droplets into the delivery line, producing destructive wet steam.', eq: [] },
            { name: 'Foaming', dur: 21, text: 'Oils, grease, and dissolved alkalis lower liquid surface tension. Stable bubble froth accumulates on the surface and spills directly into the steam header.', eq: [0] },
            { name: 'Remedies & Blow-down', dur: 12, text: 'Castor oil anti-foam drops burst bubble films on contact; bottom blow-down valve discharges dense sludge and concentrated salts, returning steam to dry.', eq: [1] }
          ];
          this.eqs = [
            'Oils / Fats + 2NaOH → Soap (Sodium Stearate) + Glycerol',
            'NaAlO_{2} + 2H₂O → Al(OH)_{3}↓ + NaOH (coagulates oil)'
          ];
          this.start();
        }
        init() {
          this.yW = 262;
          this.bub = [];
          this.foam = [];
          this.imp = [];
          this.drops = [];
          this.wisp = [];
          this.pipeP = [];
          this.afd = [];
          this.pops = [];
          this.acc = 0;
          this.accI = 0;
          this.accA = 0;
          this.steam = 44;
        }
        prepare(i) {
          if (i === 3) {
            for (let k = 0; k < 46; k++) {
              this.foam.push({ x: rnd(250, 550), y: rnd(this.yW - 90, this.yW - 10), r: rnd(9, 14), life: rnd(10, 20) });
            }
            for (let k = 0; k < 26; k++) {
              this.imp.push({ x: rnd(240, 560), y: rnd(this.yW + 6, this.yW + 50), vx: 0, vy: 0, wt: 0 });
            }
          }
        }
        fu(x, y) {
          const dx = 500 - x, dy = 92 - y, dd = Math.hypot(dx, dy) || 1;
          return [dx / dd * this.steam, dy / dd * this.steam];
        }
        carry(k) {
          this.log.push({ t: this.clock, bad: true });
          this.pipeP.push({ k, x: 500, y: 92, path: [[500, 40], [830, 40]], pi: 0 });
        }
        burst(x, P) {
          if (P.foam && Math.random() < 0.93) {
            this.foam.push({ x, y: this.yW - 6, r: rnd(9, 14), life: rnd(14, 24) });
            return;
          }
          if (this.wisp.length < 90) {
            this.wisp.push({ x, y: this.yW - 6 });
            if (P.steam > 100) this.wisp.push({ x: x + rnd(-8, 8), y: this.yW - 6 });
          }
          const n = P.steam > 100 ? 2 + ((Math.random() * 3) | 0) : (Math.random() < 0.3 ? 1 : 0);
          for (let k = 0; k < n; k++) {
            this.drops.push({ x: x + rnd(-6, 6), y: this.yW - 6, vx: rnd(-40, 40), vy: -(P.steam > 100 ? rnd(120, 230) : rnd(40, 80)), r: rnd(2.5, 4) });
          }
        }
        update(d) {
          const P = PR[this.stage], y0 = this.yW;
          this.steam = P.steam;
          this.acc += P.rate * d;
          while (this.acc >= 1) {
            this.acc--;
            this.bub.push({ x: rnd(244, 556), y: 430, vy: -rnd(55, 85), r: rnd(3, 6), ph: rnd(0, 6) });
          }
          for (const b of this.bub) {
            b.y += b.vy * d;
            b.x += Math.sin(this.clock * 5 + b.ph) * 10 * d;
            if (b.y <= y0) {
              b.dead = true;
              this.burst(b.x, P);
            }
          }
          this.bub = this.bub.filter(b => !b.dead);
          for (const w of this.wisp) {
            const u = this.fu(w.x, w.y);
            w.x += (u[0] + rnd(-10, 10)) * d;
            w.y += u[1] * d;
            if (w.y <= 100 && Math.abs(w.x - 500) < 28) {
              w.dead = true;
              this.pipeP.push({ k: 's', x: 500, y: 92, path: [[500, 40], [830, 40]], pi: 0 });
            }
          }
          this.wisp = this.wisp.filter(w => !w.dead);
          for (const p of this.drops) {
            const u = this.fu(p.x, p.y);
            p.vx += 2 * (u[0] - p.vx) * d;
            p.vy += (2 * (u[1] - p.vy) + 140) * d;
            p.x = clamp(p.x + p.vx * d, 228, 572);
            p.y += p.vy * d;
            if (p.y >= y0 - 1 && p.vy > 0) { p.dead = true; continue; }
            if (p.y <= 94) {
              if (Math.abs(p.x - 500) < 30) {
                p.dead = true;
                this.carry('d');
              } else {
                p.y = 94;
                p.vy = 0;
              }
            }
          }
          this.drops = this.drops.filter(p => !p.dead);
          /* foam physics */
          const F = this.foam, kill = P.fix ? 7 : 1;
          for (const f of F) {
            f.life -= d * kill;
            if (f.life <= 0) {
              f.r *= Math.pow(0.02, d * 3);
              if (f.r < 2.5) f.dead = true;
            }
          }
          for (let it = 0; it < 2; it++) {
            for (let i = 0; i < F.length; i++) {
              for (let j = i + 1; j < F.length; j++) {
                const a = F[i], b = F[j];
                let dx = b.x - a.x, dy = b.y - a.y;
                const dd = Math.hypot(dx, dy) || 0.01, m = a.r + b.r - 1;
                if (dd < m) {
                  const k = (m - dd) / 2 / dd;
                  dx *= k; dy *= k;
                  a.x -= dx; a.y -= dy;
                  b.x += dx; b.y += dy;
                }
              }
            }
          }
          for (const f of F) {
            f.x = clamp(f.x, 230 + f.r, 570 - f.r);
            f.y = clamp(f.y, 96 + f.r, y0 - f.r + 1);
            if (!f.dead && f.y < 122 && Math.abs(f.x - 500) < 46) {
              f.dead = true;
              this.carry('f');
            }
          }
          this.foam = F.filter(f => !f.dead);

          /* impurities */
          this.accI += d * (P.imp ? 2.2 : 0);
          while (this.accI >= 1) {
            this.accI--;
            this.imp.push({ x: 226, y: 330 + rnd(-8, 8), vx: rnd(40, 90), vy: rnd(-12, 12), wt: rnd(1.5, 3) });
          }
          for (const p of this.imp) {
            if (P.fix) {
              const dx = 250 - p.x, dy = 438 - p.y, dd = Math.hypot(dx, dy) || 1;
              p.x += dx / dd * 70 * d;
              p.y += dy / dd * 70 * d;
              if (dd < 9) {
                p.dead = true;
                this.pipeP.push({ k: 'i', x: 250, y: 446, path: [[250, 545]], pi: 0 });
              }
            } else {
              p.wt -= d;
              if (p.wt <= 0) {
                p.vx = rnd(-22, 26);
                p.vy = rnd(-14, 14);
                p.wt = rnd(0.5, 1.2);
              }
              p.x = clamp(p.x + p.vx * d, 232, 568);
              p.y += p.vy * d + clamp((y0 + 34 - p.y) * 0.25, -12, 12) * d;
              p.y = clamp(p.y, y0 + 4, 436);
            }
          }
          this.imp = this.imp.filter(p => !p.dead);

          /* anti-foam agent drops popping foam on contact */
          this.accA += d;
          if (P.fix && this.accA > 1.1) {
            this.accA = 0;
            this.afd.push({ x: 330, y: 64 });
          }
          for (const a of this.afd) {
            a.y += 130 * d;
            for (const f of this.foam) {
              if (!f.dead && Math.hypot(f.x - a.x, f.y - a.y) < 32) {
                f.dead = true;
                this.pops.push({ x: f.x, y: f.y, r: f.r, alpha: 0.8 });
              }
            }
            if (a.y >= y0) a.dead = true;
          }
          this.afd = this.afd.filter(a => !a.dead);

          for (const p of this.pipeP) {
            if (follow(p, d, p.k === 's' ? 150 : 200)) p.dead = true;
          }
          this.pipeP = this.pipeP.filter(p => !p.dead);
        }
        draw() {
          const c = this.begin(), y0 = this.yW, P = PR[this.stage];
          /* pipes */
          pipe(c, [[0, 330], [226, 330]], 20);
          pipe(c, [[500, 96], [500, 40], [800, 40]], 20);
          if (P.fix) pipe(c, [[330, 30], [330, 96]], 12);
          /* boiler shell */
          c.save();
          rr(c, 220, 90, 360, 350, 10);
          c.fillStyle = COL.paper;
          c.fill();
          c.clip();
          c.fillStyle = COL.panel;
          c.globalAlpha = 0.4;
          c.fillRect(220, 90, 360, y0 - 90);
          c.globalAlpha = 1;
          c.fillStyle = COL.wsolid;
          c.fillRect(220, y0, 360, 200);
          c.strokeStyle = COL.h2o;
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(220, y0);
          c.lineTo(580, y0);
          c.stroke();
          for (const p of this.imp) {
            c.beginPath();
            c.arc(p.x, p.y, 3, 0, TAU);
            c.fillStyle = COL.imp;
            c.fill();
          }
          for (const b of this.bub) {
            c.beginPath();
            c.arc(b.x, b.y, b.r, 0, TAU);
            c.fillStyle = COL.paper;
            c.globalAlpha = 0.4;
            c.fill();
            c.globalAlpha = 0.8;
            c.strokeStyle = COL.ink2;
            c.lineWidth = 1.2;
            c.stroke();
            c.globalAlpha = 1;
          }
          for (const w of this.wisp) {
            c.beginPath();
            c.arc(w.x, w.y, 5, 0, TAU);
            c.strokeStyle = COL.ink2;
            c.globalAlpha = 0.35;
            c.lineWidth = 1.5;
            c.stroke();
            c.globalAlpha = 1;
          }
          for (const p of this.drops) {
            c.beginPath();
            c.arc(p.x, p.y, p.r, 0, TAU);
            c.fillStyle = COL.h2o;
            c.fill();
          }
          for (const f of this.foam) {
            c.beginPath();
            c.arc(f.x, f.y, f.r, 0, TAU);
            c.fillStyle = COL.paper;
            c.globalAlpha = 0.55;
            c.fill();
            c.globalAlpha = 0.85;
            c.strokeStyle = COL.ink2;
            c.lineWidth = 1.2;
            c.stroke();
            c.beginPath();
            c.arc(f.x - f.r * 0.25, f.y - f.r * 0.25, f.r * 0.5, Math.PI * 1.1, Math.PI * 1.6);
            c.strokeStyle = COL.h2o;
            c.lineWidth = 1.5;
            c.stroke();
            c.globalAlpha = 1;
          }
          // popped bubble rings
          for (const pop of this.pops) {
            c.beginPath();
            c.arc(pop.x, pop.y, pop.r * 1.2, 0, TAU);
            c.strokeStyle = COL.na;
            c.lineWidth = 1.5;
            c.globalAlpha = pop.alpha;
            c.stroke();
            c.globalAlpha = 1;
            pop.r += 24 * 0.03;
            pop.alpha -= 2.0 * 0.03;
          }
          this.pops = this.pops.filter(p => p.alpha > 0);

          c.restore();
          c.strokeStyle = COL.ink;
          c.lineWidth = 3;
          rr(c, 220, 90, 360, 350, 10);
          c.stroke();
          /* furnace burners */
          for (let k = 0; k < 6; k++) {
            const x = 324 + k * 38, h = 18 + 8 * Math.sin(this.clock * 6 + k * 1.7);
            c.beginPath();
            c.moveTo(x - 10, 468);
            c.quadraticCurveTo(x - 10, 468 - h * 0.6, x, 468 - h);
            c.quadraticCurveTo(x + 10, 468 - h * 0.6, x + 10, 468);
            c.closePath();
            c.fillStyle = COL.h;
            c.fill();
            c.beginPath();
            c.moveTo(x - 5, 468);
            c.quadraticCurveTo(x - 5, 468 - h * 0.35, x, 468 - h * 0.55);
            c.quadraticCurveTo(x + 5, 468 - h * 0.35, x + 5, 468);
            c.closePath();
            c.fillStyle = COL.glow;
            c.fill();
          }
          c.fillStyle = COL.ink;
          c.fillRect(306, 468, 230, 8);
          /* blow-down valve */
          c.strokeStyle = COL.ink;
          c.lineWidth = 3;
          c.beginPath();
          c.moveTo(250, 440);
          c.lineTo(250, 540);
          c.stroke();
          c.fillStyle = P.fix ? COL.oh : COL.ink;
          c.beginPath();
          c.moveTo(238, 452);
          c.lineTo(262, 464);
          c.lineTo(238, 464);
          c.lineTo(262, 452);
          c.closePath();
          c.fill();
          fx(c, 'BLOW-DOWN ' + (P.fix ? 'OPEN (SLUDGE PURGE)' : 'closed'), 238, 500, 10, COL.ink2, 'right');
          /* gauge glass with safe level clamping */
          const amp = P.foam ? 10 : P.steam > 100 ? 14 : P.fix ? 2.5 : 1.5;
          const yG = clamp(y0 + amp * (Math.sin(this.clock * 7.3) + 0.6 * Math.sin(this.clock * 3.1 + 1)), 182, 416);
          c.strokeStyle = COL.ink;
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(580, 190);
          c.lineTo(604, 190);
          c.moveTo(580, 410);
          c.lineTo(604, 410);
          c.stroke();
          c.fillStyle = COL.paper;
          c.fillRect(604, 180, 16, 240);
          c.fillStyle = COL.wsolid;
          c.fillRect(604, yG, 16, Math.max(0, 420 - yG));
          c.strokeStyle = COL.ink;
          c.lineWidth = 2;
          c.strokeRect(604, 180, 16, 240);
          c.strokeStyle = COL.h2o;
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(604, yG);
          c.lineTo(620, yG);
          c.stroke();
          fx(c, 'GAUGE GLASS', 598, 166, 9.5, COL.ink2, 'left');
          /* outside steam / droplet particles */
          for (const p of this.pipeP) {
            if (p.k === 'd') {
              c.beginPath();
              c.arc(p.x, p.y, 3.5, 0, TAU);
              c.fillStyle = COL.h2o;
              c.fill();
            } else if (p.k === 'f') {
              c.beginPath();
              c.arc(p.x, p.y, 7, 0, TAU);
              c.strokeStyle = COL.ink2;
              c.lineWidth = 1.3;
              c.stroke();
            } else if (p.k === 'i') {
              c.beginPath();
              c.arc(p.x, p.y, 3, 0, TAU);
              c.fillStyle = COL.imp;
              c.fill();
            } else {
              c.beginPath();
              c.arc(p.x, p.y, 5, 0, TAU);
              c.strokeStyle = COL.ink2;
              c.globalAlpha = 0.35;
              c.lineWidth = 1.5;
              c.stroke();
              c.globalAlpha = 1;
            }
          }
          for (const a of this.afd) {
            c.beginPath();
            c.arc(a.x, a.y, 4.5, 0, TAU);
            c.fillStyle = COL.na;
            c.fill();
          }
          /* labels */
          fx(c, 'BOILER FEED WATER', 12, 306, 10.5, COL.ink2, 'left');
          fx(c, 'STEAM TO TURBINE', 796, 22, 10.5, COL.ink2, 'right');
          if (P.fix) fx(c, 'CASTOR OIL ANTI-FOAM', 330, 16, 9.5, COL.ink2);
          fx(c, 'STEAM SPACE', 236, 108, 10, COL.ink2, 'left');
          fx(c, 'BOILER WATER', 236, y0 + 16, 10, COL.ink2, 'left');
          if (P.imp) fx(c, 'oil / soap / sludge in feed', 12, 356, 10, COL.imp, 'left');
          /* steam quality indicator */
          let n = 0;
          for (const e of this.log) if (this.clock - e.t < 3) n++;
          const wet = n >= 3;
          fx(c, 'STEAM QUALITY', 602, 68, 10.5, COL.ink2, 'left');
          c.font = '800 32px ' + DISP;
          c.fillStyle = wet ? COL.ca : COL.oh;
          c.textAlign = 'left';
          c.fillText(wet ? 'WET' : 'DRY', 602, 100);
          c.fillStyle = COL.rule;
          c.fillRect(602, 124, 184, 6);
          c.fillStyle = COL.ca;
          c.fillRect(602, 124, 184 * clamp(n / 10, 0, 1), 6);
          fx(c, wet ? 'droplet carry-over active' : 'clean saturated steam', 602, 144, 10, COL.ink2, 'left');
        }
      }

      /* ============ deck controller ============ */
      const CLS = { scale: Scale, zeolite: Zeolite, ionex: IonEx, ed: ED, ro: RO, boiler: Boiler };
      const slides = [...document.querySelectorAll('.slide')];
      const sims = {};
      slides.forEach((s, i) => {
        const k = s.dataset.sim;
        if (k && CLS[k]) sims[i] = new CLS[k](s);
      });
      const rail = document.getElementById('rail'),
        count = document.getElementById('count'),
        notes = document.getElementById('notes'),
        btnNotes = document.getElementById('btnNotes');

      const SHORT_NAMES = ['Intro', 'Hard water', 'Zeolite', 'Ion-Ex', 'ED', 'RO', 'Boiler', 'Compare'];
      slides.forEach((s, i) => {
        const b = document.createElement('button');
        const shortName = SHORT_NAMES[i] || s.dataset.name;
        b.innerHTML = '<span>' + String(i + 1).padStart(2, '0') + '</span>' + shortName;
        b.title = (i + 1) + '. ' + s.dataset.name;
        b.addEventListener('click', () => { b.blur(); show(i); });
        rail.appendChild(b);
      });

      const agenda = document.getElementById('agenda');
      const agendaTopics = [
        { i: 1, title: 'Hardness & Scale' },
        { i: 2, title: 'Zeolite Process' },
        { i: 3, title: 'Ion Exchange (DM)' },
        { i: 4, title: 'Electrodialysis' },
        { i: 5, title: 'Reverse Osmosis (RO)' },
        { i: 6, title: 'Boiler Troubles' },
        { i: 7, title: 'Process Comparison' }
      ];
      agendaTopics.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = '<button><b>' + String(item.i + 1).padStart(2, '0') + '</b>' + item.title + '</button>';
        li.firstChild.addEventListener('click', () => show(item.i));
        agenda.appendChild(li);
      });

      let cur = 0;
      function show(i) {
        i = clamp(i, 0, slides.length - 1);
        const old = sims[cur];
        if (old && old.playing) { old.playing = false; old.sync(); }
        slides[cur].classList.remove('on');
        cur = i;
        slides[i].classList.add('on');
        [...rail.children].forEach((b, k) => b.classList.toggle('on', k === i));
        count.textContent = (i + 1) + ' / ' + slides.length;
        const n = slides[i].querySelector('.notes');
        notes.querySelector('p').textContent = n ? n.textContent : '';
        try { history.replaceState(null, '', '#' + (i + 1)); } catch (e) { }
        const s = sims[i];
        if (s) { s.fit(); s.draw(); s.bars(); }
        window.scrollTo(0, 0);
      }

      function toggleNotes() {
        notes.hidden = !notes.hidden;
        btnNotes.setAttribute('aria-pressed', String(!notes.hidden));
      }

      const closeNotesBtn = notes.querySelector('.close-notes');
      if (closeNotesBtn) closeNotesBtn.addEventListener('click', toggleNotes);

      function fullscreen() {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => { });
      }



      function refresh() {
        readColors();
        const s = sims[cur];
        if (s) { s.fit(); s.draw(); }
      }

      document.getElementById('prev').addEventListener('click', e => { e.currentTarget.blur(); show(cur - 1); });
      document.getElementById('next').addEventListener('click', e => { e.currentTarget.blur(); show(cur + 1); });
      btnNotes.addEventListener('click', e => { e.currentTarget.blur(); toggleNotes(); });
      
      document.getElementById('btnFs').addEventListener('click', e => { e.currentTarget.blur(); fullscreen(); });

      
      window.addEventListener('resize', refresh);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

      addEventListener('keydown', e => {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        const t = e.target;
        if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || (t.tagName === 'SUMMARY' && e.key === ' '))) return;
        const k = e.key, s = sims[cur];
        if (k === 'ArrowRight' || k === 'PageDown') { e.preventDefault(); show(cur + 1); }
        else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); show(cur - 1); }
        else if (k === ' ') {
          if (s) {
            e.preventDefault();
            if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
            s.toggle();
          }
        }
        else if (k === 'r' || k === 'R') { if (s) s.reset(); }
        else if (k === ',') { if (s) s.prevStage(); }
        else if (k === '.') { if (s) s.nextStage(); }
        else if (k === 'n' || k === 'N') toggleNotes();
        else if (k === 'f' || k === 'F') fullscreen();
        
        else if (k === 'Home') show(0);
        else if (k === 'End') show(slides.length - 1);
        else if (/^[1-8]$/.test(k)) show(+k - 1);
      });


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

      let last = performance.now();
      function frame(now) {
        const dt = (now - last) / 1000;
        last = now;
        const s = sims[cur];
        if (s && s.fit()) s.tick(dt);
        requestAnimationFrame(frame);
      }

      const h = parseInt((location.hash || '').slice(1), 10);
      show(h >= 1 && h <= slides.length ? h - 1 : 0);
      requestAnimationFrame(frame);

      window.__sims = sims;
      window.__show = show;
    })();
  </script>
</body>

</html>
`;

const fullHtml = fontHeader + updatedBody;
fs.writeFileSync(srcPath, fullHtml, 'utf8');
console.log('Successfully written updated water-treatment.html. Total length:', fullHtml.length);
