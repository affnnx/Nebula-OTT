import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

//We have created this hook to maintain a global state and access these functions from anywhere

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn : false,
  isLoggingOut : false,
  isCheckingAuth: true,
  signup: async (credentials) => {
    try {
      set({ isSigningUp: true });
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({
        user: response.data.user,
        isSigningUp: false,
      });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({
        user: null,
        isSigningUp: false,
      });
    }
  },
  login: async (credentials) => {try {
    set({ isLoggingin: true });
    const response = await axios.post("/api/v1/auth/login", credentials);
    set({
      user: response.data.user,
      isLoggingin: false,
    });
    toast.success("User Logged in successfully");
  } catch (error) {
    toast.error(error.response.data.message || "An error occured");
    set({
      user: null,
      isLoggingin: false,
    });
  }},
  logout: async () => {
    try {
        set({
            isLoggingin: true,
          });
        const response = await axios.post("/api/v1/auth/logout");
        set({
            user: null,
            isLoggingin: false,
          });
          toast.success("User Logged out successfully");

    } catch (error) {
        set({
            isLoggingin: false,
          });
        toast.error(error.response.data.message || "An error occured");

    }
  },
  isUserAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await axios.get("/api/v1/auth/is-user-auth");
      set({
        user: response.data.user,
        isCheckingAuth: false,
      });
    } catch (error) {
        console.log("error :", error)
      set({ isCheckingAuth: false, user : null });
    }
  },
}));
