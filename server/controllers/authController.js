
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();


// Registration  ....................

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Enter the Details ...",
                success: false
            })
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingemail = await User.findOne({ email: normalizedEmail })

        if (existingemail) {
            return res.status(400).json(
                {
                    message: "Email Already Esists ... ",
                    success: false
                }
            )
        }


        // hashing password 

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword

        })


        // 
        return res.status(201).json({
            message: "Registration Successfull ....",
            success: true,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })





    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });

    }
}




////// Login ........................

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Enter the Email Or Password ....",
                success: false
            })
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail })

        if (!existingUser) {
            return res.status(401).json({
                message: "User Not Exist .... ",
                success: false
            })
        }


        // Password Matching 

        const matchPassword = await bcrypt.compare(password, existingUser.password)

        if (!matchPassword) {
            return res.status(401).json({
                message: "Enter the Valid Email Or Password ....",
                success: false
            })
        }


        // Token Creation is Here .......................

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })


        return res.status(200).json({
            message: "login Successfully ",
            success: true,
            token: token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}