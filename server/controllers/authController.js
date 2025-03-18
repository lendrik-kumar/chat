import { compare } from 'bcrypt'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { request } from 'express'

const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (email,userId) => {
    return jwt.sign({email, userId}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

export const signUp = async (req, res) => {
    try {
        const { email, password} = req.body

        if (!email || !password ){
            return res.status(400).send("Email and password are required")
        }

        const user = await User.create({email, password})

        res.cookie('jwt', createToken(email, user._id), {
            maxAge,
            secure : true,
            sameSite: "None"
        })
        return res.status(201).json({
            user:{
            id: user._id,
            email: user.email,
            profileSetup: user.profileSetup
        }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
        
    }
}

export const login = async (req, res) => {
    try {
        const { email, password} = req.body

        if (!email || !password ){
            return res.status(400).send("Email and password are required")
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).send("User not found")
        }

        const auth = compare(password, user.password)

        if(!auth){
            return res.status(401).send("Invalid credentials")
        }

        res.cookie('jwt', createToken(email, user._id), {
            maxAge,
            secure : true,
            sameSite: "None"
        })
        return res.status(200).json({
            user:{
            id: user._id,
            email: user.email,
            profileSetup: user.profileSetup,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            color: user.color
        }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
        
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).send("User not found")
        }
        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId 
        const { firstName, lastName, color } = req.body

        if (!firstName && !lastName && !color) {
            return res.status(400).send("At least one field (firstName, lastName, or color) is required")
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, color, profileSetup: true },
            { new: true, runValidators: true }
        )

        if (!user) {
            return res.status(404).send("User not found")
        }

        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            }
        })
    } catch (error) {
        console.error("Error updating profile:", error)
        return res.status(500).send("Internal server error")
    }
}