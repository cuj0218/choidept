import { cases, experience, headlineMetrics, links, pageCopy, personas } from './portfolio-data.js';
import { languageFromLocation, nextLanguage, nextPersonaIndex } from './ui-state.js';

const byId = (id) => document.getElementById(id);
const personaButtons = [...document.querySelectorAll('[data-persona]')];
const identityOs = document.querySelector('.identity-os');
const personaImage = byId('persona-image');
const personaLabel = byId('persona-label');
const personaTitle = byId('persona-title');
const personaDescription = byId('persona-description');
const personaChips = byId('persona-chips');
const languageToggle = byId('language-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = byId('mobile-nav');
let activePersonaIndex = 0;
let currentLanguage = 'ko';
let personaChangeTimeout;

const copyAt = (language, path) => path.split('.').reduce((value, key) => value?.[key], pageCopy[language]);
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined) element.textContent = value;
}

function setLines(selector, lines) {
  const element = document.querySelector(selector);
  if (!element || !Array.isArray(lines)) return;
  if (typeof element.replaceChildren !== 'function') {
    element.textContent = lines.join(' ');
    return;
  }
  element.replaceChildren(...lines.flatMap((line, index) => index === lines.length - 1 ? [document.createTextNode(line)] : [document.createTextNode(`${line} `), document.createElement('br')]));
}

function listItems(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function localizedPersona(persona) {
  return persona.copy?.[currentLanguage] ?? persona;
}

function applyPersona(index, { focus = false } = {}) {
  const persona = personas[index];
  if (!persona || !personaImage || !identityOs) return;
  const copy = localizedPersona(persona);
  activePersonaIndex = index;
  identityOs.dataset.accent = persona.accent;
  personaImage.classList.add('is-changing');
  window.clearTimeout(personaChangeTimeout);
  personaChangeTimeout = window.setTimeout(() => {
    personaImage.src = persona.image;
    personaImage.alt = copy.alt ?? persona.alt;
    if (personaLabel) personaLabel.textContent = `MODE ${persona.index} / ${copy.label}`;
    if (personaTitle) personaTitle.textContent = copy.title;
    if (personaDescription) personaDescription.textContent = copy.description;
    if (personaChips) personaChips.innerHTML = listItems(copy.chips);
    personaImage.classList.remove('is-changing');
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 140);
  personaButtons.forEach((button, buttonIndex) => {
    const selected = buttonIndex === index;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  if (focus) personaButtons[index]?.focus();
}

function renderProof(copy) {
  const list = byId('proof-list');
  if (!list) return;
  list.innerHTML = headlineMetrics.map((metric) => `<article class="proof-row"><strong>${escapeHtml(metric.value)}</strong><span>${escapeHtml(metric.label)}</span><small>${escapeHtml(metric.context)}</small></article>`).join('');
  const metrics = document.querySelector('.hero__metrics');
  if (metrics) metrics.setAttribute('aria-label', copy.hero.metricsLabel);
}

function renderCases(copy) {
  const list = byId('case-list');
  if (!list) return;
  list.innerHTML = cases.map((item) => {
    const itemCopy = item.copy?.[currentLanguage] ?? item;
    return `<article class="case-file case-file--${escapeHtml(item.id)}"><header><span>${escapeHtml(item.number)}</span><p>${escapeHtml(itemCopy.eyebrow)}</p></header><h3>${escapeHtml(itemCopy.title)}</h3><dl>${itemCopy.context ? `<div><dt>${escapeHtml(copy.work.fields[0])}</dt><dd>${escapeHtml(itemCopy.context)}</dd></div>` : ''}<div><dt>${escapeHtml(copy.work.fields[1])}</dt><dd>${escapeHtml(itemCopy.responsibility)}</dd></div><div><dt>${escapeHtml(copy.work.fields[2])}</dt><dd>${escapeHtml(itemCopy.system)}</dd></div><div><dt>${escapeHtml(copy.work.fields[3])}</dt><dd>${escapeHtml(itemCopy.result)}</dd></div></dl><footer>${item.links.map((link) => `<a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)} ↗</a>`).join('')}</footer></article>`;
  }).join('');
}

function renderExperience() {
  const list = byId('experience-list');
  if (!list) return;
  list.innerHTML = experience.map((item) => {
    const itemCopy = item.copy?.[currentLanguage] ?? item;
    return `<li data-type="${escapeHtml(item.type)}"><time>${escapeHtml(item.period)}</time><div><strong>${escapeHtml(itemCopy.role)}</strong><span>${escapeHtml(itemCopy.organization)}</span></div><small>${escapeHtml(itemCopy.status)}</small></li>`;
  }).join('');
}

function updateUrl(language) {
  if (typeof history === 'undefined' || typeof location === 'undefined') return;
  const query = language === 'en' ? '?lang=en' : '';
  history.replaceState(null, '', `${location.pathname}${query}${location.hash}`);
}

function applyLanguage(language) {
  currentLanguage = ['ko', 'en'].includes(language) ? language : 'ko';
  const copy = pageCopy[currentLanguage];
  if (document.documentElement) document.documentElement.lang = currentLanguage;
  document.title = currentLanguage === 'ko' ? 'CHOI DEPT. — 모두가 AI를 쉽게, 최피티' : 'CHOI DEPT. — Making AI easy for everyone.';
  document.querySelectorAll('[data-copy]').forEach((element) => {
    const value = copyAt(currentLanguage, element.dataset.copy);
    if (typeof value === 'string') element.textContent = value;
  });
  document.querySelectorAll('[data-copy-aria]').forEach((element) => {
    const value = copyAt(currentLanguage, element.dataset.copyAria);
    if (typeof value === 'string') element.setAttribute('aria-label', value);
  });
  setLines('#hero-title', copy.hero.titleLines);
  setLines('#proof-title', copy.proof.title);
  setLines('#work-title', copy.work.title);
  setLines('#experience-title', copy.experience.title);
  setLines('#profile-title', copy.profile.title);
  setLines('#contact-title', copy.contact.title);
  copy.profile.paragraphs.forEach((paragraph, index) => setText(`[data-copy="profile.paragraphs.${index}"]`, paragraph));
  renderProof(copy);
  renderCases(copy);
  renderExperience();
  if (languageToggle) {
    languageToggle.textContent = copy.nav.language;
    languageToggle.setAttribute('aria-pressed', String(currentLanguage === 'en'));
    languageToggle.setAttribute('aria-label', currentLanguage === 'ko' ? 'Switch to English' : '한국어로 전환');
  }
  applyPersona(activePersonaIndex);
  updateUrl(currentLanguage);
  try { localStorage.setItem('choidept-language', currentLanguage); } catch {}
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

languageToggle?.addEventListener('click', () => applyLanguage(nextLanguage(currentLanguage)));

menuToggle?.addEventListener('click', () => {
  const open = mobileNav?.classList.toggle('is-open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'CLOSE' : 'MENU';
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.textContent = 'MENU';
}));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof IntersectionObserver !== 'undefined') {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}

let storedLanguage = 'ko';
try { storedLanguage = localStorage.getItem('choidept-language') ?? 'ko'; } catch {}
const initialLanguage = typeof location === 'undefined' ? storedLanguage : languageFromLocation(location.search, storedLanguage);
applyLanguage(initialLanguage);
