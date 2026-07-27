const qs=(selector,scope=document)=>scope.querySelector(selector);
const qsa=(selector,scope=document)=>[...scope.querySelectorAll(selector)];

const menu=qs('.menu-toggle');
const nav=qs('#site-nav');
menu?.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')==='true';
  menu.setAttribute('aria-expanded',String(!open));
  nav?.classList.toggle('open',!open);
});
qsa('#site-nav a').forEach(link=>link.addEventListener('click',()=>{
  nav?.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
}));

qsa('[data-compare]').forEach(slider=>{
  const range=qs('input[type="range"]',slider);
  const wrap=qs('.compare-before-wrap',slider);
  const before=qs('.compare-before',slider);
  const divider=qs('.compare-divider',slider);
  const update=()=>{
    const value=Math.max(1,Number(range.value));
    wrap.style.width=`${value}%`;
    before.style.width=`${10000/value}%`;
    divider.style.left=`${value}%`;
  };
  range.addEventListener('input',update);
  update();
});

const projectSelect=qs('#projectType');
qsa('[data-service]').forEach(link=>link.addEventListener('click',()=>{
  const service=link.dataset.service;
  if(projectSelect){
    const match=[...projectSelect.options].find(option=>option.text===service);
    if(match) projectSelect.value=match.value || match.text;
  }
}));

const lightbox=qs('#lightbox');
const lightboxImage=qs('#lightbox img');
function closeLightbox(){
  lightbox?.classList.remove('open');
  lightbox?.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
qsa('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{
  if(!lightbox||!lightboxImage) return;
  lightboxImage.src=button.dataset.lightbox;
  lightboxImage.alt=qs('img',button)?.alt||'Project photo';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}));
qs('.lightbox-close')?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',event=>{if(event.target===lightbox) closeLightbox();});

const successModal=qs('#successModal');
function openSuccess(){
  successModal?.classList.add('open');
  successModal?.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeSuccess(){
  successModal?.classList.remove('open');
  successModal?.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
qs('.success-close')?.addEventListener('click',closeSuccess);
successModal?.addEventListener('click',event=>{if(event.target===successModal) closeSuccess();});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){closeLightbox();closeSuccess();}
});

const form=qs('#estimateForm');
const status=qs('#formStatus');
form?.addEventListener('submit',async event=>{
  event.preventDefault();
  const button=qs('button[type="submit"]',form);
  const original=button.textContent;
  button.disabled=true;
  button.textContent='Sending request…';
  status.textContent='';
  status.className='form-status';
  try{
    const response=await fetch(form.action,{
      method:'POST',
      body:new FormData(form),
      headers:{Accept:'application/json'}
    });
    if(!response.ok){
      const data=await response.json().catch(()=>({}));
      throw new Error(data?.errors?.map(error=>error.message).join(', ')||'Submission failed');
    }
    form.reset();
    status.textContent='Your estimate request was sent successfully.';
    status.className='form-status success';
    openSuccess();
  }catch(error){
    status.textContent='Your request could not be sent. Please try again or call (941) 404-9777.';
    status.className='form-status error';
  }finally{
    button.disabled=false;
    button.textContent=original;
  }
});

const year=qs('#year');
if(year) year.textContent=new Date().getFullYear();
