// ========= Reusable Modal (declare first so we can use it safely) =========
const overlay = document.querySelector('[data-modal-overlay]');
const modalContent = document.getElementById('modal-content');
// Force closed on load (belt-and-suspenders)
if (overlay) overlay.hidden = true;

// Footer year
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

function openModalFrom(targetId) {
  const src = document.getElementById(targetId);
  if (!src) return;
  modalContent.innerHTML = src.innerHTML; // inject project-specific content
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  overlay.hidden = true;
  modalContent.innerHTML = '';
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const openTrigger = e.target.closest('[data-modal-target]');
  const closeTrigger = e.target.closest('[data-modal-close]');

  // OPEN
  if (openTrigger) {
    e.preventDefault();
    const id = openTrigger.getAttribute('data-modal-target');
    openModalFrom(id);
    return;
  }

  // CLOSE (X button or backdrop)
  if (closeTrigger || e.target === overlay) {
    e.preventDefault();
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.hidden) closeModal();
});

/* ========= Sticky Mini-Nav (Scroll-Spy) ========= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      });
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));





