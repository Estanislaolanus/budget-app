import { Router } from "express";
import { isValidPassword } from '../modules/bcrypt.js'
import User from '../dao/User.dao.js';
import { generateAccessToken, validateToken } from "../modules/JWT.js";
const user = new User();
const router = Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await user.getUserByEmail(email);

        if(!findUser) return res.status(401).json({success: false, message: "User does not exist"});
        const isValid = await isValidPassword(password, findUser.password);

        if(!isValid) return res.status(401).json({success: false, message: "Incorrect password"});

        const tokenData = {id: findUser._id, email, username: findUser.username};
        req.session.user = tokenData;
        const accessToken = generateAccessToken(tokenData);
        console.log("POST LOGIN", findUser, "SESSION", req.session.user)
        res.status(200).json({success: true, accessToken, message: "User logged in"});
    } catch (err) {
        console.error(err);
    }
})
.get("/login", (req, res) => {
    const header = req.headers.authorization || req.headers['Authorization'];
    const accessToken = header.split(" ")[1];
    const verifyToken = validateToken(accessToken);
    if(!verifyToken) return res.status(200).json({
        loggedIn: false
    });
    req.userId = verifyToken.id
    res.status(200).json({
        loggedIn: true,
        user: {
            username: verifyToken.username, 
            email: verifyToken.email
        }
    })
})
.get("/logout", (req, res) => {
    
});

export default router;