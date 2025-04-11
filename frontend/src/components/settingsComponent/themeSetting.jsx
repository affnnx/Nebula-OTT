import React from "react";
import {useTheme} from "../../context/themeContext";
import { useTranslation } from "react-i18next";
export default function ThemeSetting() {
  const {theme, toggleTheme} = useTheme();

  const {t}=useTranslation()


  return (
    <div className="container">
      <div className="font-bold mt-10 mb-5">{t("setTheme")}</div>
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name="theme"
          id="theme"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <label className="label" htmlFor="theme">
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
}
