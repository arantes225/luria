const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const {JSDOM, VirtualConsole} = require('jsdom');
const root = path.join(__dirname, '..');

function files(directory, extension) {
  return fs.readdirSync(directory, {withFileTypes:true}).flatMap(entry => {
    if (['.git','node_modules','browser-results','docs'].includes(entry.name)) return [];
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file, extension) : file.endsWith(extension) ? [file] : [];
  });
}

// Resolve the imported common base as well as each page's own styles. Tests
// inspect the actual cascade instead of assuming every CSS file is a link tag.
function stylesForPage(file) {
  const dom = new JSDOM(fs.readFileSync(path.resolve(root,file),'utf8'), {url:'https://luria.test/'+file, virtualConsole:new VirtualConsole()});
  const result = [];
  const visit = href => {
    const url = new URL(href, 'https://luria.test/');
    if (url.origin !== 'https://luria.test') return;
    const target = path.join(root,decodeURIComponent(url.pathname));
    result.push(url.pathname + url.search);
    if (!fs.existsSync(target)) throw Error('CSS inexistente: '+url.pathname);
    postcss.parse(fs.readFileSync(target,'utf8'), {from:target}).walkAtRules('import', rule => {
      const reference = rule.params.match(/(?:url\(\s*)?["']([^"']+)["']/)?.[1];
      if (reference) visit(new URL(reference,url).href);
    });
  };
  for (const link of dom.window.document.querySelectorAll('link[rel="stylesheet"]')) visit(new URL(link.getAttribute('href'),dom.window.document.baseURI).href);
  dom.window.close();
  return result;
}

function checkCss() {
  const errors=[];
  const sheets=files(path.join(root,'assets/css'),'.css');
  for (const file of sheets) {
    try {
      const text=fs.readFileSync(file,'utf8');
      if (/<\/?style\b|^warning:/m.test(text)) throw Error('Texto HTML/terminal dentro do CSS');
      const ast=postcss.parse(text,{from:file});
      if (ast.nodes.some(n=>n.type==='decl')) throw Error('Declaração CSS fora de uma regra');
    } catch(error) {errors.push(path.relative(root,file)+': '+error.message);}
  }
  let pages=0;
  for (const file of files(root,'.html')) {
    const dom=new JSDOM(fs.readFileSync(file,'utf8'),{virtualConsole:new VirtualConsole()});
    const d=dom.window.document;
    if (d.body.dataset.uiNav==='v2') {
      pages++;
      const links=[...d.querySelectorAll('link[rel="stylesheet"]')].map(n=>n.getAttribute('href'));
      if (links.filter(href=>/^\/assets\/css\/ui-app\.css\?v=/.test(href)).length!==1) errors.push(path.relative(root,file)+': deve carregar ui-app.css uma vez');
      if (!links[0]?.startsWith('/assets/css/ui-app.css?v=')) errors.push(path.relative(root,file)+': ui-app.css deve declarar a ordem das layers antes dos estilos de página');
      if (links.some(href=>/(?:ui-v2-foundations|ui-navigation-v2|work-navigation)\.css/.test(href))) errors.push(path.relative(root,file)+': base comum carregada também fora do entrypoint');
      for (const style of d.querySelectorAll('style')) {
        try {postcss.parse(style.textContent,{from:file});} catch(error) {errors.push(path.relative(root,file)+': '+error.message);}
      }
      try {stylesForPage(path.relative(root,file).replaceAll('\\','/'));} catch(error) {errors.push(path.relative(root,file)+': '+error.message);}
    }
    dom.window.close();
  }
  return {pages,styles:sheets.length,errors};
}

if (require.main===module) {
  const result=checkCss();
  console.log(`${result.styles} arquivos CSS e ${result.pages} páginas com base comum verificados; ${result.errors.length} erros.`);
  for (const error of result.errors) console.error(error);
  if(result.errors.length)process.exitCode=1;
}
module.exports={checkCss,stylesForPage};
