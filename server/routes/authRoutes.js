import { Router } from "express"
import { signUp, login, getUserInfo } from "../controllers/authController.js"
import verifyToken from "../middlewares/authMiddleware.js"

const authRoutes = Router()

authRoutes.post('/signup', signUp)
authRoutes.post('/login', login)
authRoutes.get('/userinfo',verifyToken, getUserInfo)

export default authRoutes