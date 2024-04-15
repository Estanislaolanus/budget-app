import { Router } from "express";
import User from "../dao/User.dao.js";
import Config from "../config/config.js";
import sendEmail from "../modules/sendEmail.js";
import { v4 } from "uuid";
const { CLIENT_URL } = new Config();
const router = Router();
const user = new User();

router.get('/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const findUser = await user.getUserByToken(token);
        if (!user) {
            return res.status(404).json({ message: 'Invalid verification token.' });
        }
        findUser.verified = true;
        findUser.token = "";
        await user.update(findUser._id, findUser);
        res.redirect(CLIENT_URL);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error verifying token.' });
    }
})
    .post("/sendNewToken", async (req, res) => {
        const { email } = req.body;
        if (!email) res.status(401).json({ message: "Email required", success: false });
        const findUser = await user.getUserByEmail(email);
        if (!findUser) res.status(401).json({ message: "User does not exists", success: false });
        const newToken = v4();
        findUser.token = newToken;
        await user.update(findUser._id, findUser);
        sendEmail(email, newToken);
        res.json({ message: "New confirmation email sent", success: true })

    })
    ;

export default router;