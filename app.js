const headerLinks = document.querySelectorAll("header a");
const dateP = document.querySelector(".date p");
const valyutaLeftCells = document.querySelectorAll(".valyutaleft td");
const valyutaRightCells = document.querySelectorAll(".valyutaright td");
const leftInput = document.querySelector(".leftInput");
const rightInput = document.querySelector(".rightInput");
const leftRateP = document.querySelector(".valyutaleft p");
const rightRateP = document.querySelector(".valyutaright p");
const darkmood = document.querySelector(".darkmood");
const body = document.querySelector("body");
const header = document.querySelector("header");
const container = document.querySelector(".container");
const select = document.querySelector("select");
const dateshadow = document.querySelector(".date");
const input = document.querySelectorAll("input");
let valyutaData = null;
let leftCurrency = "AZN";
let rightCurrency = "USD";
let lastInput = "left";

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

function setActive(cells, activeCell) {
  cells.forEach(cell => (cell.style.backgroundColor = "#F1F2F8"));
  activeCell.style.backgroundColor = "#833CDE";
}

valyutaLeftCells.forEach(cell => {
  cell.addEventListener("click", () => {
    setActive(valyutaLeftCells, cell);
    leftCurrency = cell.textContent.trim();
    convertCurrency(lastInput);
  });
});

valyutaRightCells.forEach(cell => {
  cell.addEventListener("click", () => {
    setActive(valyutaRightCells, cell);
    rightCurrency = cell.textContent.trim();
    convertCurrency(lastInput);
  });
});

fetch("https://mocki.io/v1/155a5316-41ff-4ea7-9d98-554b53f1bcf7")
  .then(res => res.json())
  .then(data => {
    valyutaData = data;
    leftInput.addEventListener("input", () => {
      lastInput = "left";
      convertCurrency("left");
    });

    rightInput.addEventListener("input", () => {
      lastInput = "right";
      convertCurrency("right");
    });

    convertCurrency("left");
  });

function convertCurrency(from) {
  if (!valyutaData) return;
  const isFromLeft = from === "left";
  const input = isFromLeft ? leftInput : rightInput;
  const output = isFromLeft ? rightInput : leftInput;
  const inputCurrency = isFromLeft ? leftCurrency : rightCurrency;
  const outputCurrency = isFromLeft ? rightCurrency : leftCurrency;
  const inputValue = parseFloat(input.value);

  if (isNaN(inputValue)) {
    output.value = "";
    updateRateTexts(null, null);
    return;
  }

  if (inputCurrency === outputCurrency) {
    output.value = inputValue.toFixed(2);
    updateRateTexts(1, 1);
    return;
  }

  if (
    !valyutaData[inputCurrency] ||
    !valyutaData[inputCurrency][outputCurrency] ||
    !valyutaData[outputCurrency] ||
    !valyutaData[outputCurrency][inputCurrency]
  ) {
    output.value = "Məlumat yoxdur";
    updateRateTexts(null, null);
    return;
  }

  const rate = valyutaData[inputCurrency][outputCurrency];
  const reverseRate = valyutaData[outputCurrency][inputCurrency];
  output.value = (inputValue * rate).toFixed(2);
  updateRateTexts(rate, reverseRate);
}

function updateRateTexts(rate, reverseRate) {
  if (!rate || !reverseRate) {
    leftRateP.textContent = "";
    rightRateP.textContent = "";
    return;
  }
  leftRateP.textContent = `1 ${leftCurrency} = ${rate.toFixed(4)} ${rightCurrency}`;
  rightRateP.textContent = `1 ${rightCurrency} = ${reverseRate.toFixed(4)} ${leftCurrency}`;
}

if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("darkmode-body");
  darkmood.classList.add("darkmoodbutton");
  header.classList.add("darkmode-header");
  container.classList.add("darkmode-container");
  select.classList.add("darkmode-shadow");
  dateshadow.classList.add("darkmode-shadow");
  input.forEach(item => {
    item.classList.add("darkmode-shadow");
  });
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
  input.forEach(item => {
    item.classList.toggle("darkmode-shadow");
  });

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
            boxH2: "Onlayn valyuta çeviricisi",
            containerH4:
              "VALYUTA KONVERTORU İLƏ BU GÜNƏ OLAN VALYUTA MƏZƏNNƏLƏRİNİ TƏQİB EDİRIK",
            containerP:
              "Çevirmək istədiyiniz valyutanı başqa valyuta məzənnəsinə nisbətdə hesablamaq istəyirsinizsə məbləği yazın və hesablayın.",
          },
        },
        en: {
          translation: {
            Konvertor: "Converter",
            Məzənnələr: "Rates",
            Qrafikler: "Charts",
            boxH2: "Online currency converter",
            containerH4:
              "WE FOLLOW CURRENCY RATES TODAY WITH THE CURRENCY CONVERTER",
            containerP:
              "If you want to calculate the currency you want to convert against another currency rate, type in the amount and calculate.",
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