document.addEventListener("DOMContentLoaded", () => {
  const langButtons = Array.from(document.querySelectorAll("[data-lang-toggle]"));
  if (!langButtons.length) return;

  const STORAGE_KEY = "imposti_lang";
  const defaultLang = "ka";

  const enTranslations = {
    title: "IMPOSTI | Construction & MEP Solutions",
    languageLabel: "Language",
    callAria: "Call phone",
    heroAlt: "Imposti construction image",
    pill: "Engineering Excellence",
    headline: "\"Imposti Holding\"<br>17-year journey toward success!",
    intro: "The company’s long-term activity is based on experience, a high level of responsibility, and quality standards. It works in both construction and restoration fields, and also includes the engineering company Imposti MEP and the design company - Imep Project.",
    years: "Since",
    projects: "Projects",
    contact: "Contact Us",
    location: "I.Chavchavadze Ave 39, 0160, Tbilisi, Georgia",
    copyright: "\u00A9 2026 IMPOSTI. All Rights Reserved."
  };

  const translatableElements = Array.from(document.querySelectorAll("[data-i18n]"))
    .map((el) => ({
      el,
      key: el.getAttribute("data-i18n"),
      attr: el.getAttribute("data-i18n-attr"),
      html: el.hasAttribute("data-i18n-html")
    }))
    .filter((entry) => entry.key);

  const heroImage = document.querySelector(".hero-image-box img");

  // Georgian text is read from HTML so editing index.html is immediately reflected.
  const kaTranslations = translatableElements.reduce(
    (acc, { el, key, attr, html }) => {
      acc[key] = attr ? el.getAttribute(attr) || "" : html ? el.innerHTML || "" : el.textContent || "";
      return acc;
    },
    { title: document.title }
  );

  const translations = {
    ka: kaTranslations,
    en: enTranslations
  };

  const applyLanguage = (lang) => {
    const activeLang = translations[lang] ? lang : defaultLang;
    const dict = translations[activeLang];

    document.documentElement.lang = activeLang;
    document.title = dict.title;

    translatableElements.forEach(({ el, key, attr, html }) => {
      const value = dict[key];
      if (!value) return;
      if (attr) {
        el.setAttribute(attr, value);
      } else if (html) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    if (heroImage) {
      const nextSrc = activeLang === "en" ? heroImage.dataset.srcEn : heroImage.dataset.srcKa;
      if (nextSrc) heroImage.setAttribute("src", nextSrc);
    }

    langButtons.forEach((btn) => {
      const isActive = btn.dataset.langToggle === activeLang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    localStorage.setItem(STORAGE_KEY, activeLang);
  };

  applyLanguage(localStorage.getItem(STORAGE_KEY) || defaultLang);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.langToggle));
  });
});

