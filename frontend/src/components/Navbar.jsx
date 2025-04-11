import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Menu, Search, Settings, LogOut } from "lucide-react";
import { useContentStore } from "../store/contentType";
export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const {contentType, setContentType } = useContentStore();
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
  };

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-2 mb-2 h-20 text-white">
      <div className="flex items-center gap-10 z-50">
        <NavLink to={"/"}
            onClick={() => {
              setContentType(contentType==="movie"?"tv":"movie");
            }}>
          <img
            src="/logo.png"
            alt="logo"
            className="w-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          />
        </NavLink>
        <div className="hidden sm:flex gap-4">
          <NavLink to="/" className="hover:underline"  
            onClick={() => {
              setContentType(contentType==="movie"?"tv":"movie");
            }}>
            <div>{t("homeMenu")}</div>
          </NavLink>
          <NavLink
          to="/"
            className="hover:underline"
            onClick={() => {
              setContentType("movie");
            }}
          >
            <div>{t("moviesMenu")}</div>
          </NavLink>
          <NavLink
          to="/"
            className="hover:underline"
            onClick={() => {
              setContentType("tv");
            }}
          >
            <div>{t("tvShowsMenu")}</div>
          </NavLink>
          <NavLink to="/SearchHistoryPage/" className="hover:underline">
            History
          </NavLink>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <NavLink to="/SearchPage/">
          <Search />
        </NavLink>
        <NavLink to="/Settings" className="hover:underline">
          <Settings />
        </NavLink>
        <Menu
          className="sm:hidden size-6 cursor-pointer"
          onClick={toggleMobileMenu}
        />
        {user ? (
          <>
            <img
              src={!user ? "/avatar1.png" : user.image}
              alt="avatar"
              className="h-8 rounded cursor-pointer"
            />
            <LogOut onClick={logout} className="size-6 cursor-pointer" />
          </>
        ) : (
          <NavLink to="/Login" className="hover:underline">
            Sign In
          </NavLink>
        )}
      </div>
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <NavLink to="/" className="hover:underline">
            <div>{t("homeMenu")}</div>
          </NavLink>
          <NavLink
            className="hover:underline"
            onClick={() => {
              setContentType("movie");
              setMobileMenu();
            }}
          >
            <div>{t("moviesMenu")}</div>
          </NavLink>
          <NavLink
            className="hover:underline"
            onClick={() => {
              setContentType("tv");
              setMobileMenu();
            }}>
            <div>{t("tvShowsMenu")}</div>
          </NavLink>
          <NavLink to="/SearchHistoryPage/" className="hover:underline">
            History
          </NavLink>
        </div>
      )}
    </header>
  );
};
