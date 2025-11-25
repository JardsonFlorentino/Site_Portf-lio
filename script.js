// Número de WhatsApp em formato internacional (sem +, parênteses ou traços)
const WHATSAPP_NUMBER = '5581986438384';

// Monta URL de WhatsApp "click to chat" com mensagem pré-preenchida
function buildWhatsAppUrl(message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/* MENU MOBILE */
function initMobileMenu() {
  const btn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  if (!btn || !navMenu) return;

  btn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });

  navMenu.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'A') {
      navMenu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* BOTÕES WHATSAPP (flutuante ou outros com data-whats-message) */
function initWhatsAppButtons() {
  const buttons = document.querySelectorAll('[data-whats-message]');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const msg =
        btn.getAttribute('data-whats-message') ||
        'Olá Jardson! Gostaria de falar sobre um projeto ou oportunidade.';
      const url = buildWhatsAppUrl(msg);
      window.open(url, '_blank')?.focus();
    });
  });
}

/* FORMULÁRIO DE CONTATO */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('input-name');
  const emailInput = document.getElementById('input-email');
  const messageInput = document.getElementById('input-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      alert('Por favor, preencha nome, e-mail e mensagem.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, informe um e-mail válido.');
      return;
    }

    const fullMessage =
      `Olá Jardson!` +
      `\n\nNome: ${name}` +
      `\nE-mail: ${email}` +
      `\n\nMensagem:\n${message}`;

    const url = buildWhatsAppUrl(fullMessage);
    window.open(url, '_blank')?.focus();
    form.reset();
  });
}

/* SCROLL REVEAL */
function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {       
        entry.target.classList.add('active');
          } else {        
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  });

  elements.forEach((el) => observer.observe(el));
}

/* INICIALIZAÇÃO GERAL */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initWhatsAppButtons();
  initContactForm();
  initScrollReveal();
});
