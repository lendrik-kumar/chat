import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (email,userId) => {
    return jwt.sign({email, userId}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

export const signUp = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body

        if (!email || !password ){
            return res.status(400).send("Email and password are required")
        }

        const user = await User.create({email, password})

        res.cookie('jwt', createToken(user.email, user._id), {
            maxAge,
            secure : true,
            sameSite: "None"
        })
        return res.status(201).json({
            user:{
            email: user.email,
            profileSetup: user.profileSetup
        }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
        
    }
}