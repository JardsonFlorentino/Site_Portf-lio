const WHATSAPP_NUMBER = "5581986438384";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
  const url = buildWhatsAppUrl(message);
  window.open(url, "_blank")?.focus();
}

function initMobileMenu() {
  const btn = $("#hamburger-btn");
  const navMenu = $("#nav-menu");
  if (!btn || !navMenu) return;

  btn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen);
  });

  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navMenu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}



function initWhatsAppButtons() {
  $$(".whatsapp-button, [data-whats-message]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const msg =
        btn.dataset.whatsMessage ||
        "Olá Jardson! Gostaria de falar sobre um projeto ou oportunidade.";
      openWhatsApp(msg);
    });
  });
}



function initContactForm() {
  const form = $("#contact-form");
  if (!form) return;

  const nameInput = $("#input-name");
  const emailInput = $("#input-email");
  const messageInput = $("#input-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      return alert("Por favor, preencha todos os campos.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert("Por favor, informe um e-mail válido.");
    }

    const fullMessage = `
Olá Jardson!

Nome: ${name}
E-mail: ${email}

Mensagem:
${message}
    `.trim();

    openWhatsApp(fullMessage);
    form.reset();
  });
}



function initScrollReveal() {
  const elements = $$(".scroll-reveal");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -5% 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}


document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initWhatsAppButtons();
  initContactForm();
  initScrollReveal();
});
