import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const pages=JSON.parse(fs.readFileSync(path.join(root,'content.json'),'utf8'));
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const navItems=[
 ['Home','index.html'],
 ['Members','professor.html'],
 ['Research','research.html'],
 ['Publications','publications.html'],
 ['Vehicle Platform','vehicle-platform.html'],
 ['Board','board.html'],
 ['Contact','contact.html']
];
const boardItems=[
 {slug:'board-molit-ai-seminar.html',title:'국토교통부(MOLIT) 2025 AI 자율주행 인증 관련 국회세미나 9월 개최!',date:'2025.09',thumb:'assets/board-thumb-molit.jpg',images:['assets/board-unece-article-1.png','assets/board-unece-article-2.png']},
 {slug:'board-zero-2023.html',title:"ZERO 팀 2023 국토부 무인모빌리티 경진대회 종합 3위 '은상' 수상",date:'2023.10.14',thumb:'assets/board-thumb-zero-2023.jpg',images:['assets/board-competition-2023-team.png','assets/board-competition-2023-award.png']},
 {slug:'board-frozen-2021-2022.html',title:"FROZEN 팀 2021,2022 자율주행 경진대회에서 2년연속 '우수상' 3개 수상",date:'2021–2022',thumb:'assets/board-thumb-frozen.jpg',images:['assets/board-competition-2022-team.png','assets/board-competition-2021-team.png']}
];const local=new Map([
 [pages[0].url,'index.html'],
 [pages[1].url,'professor.html'],
 [pages[2].url,'alumni.html'],
 [pages[3].url,'board.html'],
 [pages[4].url,'research.html'],
 [pages[5].url,'vehicle-platform.html'],
 [pages[6].url,'board.html']
]);
function link(url){return local.get(url)||url;}
function images(s){return s.images.length?`<div class="media-grid count-${Math.min(s.images.length,3)}">${s.images.map((im,i)=>`<figure><a href="${e(im.url)}" target="_blank" rel="noopener"><img src="${e(im.local||im.url)}" alt="${e(im.alt||'RiMS Lab — research and laboratory archive')}" loading="lazy" decoding="async"></a></figure>`).join('')}</div>`:'';}
function videos(s){return s.videos.map(v=>{const id=v.url.match(/\/embed\/([\w-]+)/)?.[1];return id?`<a class="video-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener"><span class="play">▶</span><span>Watch research demonstration<small>${e(v.title||'YouTube')}</small></span><span>↗</span></a>`:'';}).join('');}
function bodyText(text){let blocks=text.split(/\n\s*\n|\n/).map(t=>t.trim()).filter(Boolean);return blocks.map(t=>`<p>${e(t)}</p>`).join('');}
function block(s,idx){if(!s.text&&!s.images.length&&!s.videos.length)return '';if(/^Copyright/.test(s.text))return '';let text=bodyText(s.text);return `<section class="content-block ${s.images.length&&s.text?'with-media':''}" id="section-${idx}">${s.text?`<div class="copy">${text}</div>`:''}${images(s)}${videos(s)}${s.links.filter(l=>l.title&&/^https?:/.test(l.url)).length?`<div class="source-links">${s.links.filter(l=>l.title&&/^https?:/.test(l.url)).map(l=>`<a href="${e(link(l.url))}">${e(l.title)} ↗</a>`).join('')}</div>`:''}</section>`;}
function nav(active){
 const membersMenu=`<div class="nav-group nav-group-members${active===1?' current':''}"><button class="nav-parent" type="button" aria-expanded="false">Members</button><div class="nav-submenu"><a href="professor.html">Professor</a><a href="students.html">Students</a><a href="alumni.html">Alumni</a></div></div>`;
 const researchMenu=`<div class="nav-group${active===2?' current':''}"><button class="nav-parent" type="button" aria-expanded="false">Research</button><div class="nav-submenu"><a href="#" aria-disabled="true">Autonomous Mobility</a><a href="#" aria-disabled="true">Physical AI &amp; Digital Twins</a><a href="#" aria-disabled="true">High-Performance Driving Experience</a><a href="projects.html">Projects</a></div></div>`;
 return `<a class="skip" href="#main">Skip to content</a><header class="site-header"><a class="brand" href="index.html" aria-label="RiMS Lab home"><span class="brand-mark">RiMS</span><span class="brand-description">Research in<br>Intelligent<br>Mobility<br>Systems Lab</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span>＋</span></button><nav id="navigation" aria-label="Main navigation">${navItems.map(([title,file],i)=>i===1?membersMenu:i===2?researchMenu:`<a href="${i===0||i===3||i===4||i===5?file:'#'}" ${i===active?'aria-current="page"':''} ${i===0||i===3||i===4||i===5?'':'aria-disabled="true" tabindex="-1"'}>${e(title)}</a>`).join('')}</nav></header>`;
}
function home(){
 const research=[
  ['assets/ai-autonomous-mobility.jpg','Autonomous Mobility'],
  ['assets/home-ai-digital-twin.jpg','Physical AI & Digital Twins'],
  ['assets/home-ai-driving-experience.jpg','High-Performance Driving Experience']
 ];
 return '<section class="intro-clean"><div class="intro-copy"><h1>Research in Intelligent Mobility Systems Lab</h1><p class="intro-university">Artificial Intelligence Engineering, Korea Maritime &amp; Ocean University</p></div></section><section class="research-clean"><div class="clean-section-title"><h2>Research</h2><a href="#" aria-disabled="true" tabindex="-1">View all →</a></div><div class="research-clean-grid">'+research.map(([image,title])=>'<a class="research-card" href="#" aria-disabled="true" tabindex="-1"><div class="card-image"><img src="'+image+'" alt="'+e(title)+'"></div><div class="card-body"><h3>'+(title==='High-Performance Driving Experience'?'High-Performance<br>Driving Experience':e(title))+'</h3></div></a>').join('')+'</div></section><section class="news-clean"><div class="clean-section-title"><h2>Board</h2><a href="board.html">View all →</a></div><div class="clean-news-grid">'+boardItems.slice(0,3).map(item=>'<a class="news-card" href="'+e(item.slug)+'"><div class="news-card-image"><img src="'+e(item.thumb)+'" alt="'+e(item.title)+'" loading="lazy" decoding="async"></div><div class="card-body"><time datetime="'+e(item.date)+'">'+e(item.date)+'</time><h3>'+e(item.title)+'</h3></div></a>').join('')+'</div></section>';
}function pageHero(title){return `<section class="page-hero"><h1>${e(title)}</h1></section>`;}
function memberData(){
 const professorImage=pages[1].sections[5].images[0]?.local||'assets/home-0.jpg';
 const professorBio=pages[1].sections[5].text.split(/\n\s*\n/)[0];
 const phdStudents=[['윤택한','Taekhan Yoon','']];
 const msStudents=[
  ['정건희','Geonhui Jung',''],
  ['정인성','Insung Jung',''],
  ['최우석','Wooseok Choi','']
 ];
 const undergraduateStudents=[['김인하','Inha Kim','']];
 const alumniLines=pages[2].sections[2].text.split(/\n/).map(s=>s.trim()).filter(Boolean).slice(1);
 const sookmyungAlumni=[];
 for(let i=0;i<alumniLines.length;i+=2){
  const rawName=alumniLines[i];
  const match=rawName.match(/^(.+?)\s*\((.+?)\)\s*$/);
  sookmyungAlumni.push(match?[match[1].trim(),match[2].trim(),alumniLines[i+1]||'']:['',rawName,alumniLines[i+1]||'']);
 }
 const navalAlumni=[['박창주','PARK, CHANG JU','Republic of Korea Navy · Texas A&M University']];
 const memberName=(ko,en)=>`<h3 class="member-name">${ko?`<span class="member-name-ko">${e(ko)}</span>`:''}<span class="member-name-en">${e(en)}</span></h3>`;
 const rows=members=>`<div class="people-row-list">${members.map(([ko,en,role])=>`<article class="person-row${role?'':' no-role'}">${memberName(ko,en)}${role?`<p>${e(role)}</p>`:''}</article>`).join('')}</div>`;
 return {professorImage,professorBio,phdStudents,msStudents,undergraduateStudents,sookmyungAlumni,navalAlumni,memberName,rows};
}
function professorPage(){
 const d=memberData();
 const experience=[
  'Director of RiMS Lab., Future Mobility Technology Center, Seoul National University',
  "Assistant Professor, Mechanical Systems Engineering, Sookmyung Women's University",
  'Development Engineer, Advanced Driver Assistance Systems, Mercedes-Benz Research & Development',
  'Assistant Professor, Mechanical Engineering, Korea Naval Academy (Navy Officer)'
 ];
 const education=[
  'Ph.D. in Mechanical Engineering, Seoul National University',
  'B.S. in Mechanical Engineering, University of Minnesota Twin Cities'
 ];
 const detailList=items=>`<ul>${items.map(item=>`<li>${e(item)}</li>`).join('')}</ul>`;
 return pageHero('Professor')+`<div class="page-content people-page"><section class="people-group" id="professor"><article class="professor-profile"><figure><img src="${e(d.professorImage)}" alt="Professor Donghoon Shin"></figure><div>${d.memberName('신동훈','Donghoon Shin, Ph.D.')}<p class="professor-role">Associate Professor · Artificial Intelligence Engineering</p><p>${e(d.professorBio)}</p></div></article><div class="professor-details"><article><h2>Professional Experience</h2>${detailList(experience)}</article><article><h2>Education</h2>${detailList(education)}</article></div></section></div>`;
}
function studentsPage(){
 const d=memberData();
 return pageHero('Students')+`<div class="page-content people-page"><section class="people-group" id="students"><div class="people-subgroup"><h2>Ph.D. Student</h2>${d.rows(d.phdStudents)}</div><div class="people-subgroup"><h2>M.S. Student</h2>${d.rows(d.msStudents)}</div><div class="people-subgroup"><h2>Undergraduate Student</h2>${d.rows(d.undergraduateStudents)}</div></section></div>`;
}
function alumniPage(){
 const d=memberData();
 return pageHero('Alumni')+`<div class="page-content people-page"><section class="people-group" id="alumni"><div class="people-subgroup"><h2>Alumni at Sookmyung</h2>${d.rows(d.sookmyungAlumni)}</div><div class="people-subgroup"><h2>Alumni at Naval Academy</h2>${d.rows(d.navalAlumni)}</div></section></div>`;
}
function publicationsPage(){
 const scholar='https://scholar.google.co.kr/citations?hl=en&user=MCPd0-IAAAAJ&view_op=list_works&sortby=pubdate';
 const international=[
  ['2025','Active rack control of steer-by-wire systems for vehicle lateral stability','J Lee, K Kim, D Shin','Vehicle System Dynamics 63 (9), 1770–1789','lAfYOIClFDQC'],
  ['2025','Design of Data Driven Automated Driving Control Algorithm for Enhanced Human Acceptance','D Shin, YH Han, K Park','IEEE Transactions on Consumer Electronics','7gse_HdimRUC'],
  ['2025','Clustering and investigation of human driving behavior using autoencoder and risk assessment','D Shin, J Myoung, W Jeon, KM Park','IEEE Access 13, 12832–12845','yymuTJNBJz4C'],
  ['2024','Piecewise affine relaxation of discrete value functions in learning model predictive control with application to autonomous racing','E Joa, C Kim, D Shin, S Woo','IEEE Control Systems Letters 8, 2187–2192','Oi-j_DTgP3cC'],
  ['2024','Development of autonomous surface vehicles for floating garbage-collection support','J Lee, T Yoon, DS Lee, D Shin','JMST Advances 6 (3), 341–348','KR6TXPE-FHQC'],
  ['2024','Enhanced vehicle dynamics and safety through tire–road friction estimation for predictive ELSD control under various conditions of general racing tracks','S Woo, S Jeon, E Joa, D Shin','Applied Sciences 14 (5), 1903','p9YawgimX9oC'],
  ['2023','Design of AI-powered hybrid control algorithm of robot vehicle for enhanced driving performance','HG Kim, J Myoung, S Lee, KM Park, D Shin','IEEE Embedded Systems Letters 16 (2), 94–97','VglVhKISWcQC'],
  ['2023','Chassis design target setting for a high-performance car using a virtual prototype','S Woo, Y Ha, J Yoo, E Joa, D Shin','Applied Sciences 13 (2), 844','lR2ECBI0YV4C'],
  ['2022','Moving objects tracking based on geometric model-free approach with particle filter using automotive LiDAR','H Lee, H Lee, D Shin, K Yi','IEEE Transactions on Intelligent Transportation Systems 23 (10), 17863–17872','0aNKY9CYzMkC'],
  ['2021','Rollover index for rollover mitigation function of intelligent commercial vehicle’s electronic stability control','D Shin, S Woo, M Park','Electronics 10 (21), 2605','hEp1lTclR2YC'],
  ['2021','A double sky-hook algorithm for improving road-holding property in semi-active suspension systems for application to in-wheel motor','S Woo, D Shin','Applied Sciences 11 (19), 8912','Es-9c2L5hKwC'],
  ['2021','Modified Neural Architecture Search (NAS) Using the Chromosome Non-Disjunction','KM Park, D Shin, SD Chi','Applied Sciences 11 (18), 8628','MDBbo4b0KHEC'],
  ['2020','Development of fail-safe algorithm for exteroceptive sensors of autonomous vehicles','D Shin, K Park, M Park','Electronics 9 (11), 1774','QNfnWKgKwv8C'],
  ['2020','High definition map-based localization using ADAS environment sensors for application to automated driving vehicles','D Shin, K Park, M Park','Applied Sciences 10 (14), 4924','fGgrif5g-LMC'],
  ['2020','Evolutionary neural architecture search (NAS) using chromosome non-disjunction for Korean grammaticality tasks','K Park, D Shin, Y Yoo','Applied Sciences 10 (10), 3457','H2XcuePHLsAC'],
  ['2020','An interacting multiple model approach for target intent estimation at urban intersection for application to automated driving vehicle','D Shin, S Yi, K Park, M Park','Applied Sciences 10 (6), 2138','w2Aknop99M4C'],
  ['2019','Development of deep learning based human-centered threat assessment for application to automated driving vehicle','D Shin, H Kim, K Park, K Yi','Applied Sciences 10 (1), 253','SQZOXlr1FBsC'],
  ['2019','Design of warship simulation using variable-chromosome genetic algorithm','K Park, S Shin, D Shin, S Chi','Applied Sciences 9 (19), 4131','LYSM3I27WpsC'],
  ['2019','Variable chromosome genetic algorithm for structure learning in neural networks to imitate human brain','K Park, D Shin, S Chi','Applied Sciences 9 (15), 3176','eCFM_hdDfssC'],
  ['2018','Effects of vehicular communication on risk assessment in automated driving vehicles','D Shin, K Park, M Park','Applied Sciences 8 (12), 2632','TniZHWc1JwoC'],
  ['2018','Human-centered risk assessment of an automated vehicle using vehicular wireless communication','D Shin, B Kim, K Yi, A Carvalho, F Borrelli','IEEE Transactions on Intelligent Transportation Systems 20 (2), 667–681','oYc2ogjtvagC'],
  ['2018','Human factor considered risk assessment of automated vehicle using vehicle to vehicle wireless communication','D Shin, K Yi','International Journal of Automotive Engineering 9 (2), 56–63','c2LjitseEfMC'],
  ['2016','Motorized vehicle active suspension damper control with dynamic friction and actuator delay compensation for a better ride quality','D Shin, G Lee, K Yi, K Noh','Proceedings of the Institution of Mechanical Engineers, Part D: Journal of Automobile Engineering','LkGwnXOMwfcC'],
  ['2014','Control of the motorized active suspension damper for good ride quality','J Seo, D Shin, K Yi, S Yim, K Noh, H Choi','Proceedings of the Institution of Mechanical Engineers, Part D: Journal of Automobile Engineering','6HoeAlFIZOwC']
 ];
 const domesticConference=[
  ['2022','Design of Artificial Neural Network for Human-Centered Risk Assessment of Highly Automated Driving Vehicle','S Lee, J Myoung, K Kim, E Lee, K Park, Y Nam, Y Han, D Shin','KSAE Spring Conference, 1061–1061','q1ZQJjUA47MC'],
  ['2022','Development of a Deep Learning Based 4D-Radar and Low-Cost Vision Sensor Fusion Algorithm for Vehicle Detection','K Kim, K Park, YJ Kim, D Shin','KSAE Spring Conference, 535–535','aFwNBOTKqaYC'],
  ['2022','Human driving behavior categorization using spectral clustering for highly automated driving in urban traffic situation','J Myoung, S Lee, K Kim, E Lee, K Park, Y Nam, Y Han, D Shin','KSAE Spring Conference, 526–526','PbVfkCSoiPoC'],
  ['2020','Human-Centered Risk Assessment for Automated Driving Using Deep Learning Through Neural Architecture Search','박윤하, 박강문, 이경수, 신동훈','ICROS Annual Conference, 121–122','dhZ1Wuf5EGsC'],
  ['2018','Coordinated Safety System of Automated Driving Vehicle Using Cloud and Local Computing','D Shin, K Yi','KSAE Fall Conference and Exhibition, 718–718','6TexfgwXQfYC']
 ];
 const internationalConference=[
  ['2017','Human-Centered Risk Assessment for Improved Vehicle Safety using Front Vehicle Dynamic States through Vehicular Communication','D Shin, K Yi','FAST Zero 2017, Society of Automotive Engineers of Japan','5Klqo5HVOaoC'],
  ['2015','Effects of wireless communication on integrated risk management based automated vehicle','D Shin, B Kim, J Seo, K Yi','2015 IEEE 18th International Conference on Intelligent Transportation Systems','dhFuZR0502QC'],
  ['2015','Compensation of wireless communication delay for integrated risk management of automated vehicle','D Shin, K Yi','2015 IEEE Intelligent Vehicles Symposium, 1355–1360','eQOLeE2rZwMC'],
  ['2015','Probabilistic threat assessment of vehicle states using wireless communications for application to integrated risk management system','D Shin, B Kim, K Yi',"FAST-zero '15: 3rd International Symposium on Future Active Safety Technology",'6jAoOr-ogVAC'],
  ['2014','Mode control of motorized active suspension damper for ride quality and energy efficiency','D Shin, J Seo, G Lee, K Yi','17th International IEEE Conference on Intelligent Transportation Systems','9yKSN-GCB0IC']
 ];
 const other=[
  ['2024','Clustering and Investigation of Human Driving Behavior with Shoe Type in Urban Roads using Autoencoder','D Shin, J Myoung, W Jeon, K Park','Preprint','-Viv1fr_sjoC'],
  ['2020','PAR applied','D Shin, H Kim, K Park, K Yi','Innovative Advanced Materials for Energy Storage and Beyond: Synthesis …','Rj7SuZOA3CsC'],
  ['2016','Active damping system having electrically controlled actuator','KS Yi, DH Shin','US Patent Application 14/595,496','EsrhoZGmrkoC']
 ];
 const publicationRows=items=>{
  const years=[...new Set(items.map(item=>item[0]))];
  return `<div class="publication-years">${years.map(year=>`<section class="publication-year-group"><h3 class="publication-year">${year}</h3><div class="publication-list">${items.filter(item=>item[0]===year).map(([,title,authors,venue,id])=>`<article class="publication-row"><div><h4><a href="https://scholar.google.co.kr/citations?view_op=view_citation&amp;hl=en&amp;user=MCPd0-IAAAAJ&amp;citation_for_view=MCPd0-IAAAAJ:${e(id)}" target="_blank" rel="noopener">${e(title)}</a></h4><p>${e(authors)}</p><p class="publication-venue">${e(venue)}</p></div></article>`).join('')}</div></section>`).join('')}</div>`;
 };
 return `<section class="page-hero publications-hero"><div class="publications-hero-title"><h1>Publications</h1></div><a class="publication-source" href="${e(scholar)}" target="_blank" rel="noopener">Google Scholar</a></section>`+`<div class="page-content publications-page"><section class="publication-section"><div class="publication-section-title"><h2>International Journal</h2></div>${publicationRows(international)}</section><section class="publication-section"><div class="publication-section-title"><h2>Domestic Conference</h2></div>${publicationRows(domesticConference)}</section><section class="publication-section"><div class="publication-section-title"><h2>International Conference</h2></div>${publicationRows(internationalConference)}</section><section class="publication-section"><div class="publication-section-title"><h2>Patent &amp; Other</h2></div>${publicationRows(other)}</section></div>`;
}
function projectsPage(){
 const projects=[
  ['고성능 주행 감성 해석 및 버추얼 모델 기반 운전자 퍼포먼스 피드백 Application 시스템 개발','2026.04 ~ 2026.11','assets/hyundai-logo.png','Hyundai',''],
  ['레이더 상황실 AI 기술 적용방안 연구','2026.05 ~ 2026.11','assets/naval-force-analysis-logo.gif','Naval Force Analysis Test Evaluation Group','emblem'],
  ['운전 성향별 맞춤형 차량 부품 마모 및 고장 예측 실시간 디지털 샤시 트윈 기술 개발','2024.09 ~ 2025.09','assets/hyundai-logo.png','Hyundai',''],
  ['차량-트레일러 간섭방지위한 한계각도 실시간 추정 로직 개발','2024.06 ~ 2025.02','assets/hyundai-logo.png','Hyundai',''],
  ['탑승자 이질감 저해요인을 고려한 인간운전자 드라이빙 패턴 모사 자율주행 AI-Agent 개발','2022.12 ~ 2023.08','assets/hyundai-logo.png','Hyundai',''],
  ['MDPS 토크 피드백 제어기의 외란 강건 성능 및 조향 성능 개선을 위한 제어 로직 고도화 연구','2022.07 ~ 2023.05','assets/hyundai-logo.png','Hyundai','']
 ];
 return pageHero('Projects')+`<div class="page-content projects-page"><section class="logo-projects-grid" aria-label="Research projects">${projects.map(([title,period,image,alt,variant])=>`<article class="logo-project-card"><div class="project-logo-wrap"><img class="${variant==='emblem'?'project-logo-emblem':''}" src="${e(image)}" alt="${e(alt)}"></div><div class="project-copy"><h2>${e(title)}</h2><p>Period ${e(period)}</p></div></article>`).join('')}</section></div>`;
}
function boardPage(){
 return pageHero('Board')+'<div class="page-content board-page"><section class="board-index-grid" aria-label="Board posts">'+boardItems.map(item=>'<a class="board-index-card" href="'+e(item.slug)+'"><figure><img src="'+e(item.thumb)+'" alt="'+e(item.title)+'" loading="lazy" decoding="async"></figure><div class="board-index-copy"><time datetime="'+e(item.date)+'">'+e(item.date)+'</time><h2>'+e(item.title)+'</h2><span>View post</span></div></a>').join('')+'</section></div>';
}
function boardDetailPage(item){
 return pageHero('Board')+'<div class="page-content board-detail-page"><a class="board-back" href="board.html">← Board</a><article class="board-detail"><header><time datetime="'+e(item.date)+'">'+e(item.date)+'</time><h2>'+e(item.title)+'</h2></header><div class="board-detail-images">'+item.images.map((image,index)=>'<figure><img src="'+e(image)+'" alt="'+e(item.title)+' — image '+(index+1)+'" loading="lazy" decoding="async"></figure>').join('')+'</div></article></div>';
}function vehiclePlatformPage(){
 const platforms=[
  ['Vehicle Test Platform - 2018 Niro Hybrid','assets/platform-vehicle-control.png','Test vehicle control architecture with RTK GPS, ROS, AutoBox, and Polysync'],
  ['Vehicle Test Platform - ERP42','assets/platform-sensor-config.png','ERP42 autonomous vehicle sensor configuration'],
  ['LiDAR-Based Autonomous Surface Vehicle','assets/platform-asv-lidar.png','LiDAR-based autonomous surface vehicle hardware configuration'],
  ['Vision-Based Autonomous Surface Vehicle','assets/platform-asv-vision.png','Vision-based autonomous surface vehicle hardware configuration']
 ];
 return pageHero('Vehicle Platform')+'<div class="page-content vehicle-platforms-page"><section class="vehicle-platform-grid">'+platforms.map(([title,image,alt])=>'<article class="vehicle-platform-card"><figure><img src="'+e(image)+'" alt="'+e(alt)+'" loading="lazy" decoding="async"></figure><div class="vehicle-platform-card-title"><h2>'+e(title)+'</h2></div></article>').join('')+'</section></div>';
}function contactPage(){return pageHero('Contact','Get in touch with RiMS Lab')+`<div class="page-content contact-page"><section class="contact-grid"><article><p class="eyebrow">EMAIL</p><h2><a href="mailto:dhshin@kmou.ac.kr">dhshin@kmou.ac.kr</a></h2></article><article><p class="eyebrow">OFFICE</p><h2>+82 51 410 4341</h2></article><article><p class="eyebrow">ADDRESS</p><h2>727 Taejong-ro, Yeongdo-gu<br>Busan 49112, South Korea</h2><p>Korea Maritime &amp; Ocean University</p></article></section></div>`;}
function standardPage(sourceIndex,title,subtitle){const p=pages[sourceIndex];return pageHero(title,subtitle)+`<div class="page-content page-${sourceIndex}">${p.sections.map((s,n)=>n===0&&['Gallery','Research','Vehicle Platform','Board'].includes(s.text)?'':block(s,n)).join('')}</div>`;}
function document(title,active,body,homePage=false){return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="RiMS Lab at Korea Maritime & Ocean University. Research in intelligent mobility systems, autonomous vehicles, and Physical AI."><meta name="theme-color" content="#000000"><title>${e(title)} — RiMS Lab</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="refined.css"><link rel="stylesheet" href="home-scroll.css"><script defer src="app.js"></script></head><body class="${homePage?'home':'inner-page'}">${nav(active)}<main id="main">${body}</main><footer><div class="footer-identity"><div class="footer-brand"><a class="footer-kmou" href="https://www.kmou.ac.kr/" target="_blank" rel="noopener" aria-label="Korea Maritime & Ocean University"><img src="assets/kmou-logo.png" alt="Korea Maritime & Ocean University logo"></a><a class="brand-mark" href="index.html">RiMS</a></div><div class="footer-about"><strong>Research in Intelligent Mobility Systems Lab</strong><p>Korea Maritime &amp; Ocean University</p></div></div><div class="footer-location"><strong>Location</strong><p>Room #646, College of Engineering I</p><p class="location-address">727, Taejong-ro, Yeongdo-gu, Busan, Republic of Korea</p></div><div class="footer-contact"><strong>Contact</strong><p><span>T</span> 051-410-4341</p><p><span>E</span> <a href="mailto:dhshin@kmou.ac.kr">dhshin@kmou.ac.kr</a></p></div><p class="footer-copyright">© 2021 RiMS Lab</p></footer></body></html>`;}
const outputPages=[
 ['index.html','Home',0,home(),true],
 ['professor.html','Professor',1,professorPage(),false],
 ['students.html','Students',1,studentsPage(),false],
 ['alumni.html','Alumni',1,alumniPage(),false],
 ['research.html','Research',2,standardPage(4,'Research','Human-Centered Smart Mobility Themes'),false],
 ['projects.html','Projects',2,projectsPage(),false],
 ['publications.html','Publications',3,publicationsPage(),false],
 ['vehicle-platform.html','Vehicle Platform',4,vehiclePlatformPage(),false],
 ['board.html','Board',5,boardPage(),false],
 ...boardItems.map(item=>[item.slug,item.title,5,boardDetailPage(item),false]),
 ['contact.html','Contact',6,contactPage(),false]
];
for(const [file,title,active,body,isHome] of outputPages)fs.writeFileSync(path.join(root,file),document(title,active,body,isHome));
for(const legacy of ['people.html','d-shin.html','lab-members.html'])fs.writeFileSync(path.join(root,legacy),`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0; url=professor.html"><link rel="canonical" href="professor.html"><title>Members — RiMS Lab</title></head><body><main><h1>Members</h1><p><a href="professor.html">Continue to Members</a></p></main></body></html>`);
for(const legacy of ['news.html','gallery.html'])fs.writeFileSync(path.join(root,legacy),`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0; url=board.html"><link rel="canonical" href="board.html"><title>Board — RiMS Lab</title></head><body><main><h1>Board</h1><p><a href="board.html">Continue to Board</a></p></main></body></html>`);
console.log(`Generated ${outputPages.length} main pages and 5 compatibility redirects.`);
















