import React from "react";
import "../styles/ToggleSwitch.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";

export default function Settings() {
  const { t } = useTranslation();
const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4 text-white">
          <button
            className="py-2 px-4 rounded
							bg-violet-600
						 hover:bg-violet-700"
            onClick={() => navigate("component/settings/themeSetting")}
          >
            {t("theme")}
          </button>
          <button
            className="py-2 px-4 rounded
							bg-violet-600
						 hover:bg-violet-700"
             onClick={() => navigate("component/settings/languageSetting")}
             >
            {t("language")}
          </button>
      
        </div>

        <Outlet />
      </div>
    </div>
  );
}
{
  /* <div className="mx-40 my-20"> */
}

{
  /* <div className="flex">
        <div className="flex bg-gray-500 rounded-xl">
          <div className="mx-2">
            <NavLink to="component/settings/themeSetting">{t("theme")}</NavLink>
          </div>
          <div className="mx-2">
            <NavLink to="component/settings/languageSetting">{t("language")}</NavLink>
          </div>
        </div>
      </div> */
}
