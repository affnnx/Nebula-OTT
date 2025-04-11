import express from 'express'
import { isUserAuth, login, logout, signup } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.get("/is-user-auth", protectRoute, isUserAuth)

export default router;

