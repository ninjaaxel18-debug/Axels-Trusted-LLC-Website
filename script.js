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
