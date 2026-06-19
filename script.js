/* ============================================================
   STUDIO SPROUT — JAVASCRIPT
   ============================================================
   This file handles:
   - Scroll progress bar
   - Sticky header
   - Mobile menu
   - Active nav link on scroll
   - Scroll reveal animations
   - Age filter (homepage)
   - FAQ accordion
   - Contact form (demo — connect to Formspree to make it work)
   - Hero image parallax
   ============================================================ */


/* ============================================================
   SCROLL PROGRESS BAR + STICKY HEADER
   ============================================================ */
const hdr  = document.getElementById('hdr');
const prog = document.getElementById('progress');

window.addEventListener('scroll', () => {
  // Sticky header background
  hdr.classList.toggle('scrolled', window.scrollY > 40);

  // Scroll progress bar width
  const doc = document.documentElement;
  const scrolled = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
  prog.style.width = scrolled + '%';

  // Active nav link based on scroll position
  updateActiveNav();
});


/* ============================================================
   MOBILE BURGER MENU
   ============================================================ */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('mob-open');
});

// Close menu when a nav link is clicked
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('mob-open');
  });
});


/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}


/* ============================================================
   SCROLL REVEAL ANIMATIONS
   ============================================================ */
function initReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

initReveals();


/* ============================================================
   AGE FILTER (homepage)
   ============================================================
   Edit the messages below to match your age groups.
   ============================================================ */
const ageMsgs = [
  "Voor 4–6 jaar werken we speels via Balans & Bewegen en korte coachingssessies. <a href='#aanbod'>Bekijk het aanbod →</a>",
  "Voor 7–9 jaar passen Coaching & SEO en Groeien & Ontdekken goed — gericht op emoties en zelfvertrouwen. <a href='#aanbod'>Bekijk het aanbod →</a>",
  "Voor 10–13 jaar bieden we coaching rond zelfvertrouwen, vriendschap en veerkracht, met praktische handvatten. <a href='#aanbod'>Bekijk het aanbod →</a>",
  "Voor ouders en scholen bieden we advies, begeleiding en korte e-consults. <a href='#trajecten'>Bekijk advies & trajecten →</a>"
];

document.querySelectorAll('.age-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.age-chip').forEach(c => c.classList.remove('on'));
    chip.classList.add('on');
    const out = document.getElementById('ageOut');
    out.style.opacity = 0;
    setTimeout(() => {
      out.innerHTML = ageMsgs[chip.dataset.age];
      out.style.opacity = 1;
    }, 200);
  });
});


/* ============================================================
   FAQ ACCORDION
   ============================================================ */
document.querySelectorAll('.faq-q').forEach(question => {
  question.addEventListener('click', () => {
    const item   = question.parentElement;
    const answer = question.nextElementSibling;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});


/* ============================================================
   CONTACT FORM
   ============================================================
   Currently shows a demo message.

   TO CONNECT TO FORMSPREE:
   1. Go to https://formspree.io and create a free account
   2. Create a new form and copy your form endpoint, e.g.:
      https://formspree.io/f/xabc1234
   3. In index.html, find the <form> tag and change:
      <form id="contact-form">
      to:
      <form id="contact-form" action="https://formspree.io/f/xabc1234" method="POST">
   4. Remove or comment out the JavaScript submit handler below
      and the form will submit directly to Formspree.

   TO CONNECT TO NETLIFY FORMS:
   1. In index.html, find the <form> tag and add:
      netlify  data-netlify="true"  name="contact"
      e.g.: <form id="contact-form" name="contact" netlify data-netlify="true">
   2. Netlify will automatically handle the form when deployed.

   TO USE A SIMPLE EMAIL FALLBACK:
   Replace the button with:
   <a href="mailto:studiosprout.amst@gmail.com" class="btn btn-primary">Stuur een e-mail →</a>
   ============================================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const naam = document.getElementById('f-naam').value.trim();
    const mail = document.getElementById('f-mail').value.trim();
    const msg  = document.getElementById('f-msg');

    if (!naam || !mail) {
      msg.textContent = "Vul je naam en e-mail in om te versturen.";
      msg.classList.add('show');
      return;
    }

    // Demo response — replace this with your Formspree/Netlify setup
    msg.textContent = "Bedankt " + naam + "! We nemen zo snel mogelijk contact met je op. 🌱";
    msg.classList.add('show');

    // Clear form
    contactForm.reset();
  });
}


/* ============================================================
   HERO IMAGE PARALLAX (subtle mouse movement effect)
   ============================================================ */
const heroImg = document.getElementById('heroImg');
if (heroImg) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroImg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
  });
}
