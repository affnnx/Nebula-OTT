import { useState, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { Suspense, lazy } from "react";
const Settings = lazy(() => import("./pages/Settings"));
import Loader from "./components/loader/Loader";
import { ThemeProvider } from "./context/themeContext";
import Player from "./pages/Player";
import ThemeSetting from "./components/settingsComponent/themeSetting";
import LanguageSetting from "./components/settingsComponent/languageSetting";
import ThreeScene from "./components/loader/ThreeScene";
import JsonProvider from "./context/jsonContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {Toaster} from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { Loader as LucidLoader } from "lucide-react";
import AssetDetails from "./pages/AssetDetails";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistory";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  const [isLoading, setLoading] = useState(true);
  const {user, isCheckingAuth, isUserAuth} = useAuthStore()

  useEffect(() => {
    const preLoader = () => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    preLoader();
  }, []);

    useEffect(() => {
      isUserAuth()
  }, [isUserAuth]);

  if(isCheckingAuth){
    return(
      <div className="h-screen">
        <div className="flex justify-center items-center  h-full">
          <LucidLoader className = "animate-spin text-violet-400 size-10"/>
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <Home />
      ),
    },
    {
      path: "/Settings",
      element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Settings />
          </Suspense>
      ),
      children: [
        {
          index: true,
          element: <ThemeSetting />,
        },
        {
          path: "component/settings/themeSetting",
          element: <ThemeSetting />,
        },
        {
          path: "component/settings/languageSetting",
          element: <LanguageSetting />,
        },
      ],
    },
    {
      path: "/Player",
      element: (
        user ? <Player /> : <Navigate to={"/Login"} />
      ),
    },
    {
      path: "/AssetDetails/:id",
      element: (
        user ? <AssetDetails /> : <Navigate to={"/Login"} />
      ),
    },
    {
      path: "/SearchPage/",
      element: (
        user ? <SearchPage /> : <Navigate to={"/Login"} />
      ),
    },
    {
      path: "/SearchHistoryPage/",
      element: (
        user ? <SearchHistoryPage /> : <Navigate to={"/Login"} />
      ),
    },
    {
      path: "/SignUp",
      element: (!user ? <SignUp /> : <Navigate to={"/"}/>),
    },
    {
      path: "/Login",
      element: (!user ? <Login /> : <Navigate to={"/"}/>),
    },
    {
      path: "/*",
      element: (<NotFoundPage/>),
    },
  ]);
  return isLoading ? (
    <Loader />
  ) : (
    <>
    <JsonProvider>
      <ThemeProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </ThemeProvider>
    </JsonProvider>
    <Toaster/>
    <Toaster></Toaster>
    </>
  );
}

export default App;
