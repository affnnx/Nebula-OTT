import React, { useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function LanguageSetting() {
  const handleLanguageChange = (lang) => {
    i18next.changeLanguage(lang);
  };

  const {t}=useTranslation()

  return (
    <div className="font-bold text-center my-10 ">
      <div>{t("selectLanguage")}</div>

      <button className="bg-gray-700 px-5 py-2 rounded-2xl m-10 text-white" onClick={() => handleLanguageChange("fr")}>{t("french")}</button>
      <button className="bg-gray-700 px-5 py-2 rounded-2xl m-10 text-white" onClick={() => handleLanguageChange("en")}>{t("english")}</button>
    </div>
  );
}
