const fs = require('fs');
const path = require('path');

const deckScriptPath = path.join(__dirname, 'build_updated_deck.js');
let scriptContent = fs.readFileSync(deckScriptPath, 'utf8');

// Replace any raw latex formatting in slide text with clean Unicode:
scriptContent = scriptContent
  .replace(/CaCO_\{3\}/g, 'CaCO₃')
  .replace(/Na_\{2\}Ze/g, 'Na₂Ze')
  .replace(/Ca\^\{2\+\}/g, 'Ca²⁺')
  .replace(/Mg\^\{2\+\}/g, 'Mg²⁺')
  .replace(/Na\^\{\+\}/g, 'Na⁺')
  .replace(/H\^\{\+\}/g, 'H⁺')
  .replace(/OH\^\{−\}/g, 'OH⁻')
  .replace(/OH\^\{-\}/g, 'OH⁻')
  .replace(/H_\{2\}O/g, 'H₂O');

fs.writeFileSync(deckScriptPath, scriptContent, 'utf8');
console.log('Successfully cleaned Unicode in build_updated_deck.js. Compiling...');

require('./build_updated_deck.js');
