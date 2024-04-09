import { Router } from "express";
import { hashPassword } from '../modules/bcrypt.js';
import { generateAccessToken } from "../modules/JWT.js";
import { v4 } from "uuid";
import sendEmail from "../config/sendEmail.js";
import Amount from '../dao/Amount.dao.js';
import User from '../dao/User.dao.js';
const amount = new Amount();
const user = new User();
const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({ success: false, message: 'Some fields are missing' })
        }
        const findUser = await user.getUserByEmail(email);
        if (findUser) {
            res.status(409).json({ success: false, message: "User already exist" });
            return;
        }
        const hashedPassword = await hashPassword(password, 10);
        const userToken = v4();
        const userData = {
            username,
            email,
            password: hashedPassword,
            verified: false,
            token: userToken
        }
        const newUser = await user.save(userData);
        await amount.save({ amountArray: [], userId: newUser._id });
        sendEmail(email, userToken);
        const tokenData = { id: newUser._id, email, username };
        const accessToken = generateAccessToken(tokenData);
        res.status(200).json({ success: true, message: 'User registered. Please verify your Email', username, accessToken });
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: "Server error" })
    }
})
export default router;