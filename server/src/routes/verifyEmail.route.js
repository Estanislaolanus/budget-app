import { Router } from "express";
import User from "../dao/User.dao.js";
import Config from "../config/config.js";
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
});

export default router;