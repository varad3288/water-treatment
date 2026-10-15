const fs = require('fs');
const html = fs.readFileSync('water-treatment.html', 'utf8');

console.log('Total characters:', html.length);
console.log('Contains RO slide (data-sim="ro"):', html.includes('data-sim="ro"'));
console.log('Contains Compare slide:', html.includes('data-name="Compare"'));
console.log('Has Viva slide:', html.includes('data-name="Viva"'));

const tableMatches = [...html.matchAll(/<tr>\s*<td>([^<]+)<\/td>/g)].map(m => m[1]);
console.log('Compare table rows:', tableMatches);

const navTabs = [...html.matchAll(/<button class="nav-tab[^"]*"[^>]*>([^<]+)<\/button>/g)].map(m => m[1]);
console.log('Nav tabs count:', navTabs.length);

const shortNamesMatch = html.match(/const SHORT_NAMES = \[[^\]]+\];/);
if (shortNamesMatch) console.log(shortNamesMatch[0]);

const clsMatch = html.match(/const CLS = \{[^}]+\};/);
if (clsMatch) console.log(clsMatch[0]);
