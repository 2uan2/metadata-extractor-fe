// i18n.js
// i18n.js
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Detects browser language
import HttpApi from "i18next-http-backend"; // Loads translations from a backend (e.g., public/locales)
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "vn",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
