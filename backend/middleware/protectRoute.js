import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-nebula"]; //accessing the token stored in cookie

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorize : token not provided" });
    }

    const decodedToken = jwt.verify(token, ENV_VARS.JWT_SECRET);

    if (!decodedToken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorize : Invalid token" });
    }

    const user = await User.findById(decodedToken.userId).select("-password"); //To access the doc without password
    
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in ProtectRoute Middleware : " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
