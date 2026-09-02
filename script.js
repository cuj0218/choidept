const characterImage = document.querySelector('#character-image');
const characterMode = document.querySelector('#character-mode');
const modeButtons = document.querySelectorAll('.mode-button');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modeButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    characterImage.style.opacity = '0';
    window.setTimeout(() => {
      characterImage.src = button.dataset.image;
      characterMode.textContent = button.dataset.mode;
      characterImage.style.opacity = '1';
    }, 120);
  });
});

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Close' : 'Menu';
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = 'Menu';
  });
});
