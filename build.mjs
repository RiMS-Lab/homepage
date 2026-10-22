import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const pages=JSON.parse(fs.readFileSync(path.join(root,'content.json'),'utf8'));
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const navItems=[
 ['Home','index.html'],
 ['People','people.html'],
 ['Research','research.html'],
 ['Projects','projects.html'],
 ['Publications','publications.html'],
 ['Vehicle Platform','vehicle-platform.html'],
 ['News','news.html'],
 ['Gallery','gallery.html'],
 ['Contact','contact.html']
];
const local=new Map([
 [pages[0].url,'index.html'],
 [pages[1].url,'people.html'],
 [pages[2].url,'people.html'],
 [pages[3].url,'gallery.html'],
 [pages[4].url,'research.html'],
 [pages[5].url,'vehicle-platform.html'],
 [pages[6].url,'news.html']
]);
function link(url){return local.get(url)||url;}
function images(s){return s.images.length?`<div class="media-grid count-${Math.min(s.images.length,3)}">${s.images.map((im,i)=>`<figure><a href="${e(im.url)}" target="_blank" rel="noopener"><img src="${e(im.local||im.url)}" alt="${e(im.alt||'RiMS Lab — research and laboratory archive')}" loading="lazy" decoding="async"></a></figure>`).join('')}</div>`:'';}
function videos(s){return s.videos.map(v=>{const id=v.url.match(/\/embed\/([\w-]+)/)?.[1];return id?`<a class="video-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener"><span class="play">▶</span><span>Watch research demonstration<small>${e(v.title||'YouTube')}</small></span><span>↗</span></a>`:'';}).join('');}
function bodyText(text){let blocks=text.split(/\n\s*\n|\n/).map(t=>t.trim()).filter(Boolean);return blocks.map(t=>`<p>${e(t)}</p>`).join('');}
function block(s,idx){if(!s.text&&!s.images.length&&!s.videos.length)return '';if(/^Copyright/.test(s.text))return '';let text=bodyText(s.text);return `<section class="content-block ${s.images.length&&s.text?'with-media':''}" id="section-${idx}">${s.text?`<div class="copy">${text}</div>`:''}${images(s)}${videos(s)}${s.links.filter(l=>l.title&&/^https?:/.test(l.url)).length?`<div class="source-links">${s.links.filter(l=>l.title&&/^https?:/.test(l.url)).map(l=>`<a href="${e(link(l.url))}">${e(l.title)} ↗</a>`).join('')}</div>`:''}</section>`;}
function nav(active){return `<a class="skip" href="#main">Skip to content</a><header class="site-header"><a class="brand" href="index.html" aria-label="RiMS Lab home"><span class="brand-mark">RiMS</span><span class="brand-description">Research in<br>Intelligent<br>Mobility<br>Systems Lab</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span>＋</span></button><nav id="navigation" aria-label="Main navigation">${navItems.map(([title,file],i)=>`<a href="${i===0?file:'#'}" ${i===active?'aria-current="page"':''} ${i===0?'':'aria-disabled="true" tabindex="-1"'}>${e(title)}</a>`).join('')}</nav></header>`;}
function home(){
 const news=pages[6].sections.map((s,index)=>({...s,index})).filter(s=>s.text&&s.text!=='Board'&&!s.text.startsWith('Copyright')).slice(0,3);
 const newsImages=['assets/news-home-1.png','assets/news-home-2.png','assets/news-home-3.png'];
 const research=[
  ['assets/ai-autonomous-mobility.jpg','Autonomous Mobility'],
  ['assets/ai-digital-twin.png','Physical AI & Digital Twins'],
  ['assets/ai-driving-experience.png','High-Performance Driving Experience']
 ];
 return `<section class="intro-clean"><div class="intro-copy"><h1>Research in Intelligent Mobility Systems Lab</h1><p class="intro-university">Artificial Intelligence Engineering, Korea Maritime &amp; Ocean University</p></div></section><section class="research-clean"><div class="clean-section-title"><h2>Research</h2><a href="#" aria-disabled="true" tabindex="-1">View all →</a></div><div class="research-clean-grid">`+research.map(([image,title])=>`<a class="research-card" href="#" aria-disabled="true" tabindex="-1"><div class="card-image"><img src="${image}" alt="${e(title)}"></div><div class="card-body"><h3>${title==='High-Performance Driving Experience'?'High-Performance<br>Driving Experience':e(title)}</h3></div></a>`).join('')+`</div></section><section class="news-clean"><div class="clean-section-title"><h2>News</h2><a href="#" aria-disabled="true" tabindex="-1">View all →</a></div><div class="clean-news-grid">`+news.map((s,index)=>`<a class="news-card" href="#" aria-disabled="true" tabindex="-1"><div class="news-card-image"><img src="${newsImages[index]}" alt="${e(s.text.split('\n')[0])}" loading="lazy" decoding="async"></div><div class="card-body"><h3>${e(s.text.split('\n')[0])}</h3></div></a>`).join('')+`</div></section>`;
}
function pageHero(title){return `<section class="page-hero"><h1>${e(title)}</h1></section>`;}
function peoplePage(){
 const professorImage=pages[1].sections[5].images[0]?.local||'assets/home-0.jpg';
 const professorBio=pages[1].sections[5].text.split(/\n\s*\n/)[0];
 const current=pages[2].sections[1].text.split(/\n/).map(s=>s.trim()).filter(Boolean);
 const students=[];
 let undergrad=false;
 for(const line of current.slice(1)){
  if(line==='------')continue;
  if(line==='Undergraduate Research Assistant'){undergrad=true;continue;}
  const cut=line.indexOf(' - ');
  students.push(cut>=0?[line.slice(0,cut),line.slice(cut+3)]:[line,undergrad?'Undergraduate Research Assistant':'Student']);
 }
 const alumniLines=pages[2].sections[2].text.split(/\n/).map(s=>s.trim()).filter(Boolean).slice(1);
 const alumni=[];
 for(let i=0;i<alumniLines.length;i+=2)alumni.push([alumniLines[i],alumniLines[i+1]||'']);
 alumni.push(['박창주 (PARK, CHANG JU)','Republic of Korea Navy · Texas A&M University']);
 return pageHero('People','Professor, students, and alumni of RiMS Lab')+`<div class="page-content people-page"><div class="people-jump"><a href="#professor">Professor</a><a href="#students">Students</a><a href="#alumni">Alumni</a></div><section class="people-group" id="professor"><p class="eyebrow">PEOPLE / 01</p><h2>Professor</h2><article class="professor-profile"><figure><img src="${e(professorImage)}" alt="Professor Donghoon Shin"></figure><div><h3>Donghoon Shin, Ph.D.</h3><p class="professor-role">Associate Professor · Artificial Intelligence Engineering</p><p>${e(professorBio)}</p><div class="professor-links"><a href="mailto:dhshin@kmou.ac.kr">dhshin@kmou.ac.kr</a><a href="publications.html">Publications →</a></div></div></article></section><section class="people-group" id="students"><p class="eyebrow">PEOPLE / 02</p><h2>Students</h2><div class="people-card-grid">${students.map(([name,role])=>`<article class="person-card"><h3>${e(name)}</h3><p>${e(role)}</p></article>`).join('')}</div></section><section class="people-group" id="alumni"><p class="eyebrow">PEOPLE / 03</p><h2>Alumni</h2><div class="alumni-list">${alumni.map(([name,place])=>`<article><h3>${e(name)}</h3><p>${e(place)}</p></article>`).join('')}</div></section></div>`;
}
function publicationsPage(){
 const scholar='https://scholar.google.co.kr/citations?user=MCPd0-IAAAAJ&hl=en';
 return pageHero('Publications','Research papers and scholarly output from RiMS Lab')+`<div class="page-content publications-page"><section class="publication-feature"><p class="eyebrow">RESEARCH OUTPUT</p><h2>Selected publications</h2><p>RiMS Lab publishes research on autonomous mobility, Physical AI, digital twins, vehicle intelligence, and human-centered driving systems.</p><a class="publication-link" href="${scholar}" target="_blank" rel="noopener">View full publication list on Google Scholar <span>↗</span></a></section></div>`;
}
function projectsPage(){
 const projects=[
  ['01','Autonomous Mobility','Integrated autonomy for intelligent vehicles and unmanned surface vessels.'],
  ['02','Physical AI & Digital Twins','Real-to-sim and sim-to-real systems for mobility development and validation.'],
  ['03','High-Performance Driving Experience','Data-driven methods for responsive, engaging, and intelligent vehicle experiences.']
 ];
 return pageHero('Projects')+`<div class="page-content projects-page"><div class="projects-grid">${projects.map(([number,title,summary])=>`<a class="project-card" href="research.html"><span>${number}</span><h2>${e(title)}</h2><p>${e(summary)}</p></a>`).join('')}</div></div>`;
}
function contactPage(){return pageHero('Contact','Get in touch with RiMS Lab')+`<div class="page-content contact-page"><section class="contact-grid"><article><p class="eyebrow">EMAIL</p><h2><a href="mailto:dhshin@kmou.ac.kr">dhshin@kmou.ac.kr</a></h2></article><article><p class="eyebrow">OFFICE</p><h2>+82 51 410 4341</h2></article><article><p class="eyebrow">ADDRESS</p><h2>727 Taejong-ro, Yeongdo-gu<br>Busan 49112, South Korea</h2><p>Korea Maritime &amp; Ocean University</p></article></section></div>`;}
function standardPage(sourceIndex,title,subtitle){const p=pages[sourceIndex];return pageHero(title,subtitle)+`<div class="page-content page-${sourceIndex}">${p.sections.map((s,n)=>n===0&&['Gallery','Research','Vehicle Platform','Board'].includes(s.text)?'':block(s,n)).join('')}</div>`;}
function document(title,active,body,homePage=false){return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="RiMS Lab at Korea Maritime & Ocean University. Research in intelligent mobility systems, autonomous vehicles, and Physical AI."><meta name="theme-color" content="#000000"><title>${e(title)} — RiMS Lab</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="refined.css"><link rel="stylesheet" href="home-scroll.css"><script defer src="app.js"></script></head><body class="${homePage?'home':'inner-page'}">${nav(active)}<main id="main">${body}</main><footer><div class="footer-brand"><a class="footer-kmou" href="https://www.kmou.ac.kr/" target="_blank" rel="noopener" aria-label="Korea Maritime & Ocean University"><img src="assets/kmou-logo.png" alt="Korea Maritime & Ocean University logo"></a><a class="brand-mark" href="index.html">RiMS</a></div><div class="footer-about"><strong>Research in Intelligent Mobility Systems Lab</strong><p>Korea Maritime &amp; Ocean University</p></div><div class="footer-location"><strong>Location</strong><p>Room #646, College of Engineering I</p><p class="location-address">727, Taejong-ro, Yeongdo-gu, Busan, Republic of Korea</p></div><div class="footer-contact"><strong>Contact</strong><p><span>T</span> 051-410-4341</p><p><span>E</span> <a href="mailto:dhshin@kmou.ac.kr">dhshin@kmou.ac.kr</a></p><p class="footer-copyright">© 2021 RiMS Lab</p></div></footer></body></html>`;}
const outputPages=[
 ['index.html','Home',0,home(),true],
 ['people.html','People',1,peoplePage(),false],
 ['research.html','Research',2,standardPage(4,'Research','Human-Centered Smart Mobility Themes'),false],
 ['projects.html','Projects',3,projectsPage(),false],
 ['publications.html','Publications',4,publicationsPage(),false],
 ['vehicle-platform.html','Vehicle Platform',5,standardPage(5,'Vehicle Platform','Platforms for intelligent mobility research'),false],
 ['news.html','News',6,standardPage(6,'News','Research updates, achievements, and activities'),false],
 ['gallery.html','Gallery',7,standardPage(3,'Gallery','Life, collaboration, and moments at RiMS'),false],
 ['contact.html','Contact',8,contactPage(),false]
];
for(const [file,title,active,body,isHome] of outputPages)fs.writeFileSync(path.join(root,file),document(title,active,body,isHome));
for(const legacy of ['d-shin.html','lab-members.html'])fs.writeFileSync(path.join(root,legacy),`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0; url=people.html"><link rel="canonical" href="people.html"><title>People — RiMS Lab</title></head><body><main><h1>People</h1><p><a href="people.html">Continue to People</a></p></main></body></html>`);
console.log(`Generated ${outputPages.length} main pages and 2 compatibility redirects.`);
