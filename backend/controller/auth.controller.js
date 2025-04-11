import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokens.js";

export async function signup(req, res) {
  //These are called controller function

  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email is not in the correct format",
        });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be atleast 6 character long",
        });
    }

    const isEmailExisting = await User.findOne({ email: email });

    if (isEmailExisting) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const isUsernameExisting = await User.findOne({ username: username });

    if (isUsernameExisting) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    //To Hash passwords stored at DB
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newuser = new User({
      email: email,
      username: username,
      password: hashedPassword,
      image : image,
    });

    generateTokenAndSetCookie(newuser._id, res)     //Each document in MONGODB collections gets a unique ID
    await newuser.save();                           //Even though the IDs is same for each creds, it token will always be different because of TS and expiry

    // Remove password from the response
    res.status(201).json({success : true, user : {
      //In Mongoose, when you retrieve a document, it has additional properties like __v (version key) and instance methods.
      //newuser._doc ensures only the pure document data is sent in the response.
      ...newuser._doc,
      password : ""
    }})

  } catch (error) {
    console.log("Error in signup controller" + error)
    res.status(500).json({success : false, message : "Internal server error"})
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-nebula")
    res.status(201).json({success : true, message : "User Logged out successfully"})
  } catch (error) {
    console.log("Error in Logoutx  controller" + error)
    res.status(500).json({success : false, message : "Internal server error"})  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({email : email});

    if(!user){
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password)

    if(!isPasswordCorrect){
      return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res)
    res.status(200).json({success : true, user : {
      ...user._doc,
      password : ""
    }})
  
  } catch (error) {
    console.log("Error in Logoutx  controller" + error)
    res.status(500).json({success : false, message : "Internal server error"})
  }
}

export async function isUserAuth(req, res){
  try {
    console.log("req.user" + req.user)
    res.status(200).json({success : true, user : req.user})
  } catch (error) {
    console.log("Error in isUserAuth check" + error)
    res.status(500).json({success : false, message : "Internal server error"})
  }
}
