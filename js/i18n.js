const DICT = {
  en: {
    "header.langToggleLabel": "Switch language to Ukrainian",
    "hero.title": "Give fire a home it deserves.",
    "hero.text":
      "Hand-stitched lighter cases carved from reclaimed leather, finished with a hand-sculpted clay inlay and a base forged from a spent shell casing. Built to outlast the flame.",
    "hero.price": "From $100",
    "hero.cta": "Get notified when this item is available for purchase",
    "gallery.prevLabel": "Previous case",
    "gallery.nextLabel": "Next case",
    "gallery.goToLabel": "Go to slide",
    "story1.title": "Reclaimed Leather",
    "story1.body":
      "Every case begins with leather rescued from old shoes, bags, and jackets — cleaned, conditioned, and cut by hand. No new hide is ever used.",
    "story2.title": "A Clay Heart",
    "story2.body":
      "A disc of polymer clay is hand-sculpted, cured, and hand-painted before being bonded into the leather shell — no two inserts are perfectly alike.",
    "story3.title": "Forged From a Shell",
    "story3.body":
      "The leather is stitched and wrapped by hand, then crowned with a base milled from a single spent cartridge casing — one more thing saved from the scrap pile.",
    "finale.slogan": "Give a simple thing deep meaning and value.",
    "modal.title": "Get notified when this item is available for purchase",
    "modal.subtext":
      "Leave your email and we'll let you know the moment lamal&co cases go on sale.",
    "modal.emailLabel": "Email address",
    "modal.emailPlaceholder": "you@example.com",
    "modal.submit": "Notify me",
    "modal.submitting": "Submitting…",
    "modal.closeLabel": "Close",
    "modal.errorInvalid": "Please enter a valid email address.",
    "modal.errorDuplicate": "This email is already on the list.",
    "modal.errorGeneric": "Something went wrong. Please try again.",
    "modal.success": "You're on the list! We'll notify you.",
    "footer.text": "© 2026 lamal&co. Handmade in small batches.",
  },
  uk: {
    "header.langToggleLabel": "Switch language to English",
    "hero.title": "Подаруй вогню дім, який він заслуговує.",
    "hero.text":
      "Чохли для запальничок, зшиті вручну з переробленої шкіри, з вставкою з полімерної глини та основою, викуваною зі відпрацьованої гільзи. Створені, щоб служити довше за саме вогонь.",
    "hero.price": "Від $100",
    "hero.cta": "Повідомте мене, коли товар буде доступний для покупки",
    "gallery.prevLabel": "Попередній чохол",
    "gallery.nextLabel": "Наступний чохол",
    "gallery.goToLabel": "Перейти до слайду",
    "story1.title": "Перероблена шкіра",
    "story1.body":
      "Кожен чохол починається зі шкіри, врятованої зі старого взуття, сумок і курток — очищеної, обробленої та розкроєної вручну. Нова шкіра ніколи не використовується.",
    "story2.title": "Серце з глини",
    "story2.body":
      "Диск із полімерної глини ліпиться вручну, запікається та розписується, перш ніж з'єднатися зі шкіряним корпусом — немає двох однакових вставок.",
    "story3.title": "Викувано з гільзи",
    "story3.body":
      "Шкіра зшивається та обтягується вручну, а завершує конструкцію основа, виточена з відпрацьованої гільзи — ще одна річ, врятована від звалища.",
    "finale.slogan": "Дай простій речі глибокий сенс і цінність.",
    "modal.title": "Повідомте мене, коли товар буде доступний для покупки",
    "modal.subtext":
      "Залишіть email, і ми повідомимо вас, щойно чохли lamal&co з'являться у продажу.",
    "modal.emailLabel": "Електронна адреса",
    "modal.emailPlaceholder": "you@example.com",
    "modal.submit": "Повідомити мене",
    "modal.submitting": "Надсилання…",
    "modal.closeLabel": "Закрити",
    "modal.errorInvalid": "Введіть дійсну електронну адресу.",
    "modal.errorDuplicate": "Ця електронна адреса вже в списку.",
    "modal.errorGeneric": "Щось пішло не так. Спробуйте ще раз.",
    "modal.success": "Вас додано до списку! Ми вас повідомимо.",
    "footer.text": "© 2026 lamal&co. Виготовлено вручну малими партіями.",
  },
};

const LANG_STORAGE_KEY = "lang";
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || "en";

function t(key) {
  return DICT[currentLang][key] ?? DICT.en[key] ?? key;
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
  });

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = lang === "en" ? "UK" : "EN";
    toggleBtn.setAttribute("aria-label", t("header.langToggleLabel"));
  }
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

function initI18n() {
  applyLang(currentLang);
  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      applyLang(currentLang === "en" ? "uk" : "en");
    });
  }
}
