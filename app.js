const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);toggle.querySelector('span').textContent=open?'−':'＋';});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){toggle.setAttribute('aria-expanded','false');navigation.classList.remove('open');toggle.querySelector('span').textContent='＋';}});
document.querySelectorAll('.demo-play').forEach(button=>{
 button.addEventListener('click',()=>{
  const id=button.dataset.video;
  if(!/^[\w-]{11}$/.test(id))return;
  const frame=document.createElement('iframe');
  frame.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
  frame.title=button.dataset.title||'RiMS research demonstration';
  frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.allowFullscreen=true;
  button.parentElement.replaceChildren(frame);
  frame.focus();
 });
});
document.querySelectorAll('img').forEach(img=>{img.addEventListener('error',()=>{const figure=img.closest('figure');const anchor=figure.querySelector('a');const message=document.createElement('span');message.className='image-unavailable';message.textContent='View original research image ↗';anchor.replaceChildren(message);},{once:true});});
document.querySelectorAll('a[aria-disabled="true"]').forEach(link=>link.addEventListener('click',event=>event.preventDefault()));
