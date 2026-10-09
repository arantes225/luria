// Optional offline compatibility check: pass a local PDF.js 3.11.174 bundle path.
const assert=require('node:assert/strict'),path=require('node:path');
if(!process.argv[2])throw Error('Usage: node scripts/check-pdf-compat.cjs <pdf.js path> (matching pdf.worker.js beside it)');
const pdfjs=require(path.resolve(process.argv[2]));
let source='%PDF-1.4\n';const offsets=[0];
const text='BT /F1 12 Tf 72 720 Td (LURIA PDF TEST) Tj ET';
const objects=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',`<< /Length ${text.length} >>\nstream\n${text}\nendstream`];
objects.forEach((body,i)=>{offsets.push(Buffer.byteLength(source));source+=`${i+1} 0 obj\n${body}\nendobj\n`});
const xref=Buffer.byteLength(source);source+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`+offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')+`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
(async()=>{
 assert.equal(pdfjs.version,'3.11.174');
 const doc=await pdfjs.getDocument({data:new Uint8Array(Buffer.from(source)),isEvalSupported:false,disableFontFace:true,useSystemFonts:true}).promise;
 assert.equal(doc.numPages,1);const page=await doc.getPage(1);const content=await page.getTextContent();
 assert.equal(content.items.map(x=>x.str).join(''),'LURIA PDF TEST');await page.getOperatorList();await doc.destroy();
 console.log('PASS PDF.js '+pdfjs.version+': text extraction and rendering operators with evaluation disabled');
})().catch(e=>{console.error(e.message);process.exitCode=1});
