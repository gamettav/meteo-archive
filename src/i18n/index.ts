import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_translation from "./locales/en_translation.json";
import fr_translation from "./locales/fr_translation.json";

i18n.use(initReactI18next).init({
   resources: {
      en: {
         translation: en_translation,
      },
      fr: {
         translation: fr_translation,
      },
   },
   lng: "en", // default language
   interpolation: {
      escapeValue: false,
   },
});

export { i18n };
