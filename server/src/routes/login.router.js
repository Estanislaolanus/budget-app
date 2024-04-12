import { Router } from "express";
import { isValidPassword } from '../modules/bcrypt.js';
import { generateAccessToken, validateToken } from "../modules/JWT.js";
import User from '../dao/User.dao.js';
const user = new User();
const router = Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ success: false, message: 'Some fields are missing' })
        };
        const findUser = await user.getUserByEmail(email);

        if (!findUser) return res.status(401).json({ success: false, message: "User does not exist" });
        const isValid = await isValidPassword(password, findUser.password);

        if (!isValid) return res.status(401).json({ success: false, message: "Incorrect password" });
        const tokenData = { id: findUser._id, email, username: findUser.username, isEmailVerified: findUser.verified };
        const accessToken = generateAccessToken(tokenData);

        res.status(200).json({
            success: true,
            message: "User logged in",
            accessToken,
            user: {
                username: findUser.username,
                email: email,
                isEmailVerified: findUser.verified
            }
        });
    } catch (err) {
        console.error(err);
    }
})
    .get("/login", async (req, res) => {
        const header = req.headers.authorization || req.headers['Authorization'];
        const accessToken = header.split(" ")[1];
        const verifyToken = validateToken(accessToken);
        if (!verifyToken) return res.status(401).json({
            loggedIn: false
        });
        const findUser = await user.getById(verifyToken.id);
        if (!findUser) return res.status(401).json({
            loggedIn: false
        });
        res.status(200).json({
            loggedIn: true,
            user: {
                username: verifyToken.username,
                email: verifyToken.email,
                isEmailVerified: findUser.verified
            }
        })
    })


export default router;