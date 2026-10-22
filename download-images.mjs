// Run on a computer with internet access: node download-images.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=path.dirname(fileURLToPath(import.meta.url));
const contentPath=path.join(root,'content.json');
const pages=JSON.parse(await fs.readFile(contentPath,'utf8'));
let count=0,failed=0;const done=new Map();
for(const page of pages)for(const section of page.sections)for(const image of section.images){
  if(image.local)continue;
  if(done.has(image.url)){image.local=done.get(image.url);continue;}
  try{
    const response=await fetch(image.url,{signal:AbortSignal.timeout(60000)});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const type=response.headers.get('content-type')||'';
    if(!type.startsWith('image/'))throw new Error('Response is not an image');
    const ext=type.includes('png')?'png':type.includes('webp')?'webp':type.includes('gif')?'gif':'jpg';
    const name=`assets/archive-${createHash('sha256').update(image.url).digest('hex').slice(0,16)}.${ext}`;
    await fs.writeFile(path.join(root,name),new Uint8Array(await response.arrayBuffer()));
    count++;image.local=name;done.set(image.url,name);console.log(`Saved ${name}`);
  }catch(error){failed++;console.warn(`Could not save image on ${page.title}: ${error.message}`);}
  await fs.writeFile(contentPath,JSON.stringify(pages,null,2));
}
await import('./build.mjs');
console.log(`${count} images downloaded, ${failed} failed. Failed images retain their original URLs.`);
if(failed)process.exitCode=1;
