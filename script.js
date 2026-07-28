const qs=(s,c=document)=>c.querySelector(s);const qsa=(s,c=document)=>[...c.querySelectorAll(s)];

const menu=qs('.menu-toggle');const nav=qs('#siteNav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav?.classList.toggle('open',!open)});
qsa('#siteNav a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));

qsa('[data-before-after]').forEach(slider=>{const range=qs('.ba-range',slider),layer=qs('.ba-before-layer',slider),handle=qs('.ba-handle',slider);const update=()=>{const v=Number(range.value);layer.style.clipPath=`inset(0 ${100-v}% 0 0)`;handle.style.left=`${v}%`};range.addEventListener('input',update);update()});

const lightbox=qs('#lightbox'),lightImg=qs('#lightbox img');
qsa('[data-lightbox]').forEach(btn=>btn.addEventListener('click',()=>{lightImg.src=btn.dataset.lightbox;lightImg.alt=qs('img',btn)?.alt||'Project photo';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}));
function closeLightbox(){lightbox?.classList.remove('open');lightbox?.setAttribute('aria-hidden','true');document.body.style.overflow=''}
qs('.lightbox-close')?.addEventListener('click',closeLightbox);lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});

const successModal=qs('#successModal');
function openSuccess(){successModal?.classList.add('open');successModal?.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeSuccess(){successModal?.classList.remove('open');successModal?.setAttribute('aria-hidden','true');document.body.style.overflow=''}
qs('.success-close')?.addEventListener('click',closeSuccess);successModal?.addEventListener('click',e=>{if(e.target===successModal)closeSuccess()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();closeSuccess()}});

const form=qs('#estimateForm'),status=qs('#formStatus');
form?.addEventListener('submit',async e=>{e.preventDefault();const button=qs('button[type="submit"]',form),original=button.textContent;button.disabled=true;button.textContent='Sending request…';status.textContent='';status.className='form-status';try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!response.ok){const data=await response.json().catch(()=>({}));throw new Error(data?.errors?.map(x=>x.message).join(', ')||'Submission failed')}form.reset();status.textContent='Your estimate request was sent successfully.';status.className='form-status success';openSuccess()}catch(err){status.textContent='Your request could not be sent. Please try again or call (941) 404-9777.';status.className='form-status error'}finally{button.disabled=false;button.textContent=original}});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});qsa('.reveal').forEach(el=>observer.observe(el));
qs('#year').textContent=new Date().getFullYear();
