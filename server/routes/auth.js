import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal server error" });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, "mein_tu_papa_hunn_papa@111", { expiresIn: '1h' });

        res.status(200).json({ success: true, message: "Login successful", token , user: {name: user.name} });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router