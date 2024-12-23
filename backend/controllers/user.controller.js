import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        console.log("userdata:", req.body)
        const file = req.file;
        console.log("photo:", req.file)
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Something is Missing !!",
                success: false
            })
        }
        if (!req.file) {
            return res.status(400).json({ message: "Profile photo is required" });
        }

        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        console.log("cloudResponse:", cloudResponse);

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "Email is already Registered !!",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            password: hashedPassword,
            profilePhoto: cloudResponse.secure_url
        })

        return res.status(201).json({
            message: "Congratulations, Account created successfully !!",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email or Password missing !!",
                success: true
            })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password !!",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password !!",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }
        console.log(tokenData)
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, samesite: 'strict' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User Logged out Successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}