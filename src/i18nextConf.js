import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/en/translation.json";
import translationPT from "./locales/pt/translation.json";

const availableLanguages = ["en", "pt"];

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    react: { 
      useSuspense: false
    },
    resources:resources,
    fallbackLng:'pt',
    detection: {
      order: ['localStorage', 'cookie', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches:['localStorage']
    },

    supportedLngs:availableLanguages,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;