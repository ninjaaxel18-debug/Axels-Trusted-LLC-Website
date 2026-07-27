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

// Route estimate form to the business Gmail with a consistent subject.
const conversionForm = document.getElementById('estimateForm');
if (conversionForm) {
  conversionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(conversionForm);
    const recipient = conversionForm.dataset.recipient || 'axelsllc22@gmail.com';
    const project = data.get('project') || 'Home improvement';
    const subject = `New Website Estimate Request - ${project}`;
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `City: ${data.get('city') || ''}`,
      `Project: ${project}`,
      '',
      'Project details:',
      data.get('details') || ''
    ].join('\n');
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
