import { personas, headlineMetrics, cases, experience } from './portfolio-data.js';
import { nextPersonaIndex } from './ui-state.js';

const byId = (id) => document.getElementById(id);
const personaButtons = [...document.querySelectorAll('[data-persona]')];
const identityOs = document.querySelector('.identity-os');
const personaImage = byId('persona-image');
const personaLabel = byId('persona-label');
const personaTitle = byId('persona-title');
const personaDescription = byId('persona-description');
const personaChips = byId('persona-chips');
let activePersonaIndex = 0;
let personaChangeTimeout;

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function applyPersona(index, { focus = false } = {}) {
  const persona = personas[index];
  if (!persona) return;
  activePersonaIndex = index;
  identityOs.dataset.accent = persona.accent;
  personaImage.classList.add('is-changing');
  window.clearTimeout(personaChangeTimeout);
  personaChangeTimeout = window.setTimeout(() => {
    personaImage.src = persona.image;
    personaImage.alt = persona.alt;
    personaLabel.textContent = `MODE ${persona.index} / ${persona.label}`;
    personaTitle.textContent = persona.title;
    personaDescription.textContent = persona.description;
    personaChips.innerHTML = listItems(persona.chips);
    personaImage.classList.remove('is-changing');
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 140);
  personaButtons.forEach((button, buttonIndex) => {
    const selected = buttonIndex === index;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  if (focus) personaButtons[index].focus();
}

personaButtons.forEach((button, index) => {
  button.addEventListener('click', () => applyPersona(index));
  button.addEventListener('keydown', (event) => {
    const next = nextPersonaIndex(activePersonaIndex, event.key, personas.length);
    if (next === activePersonaIndex && !['Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    applyPersona(next, { focus: true });
  });
});

byId('proof-list').innerHTML = headlineMetrics.map((metric) => `
  <article class="proof-row">
    <strong>${metric.value}</strong><span>${metric.label}</span><small>${metric.context}</small>
  </article>`).join('');

byId('case-list').innerHTML = cases.map((item) => `
  <article class="case-file case-file--${item.id}">
    <header><span>${item.number}</span><p>${item.eyebrow}</p></header>
    <h3>${item.title}</h3>
    <dl>
      <div><dt>CONTEXT</dt><dd>${item.context}</dd></div>
      <div><dt>RESPONSIBILITY</dt><dd>${item.responsibility}</dd></div>
      <div><dt>SYSTEM</dt><dd>${item.system}</dd></div>
      <div><dt>RESULT</dt><dd>${item.result}</dd></div>
    </dl>
    <footer>${item.links.map((link) => `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label} ↗</a>`).join('')}</footer>
  </article>`).join('');

byId('experience-list').innerHTML = experience.map((item) => `
  <li data-type="${item.type}">
    <time>${item.period}</time><div><strong>${item.role}</strong><span>${item.organization}</span></div><small>${item.status}</small>
  </li>`).join('');

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = byId('mobile-nav');
menuToggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'CLOSE' : 'MENU';
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = 'MENU';
}));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}

applyPersona(0);
