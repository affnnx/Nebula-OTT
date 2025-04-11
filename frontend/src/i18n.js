import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

i18next.use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    // fallbackLng: "en",
    resources: {
      en: {
        translation: {
          appTitle: "NEBULA OTT",
          homeMenu: "Home",
          moviesMenu: "Movies",
          tvShowsMenu: "TV Shows",
          kidsMenu: "Kids",
          settingMenu: "Settings",
          top10ThisWeek: "Top 10 this week",
          liveNow: "Live now",
          forKids: "For Kids",
          theme: "Theme",
          language: "Language",
          themeLight: "Light",
          themeDark: "Dark",
          selectLanguage: "Select language",
          french: "French",
          english: "English",
          setTheme: "Set Theme"
        },
      },
      fr: {
        translation: {
          appTitle: "Réagissez par contournement",
          homeMenu: "Maison",
          moviesMenu: "Films",
          tvShowsMenu: "Montre",
          settingMenu: "Paramètres",
          top10ThisWeek: "Top 10 cette semaine",
          liveNow: "Vivre maintenant",
          forKids: "Pour les enfants",
          theme: "Thème",
          language: "langue",
          themeLight: "Lumière",
          themeDark: "Sombre",
          selectLanguage: "Sélectionnez la langue",
          french: "Français",
          english: "Anglaise",
          setTheme: "Définir le thème"

        },
      },
    },
  });


