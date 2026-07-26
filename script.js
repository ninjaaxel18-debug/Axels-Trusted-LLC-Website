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
