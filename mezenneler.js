const dateP = document.querySelector(".date p");
const headerLinks = document.querySelectorAll("header a");
const darkmood = document.querySelector(".darkmood");
const body = document.querySelector("body");
const header = document.querySelector("header");
const container = document.querySelector(".container");
const select = document.querySelector("select");
const dateshadow = document.querySelector(".date");

setInterval(() => {
  dateP.textContent = new Date().toLocaleDateString();
}, 1000);

headerLinks.forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (!href || href === "#") {
      e.preventDefault();
    }
    headerLinks.forEach(l => {
      l.style.color = body.classList.contains("darkmode-body") ? "white" : "black";
    });
    link.style.color = "#10ABA2";
  });
});

if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("darkmode-body");
  darkmood.classList.add("darkmoodbutton");
  header.classList.add("darkmode-header");
  container.classList.add("darkmode-container");
  select.classList.add("darkmode-shadow");
  dateshadow.classList.add("darkmode-shadow");
  headerLinks.forEach(link => {
    link.classList.add("darkmode-a");
    link.style.color = "white";
  });
}

function darkmode(e) {
  e.preventDefault();
  body.classList.toggle("darkmode-body");
  darkmood.classList.toggle("darkmoodbutton");
  container.classList.toggle("darkmode-container");
  select.classList.toggle("darkmode-shadow");
  dateshadow.classList.toggle("darkmode-shadow");
  header.classList.toggle("darkmode-header");
  const isDark = body.classList.contains("darkmode-body");
  headerLinks.forEach(link => {
    link.classList.toggle("darkmode-a");
    link.style.color = isDark ? "white" : "black";
  });
  if (isDark) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
}
darkmood.addEventListener("click", darkmode);

i18next
  .use(i18nextBrowserLanguageDetector)
  .init(
    {
      resources: {
        az: {
          translation: {
            Konvertor: "Konvertor",
            Məzənnələr: "Məzənnələr",
            Qrafikler: "Qrafiklər",
            Valyuta: "Valyuta",
            nagdAlis: "Ən sərfəli nağd alış",
            nagdsizAlis: "Ən sərfəli nağdsız alış",
            nagdSatis: "Ən sərfəli nağd satış",
            nagdsizSatis: "Ən sərfəli nağdsız satış",
            boxH2: "Banklarda bu gün üçün ən sərfəli valyuta məzənnələri",
            containerH4:
              "Bank valyuta kursları",
            containerP:
              "Bu bölmə vasitəsilə ölkədaxili bankların valyutaları hansı kurs ilə alıb və ya satması haqqında məlumatlarla tanış ola bilərsiniz.",
          },
        },
        en: {
          translation: {
            Konvertor: "Converter",
            Məzənnələr: "Rates",
            Qrafikler: "Charts",
            Valyuta: "Currency",
            nagdAlis: "The most profitable cash purchase",
            nagdsizAlis: "The most profitable cashless purchase",
            nagdSatis: "The most profitable cash sale",
            nagdsizSatis: "The most profitable cashless sales",
            boxH2: "The most favorable exchange rates in banks for today",
            containerH4:
              "Bank exchange rates",
            containerP:
              "Through this section, you can get information about the exchange rates at which domestic banks buy or sell currencies.",
          },
        },
      },
      fallbackLng: localStorage.getItem("selectedLang") || "en",
      debug: true,
    },
    function () {
      updateContent();
      const langSelect = document.querySelector("select");
      const savedLang = localStorage.getItem("selectedLang");
      if (savedLang) {
        langSelect.value = savedLang;
      }
      langSelect.addEventListener("change", (e) => {
        const newLang = e.target.value;
        localStorage.setItem("selectedLang", newLang);
        i18next.changeLanguage(newLang).then(() => {
          updateContent();
        });
      });
    }
  );
function updateContent() {
  document.querySelector('[data-i18n="Konvertor"]').textContent =
    i18next.t("Konvertor");
  document.querySelector('[data-i18n="Məzənnələr"]').textContent =
    i18next.t("Məzənnələr");
  document.querySelector('[data-i18n="Qrafikler"]').textContent =
    i18next.t("Qrafikler");
  document.querySelector('[data-i18n="containerH4"]').textContent =
    i18next.t("containerH4");
  document.querySelector('[data-i18n="containerP"]').textContent =
    i18next.t("containerP");
  document.querySelector('[data-i18n="boxH2"]').textContent = i18next.t("boxH2");
  document.querySelector('[data-i18n="Valyuta"]').textContent = i18next.t("Valyuta");
  document.querySelector('[data-i18n="nagdAlis"]').textContent = i18next.t("nagdAlis");
  document.querySelector('[data-i18n="nagdsizAlis"]').textContent = i18next.t("nagdsizAlis");
  document.querySelector('[data-i18n="nagdSatis"]').textContent = i18next.t("nagdSatis");
  document.querySelector('[data-i18n="nagdsizSatis"]').textContent = i18next.t("nagdsizSatis");
}