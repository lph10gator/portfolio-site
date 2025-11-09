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

/* ========= Fixed-header mobile toggle ========= */
const fixedToggle = document.querySelector('.top-nav .nav-toggle');
const fixedMenu   = document.querySelector('.top-nav .nav-container');

if (fixedToggle && fixedMenu) {
  fixedToggle.addEventListener('click', () => {
    const open = fixedMenu.classList.toggle('show');
    fixedToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close the menu when a link is chosen
  fixedMenu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      fixedMenu.classList.remove('show');
      fixedToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Reset on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      fixedMenu.classList.remove('show');
      fixedToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ========= Sticky Mini-Nav (Scroll-Spy) for fixed header ========= */
const sections = document.querySelectorAll('section[id]');
const spyLinks = document.querySelectorAll('.top-nav a[href^="#"]');

if (sections.length && spyLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.top-nav a[href="#${entry.target.id}"]`);
      if (!link) return;

      if (entry.isIntersecting) {
        spyLinks.forEach(a => {
          a.classList.remove('active');
          a.removeAttribute('aria-current');
        });
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }, {
    threshold: 0.5
    // Optionally account for fixed header height:
    // rootMargin: '-70px 0px -30% 0px'
  });

  sections.forEach(section => observer.observe(section));
}
