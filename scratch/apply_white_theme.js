const fs = require('fs');
const path = require('path');

const deckScriptPath = path.join(__dirname, 'build_updated_deck.js');
let content = fs.readFileSync(deckScriptPath, 'utf8');

// 1. Update :root to crisp pure white theme
const oldRootStart = content.indexOf(':root {');
const oldRootEnd = content.indexOf('* {\n      box-sizing: border-box;');

if (oldRootStart === -1 || oldRootEnd === -1) {
  console.error('Could not locate root block');
  process.exit(1);
}

const newRoot = `:root {
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

    `;

content = content.substring(0, oldRootStart) + newRoot + content.substring(oldRootEnd);

// 2. Remove Theme button from header
const oldThemeBtn = '<button id="btnTheme" title="Light / dark (T)">Theme</button>';
if (content.includes(oldThemeBtn)) {
  content = content.replace(oldThemeBtn, '');
}

// 3. Remove T: theme from footer hint
content = content.replace('T: theme · ', '');
content = content.replace('T: Theme · ', '');

// 4. Remove theme function and its event listeners in JS
const oldThemeFunc = `      function theme() {
        const el = document.documentElement;
        const dark = matchMedia('(prefers-color-scheme: dark)').matches;
        const now = el.dataset.theme || (dark ? 'dark' : 'light');
        el.dataset.theme = now === 'dark' ? 'light' : 'dark';
        refresh();
      }`;

if (content.includes(oldThemeFunc)) {
  content = content.replace(oldThemeFunc, '');
}

content = content.replace("document.getElementById('btnTheme').addEventListener('click', e => { e.currentTarget.blur(); theme(); });", '');
content = content.replace("matchMedia('(prefers-color-scheme: dark)').addEventListener('change', refresh);", '');
content = content.replace("else if (k === 't' || k === 'T') theme();", '');

// 5. Ensure body background is explicitly white and crisp
content = content.replace('body {\n      display: flex;', 'body {\n      background: var(--paper);\n      color: var(--ink);\n      display: flex;');

// 6. Save build_updated_deck.js
fs.writeFileSync(deckScriptPath, content, 'utf8');
console.log('Successfully updated build_updated_deck.js to white only.');

// 7. Compile updated HTML
require('./build_updated_deck.js');

// 8. Also copy to index.html for instant static hosting (GitHub Pages, Vercel, Netlify)
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'water-treatment.html'), 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'index.html'), htmlContent, 'utf8');
console.log('Successfully written index.html for web hosting.');
