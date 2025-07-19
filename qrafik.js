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
            boxH2: "Məzənələrin son 15 ildə dəyişməsi",
            containerH4:
              "VALYUTA QRAFİKLƏRİNİ CANLI İZLƏYİN VƏ DİGƏR VALYUTA CÜTLÜKLƏRİ İLƏ MÜQAYİSƏ EDİN",
            containerP:
              "Bu bölmə vasitəsilə valyuta cütlüklərinin ani qiymət dəyişikliklərini dəqiqəlik, saatlıq, günlük və həftəlik qiymət tendensiyasını görə bilə,digər valyuta cütlükləri ilə müqayisə edə bilərsiniz",
          },
        },
        en: {
          translation: {
            Konvertor: "Converter",
            Məzənnələr: "Rates",
            Qrafikler: "Charts",
            boxH2: "Exchange rate changes over the last 15 years",
            containerH4:
              "WATCH CURRENCY CHARTS LIVE AND COMPARE WITH OTHER CURRENCY PAIRS",
            containerP:
              "Through this section, you can see the instantaneous price changes of currency pairs, see the price trend by minute, hour, daily and weekly, and compare it with other currency pairs.",
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
}
const ctx = document.getElementById('multiCurrencyChart').getContext('2d');
const years = [];
for (let y = 2010; y <= 2025; y++) years.push(y);
const currencies = ['USD', 'EUR', 'TRY', 'RUB'];
const colors = ['blue', 'green', 'orange', 'red'];
const allRates = {
  USD: years.map((_, i) => 1.7 + Math.sin(i / 3) * 0.2),
  EUR: years.map((_, i) => 2.0 + Math.cos(i / 4) * 0.15),
  TRY: years.map((_, i) => 0.1 + Math.sin(i / 2) * 0.05),
  RUB: years.map((_, i) => 0.03 + Math.cos(i / 3) * 0.01),
};
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: years,
    datasets: currencies.map((cur, idx) => ({
      label: `${cur} → AZN`,
      data: allRates[cur],
      borderColor: colors[idx],
      backgroundColor: colors[idx] + '33',
      fill: false,
      tension: 0.3,
      pointRadius: 4,
      spanGaps: true,
    }))
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          boxWidth: 20,
          padding: 15,
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(4)}`
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: 'AZN məzənnəsi' }
      },
      x: {
        title: { display: true, text: 'İllər' }
      }
    },
  }
});