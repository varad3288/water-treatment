const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('--- Verification of index.html ---');
console.log('File size:', html.length);
console.log('Has dark theme CSS?:', html.includes('data-theme="dark"') || html.includes('prefers-color-scheme: dark'));
console.log('Has btnTheme?:', html.includes('btnTheme'));
console.log('Theme paper color:', (html.match(/--paper:\s*([^;]+);/) || [])[1]);
console.log('Theme panel color:', (html.match(/--panel:\s*([^;]+);/) || [])[1]);
console.log('Theme ink color:', (html.match(/--ink:\s*([^;]+);/) || [])[1]);

// Check JS execution
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const jsCode = html.substring(scriptStart + 8, scriptEnd);
try {
  new Function(jsCode);
  console.log('JavaScript syntax: VALID');
} catch (e) {
  console.error('JavaScript error:', e.message);
}

// Check 8 slides
const slides = html.match(/<section class="slide[^"]*"[^>]*>/g) || [];
console.log('Slides count:', slides.length);
slides.forEach((s, i) => console.log('  ' + (i+1) + ': ' + s));

// Check table rows
const tableRows = (html.match(/<tr>\s*<td>([^<]+)<\/td>/g) || []).map(r => r.replace(/<[^>]+>/g, '').trim());
console.log('\nComparison table rows:');
tableRows.forEach(r => console.log('  • ' + r));
