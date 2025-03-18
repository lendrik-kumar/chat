import { Router } from "express"
import { signUp, login, getUserInfo, updateProfile } from "../controllers/authController.js"
import verifyToken from "../middlewares/authMiddleware.js"

const authRoutes = Router()

authRoutes.post('/signup', signUp)
authRoutes.post('/login', login)
authRoutes.get('/userinfo',verifyToken, getUserInfo)
authRoutes.post('/update-profile', verifyToken, updateProfile)

export default authRoutes