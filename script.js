const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const estimateForm = document.getElementById('estimateForm');
estimateForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(estimateForm);
  const subject = encodeURIComponent(`Estimate request: ${data.get('project')} - ${data.get('name')}`);
  const body = encodeURIComponent(
`Name: ${data.get('name')}
Phone: ${data.get('phone')}
Email: ${data.get('email') || 'Not provided'}
City: ${data.get('city')}
Project: ${data.get('project')}

Project details:
${data.get('details')}`
  );

  // Replace this sample email with your real business email.
  window.location.href = `mailto:info@axelstrusted.com?subject=${subject}&body=${body}`;
});

const lightbox=document.getElementById('lightbox');const lightboxImage=document.getElementById('lightboxImage');const lightboxClose=document.querySelector('.lightbox-close');document.querySelectorAll('.gallery-open').forEach(button=>button.addEventListener('click',()=>{lightboxImage.src=button.dataset.image;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}));function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImage.src='';document.body.style.overflow='';}lightboxClose?.addEventListener('click',closeLightbox);lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});


// Interactive before/after comparison
document.querySelectorAll('[data-before-after]').forEach((slider) => {
  const range = slider.querySelector('.ba-range');
  const beforeWrap = slider.querySelector('.ba-before-wrap');
  const beforeImage = slider.querySelector('.ba-before');
  const divider = slider.querySelector('.ba-divider');

  const update = () => {
    const value = Number(range.value);
    beforeWrap.style.width = `${value}%`;
    divider.style.left = `${value}%`;
    beforeImage.style.width = `${10000 / Math.max(value, 1)}%`;
  };

  // Keep original image geometry aligned while clipping.
  const updateAligned = () => {
    const value = Number(range.value);
    beforeWrap.style.width = `${value}%`;
    divider.style.left = `${value}%`;
    beforeImage.style.width = `${10000 / Math.max(value, 1)}%`;
  };

  range.addEventListener('input', updateAligned);
  updateAligned();
});


// Secure Formspree estimate form submission
const estimateForm = document.getElementById('estimateForm');
const formStatus = document.getElementById('formStatus');
const successModal = document.getElementById('successModal');
const successClose = document.querySelector('.success-close');
function openSuccessModal(){successModal?.classList.add('open');successModal?.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeSuccessModal(){successModal?.classList.remove('open');successModal?.setAttribute('aria-hidden','true');document.body.style.overflow='';}
successClose?.addEventListener('click',closeSuccessModal);
successModal?.addEventListener('click',(event)=>{if(event.target===successModal)closeSuccessModal();});
document.addEventListener('keydown',(event)=>{if(event.key==='Escape')closeSuccessModal();});
estimateForm?.addEventListener('submit',async(event)=>{
 event.preventDefault();
 const submitButton=estimateForm.querySelector('button[type="submit"]');
 const originalText=submitButton.textContent;
 submitButton.disabled=true; submitButton.classList.add('is-sending'); submitButton.textContent='Sending request…';
 formStatus.textContent=''; formStatus.className='form-status';
 try{
  const response=await fetch(estimateForm.action,{method:'POST',body:new FormData(estimateForm),headers:{'Accept':'application/json'}});
  if(!response.ok){const result=await response.json().catch(()=>({}));const message=result?.errors?.map(e=>e.message).join(', ');throw new Error(message||'Your request could not be sent.');}
  estimateForm.reset(); formStatus.textContent='Your estimate request was sent successfully.'; formStatus.className='form-status success'; openSuccessModal();
 }catch(error){formStatus.textContent='Something went wrong. Please try again or call (941) 404-9777.'; formStatus.className='form-status error';}
 finally{submitButton.disabled=false;submitButton.classList.remove('is-sending');submitButton.textContent=originalText;}
});
