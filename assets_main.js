// ========= Reusable Modal (declare first so we can use it safely) =========
const overlay = document.querySelector('[data-modal-overlay]');
const modalContent = document.getElementById('modal-content');
// Force closed on load (belt-and-suspenders)
if (overlay) overlay.hidden = true;

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('show');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

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
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

// Intersection Observer handles highlighting and aria-current
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.remove("active");
        a.removeAttribute("aria-current");
      });
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));


