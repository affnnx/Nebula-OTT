import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

export default function SignUp () {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup, user, isSigningUp } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ email, username, password });
  };

  return (
    //sld specify, block element take up full width mostly but only take elements height and not full
    <div>
      <div className="h-screen w-full ">
        <header className="max-w-6xl mx-auto items-center justify-between">
          <NavLink to="/">
            <img src="/logo.png" alt="logo" className="w-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
          </NavLink>
        </header>
        <div className="flex justify-center items-center mt-20 mx-3">
          <div className="w-full max-w-md p-8 space-y-6  rounded-lg shadow-md">
            <h1 className="text-center text-2xl font-bold ">SignUp</h1>
            <form action="" className="space-y-4" onSubmit={handleSignUp}>
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
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-500 "
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent  focus:outline-none focus:ring"
                  placeholder="dummyName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>{" "}
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
                disabled={isSigningUp}
              >
                {isSigningUp ? "Loading...." : "Sign Up"}
              </button>
            </form>
            <div className="text-center text-gray-600 ">
              Already a member?{" "}
              <NavLink to={"/Login"} className="text-violet-600 hover:underline">
                Sign in
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
