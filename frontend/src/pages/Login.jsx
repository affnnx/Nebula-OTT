import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, isLoggingIn } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    //sld specify, block element take up full width mostly but only take elements height and not full
    <div>
      <div className="h-screen w-full ">
        <header className="max-w-6xl mx-auto items-center justify-between">
          <NavLink to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="w-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />
          </NavLink>
        </header>
        <div className="flex justify-center items-center mt-20 mx-3">
          <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md">
            <h1 className="text-center text-2xl font-bold ">Login</h1>
            <form action="" className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-500 "
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-full p-2 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring bg-transparent "
                  placeholder="dummy@abc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-500 "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring bg-transparent "
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full bg-violet-600 py-2 rounded-md font-semibold hover:bg-violet-700"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Loading...." : "Login"}
              </button>
            </form>
            <div className="text-center text-gray-600 ">
              Don't have an account?{" "}
              <NavLink
                to={"/SignUp"}
                className="text-violet-600 hover:underline"
              >
                Sign up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
