'use strict';
// Postproceso visual idempotente de las páginas existentes; no modifica lecturas.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),spec=fs.readFileSync(path.join(root,'BRAND_MBL_2026-11-22.md'),'utf8');
const css=spec.match(/```css\s*([\s\S]*?)```/)[1];
fs.writeFileSync(path.join(root,'brand/match-theme.css'),css);
function visit(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(e.name.startsWith('.')||['scripts','brand'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory()){visit(p);continue;}if(!['index.html','mujeres.html','revision-2026-10-06/index.html','revision-2026-10-06/mujeres.html'].includes(path.relative(root,p).replaceAll('\\','/')))continue;let html=fs.readFileSync(p,'utf8');if(!/<\/head>/i.test(html))continue;
html=html.replace(/<link rel="stylesheet" href="\/ty-landing\/brand\/match-theme\.css[^\"]*">\s*/g,'');
html=html.replace(/<\/head>/i,'<link rel="stylesheet" href="/ty-landing/brand/match-theme.css?v=20261122-gold">\n</head>');
html=html.replace(/(<img\b[^>]*\bsrc=")[^"]*(?:ty[-_]logo|TY_logo)[^"]*(")/gi,'$1/ty-landing/brand/match-beyond-love.png?v=20261122-gold$2');
html=html.replace(/(<link\b[^>]*rel="(?:icon|apple-touch-icon)"[^>]*href=")[^"]*(")/gi,'$1/ty-landing/brand/match-symbol.png?v=20261122-gold$2');
html=html.replace(/(<meta\b[^>]*(?:property|name)="(?:og:image|twitter:image)"[^>]*content=")[^"]*(")/gi,'$1https://clubdesarrollohumano.github.io/ty-landing/brand/match-beyond-love.png?v=20261122-gold$2');
html=html.replace(/content="#0b0a0e"/g,'content="#0d0316"');
html=html.replace(/<div class="brand">T(?:<span[^>]*>)?&amp;(?:<\/span>)?Y<\/div>/g,'<div class="brand"><img src="/ty-landing/brand/match-beyond-love.png?v=20261122-gold" alt="Match Beyond Love" width="1100" height="614" loading="lazy"></div>');
const report=/(?:plum|vedic)-hero/.test(html)&&path.relative(root,p).includes('/');
if(report&&!/class="mbl-report"/.test(html))html=html.replace(/<body([^>]*)>/,(_,attrs)=>attrs.includes('class=')?'<body'+attrs.replace(/class="([^"]*)"/,'class="$1 mbl-report"')+'>':'<body class="mbl-report"'+attrs+'>');
fs.writeFileSync(p,html.replace(/\r\n/g,'\n'));
}}
visit(root);console.log('Marca regenerada desde BRAND_MBL_2026-11-22.md');
