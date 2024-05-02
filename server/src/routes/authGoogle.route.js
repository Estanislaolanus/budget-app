import { Router } from "express";
import passportGoogle from '../modules/googlePassport.js'
import Config from '../config/config.js';
import { generateAccessToken } from '../modules/JWT.js'
import User from '../dao/User.dao.js';
const { CLIENT_URL } = new Config()

const user = new User();
const router = Router();

router.get('/',
    passportGoogle.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/callback',
    passportGoogle.authenticate('google', { failureRedirect: '/login', session: false }),
    async (req, res) => {
        const { id, name, emails } = req.user;
        const email = emails[0].value;
        const username = name.givenName;
        const findUser = await user.getUserByGoogleId(id);
        const findUserByEmail = await user.getUserByEmail(email);
        if (!findUser || !findUserByEmail) {
            const newUserData = {
                email,
                username,
                verified: true,
                password: 'undefined',
                googleId: id
            }
            const newUser = await user.save(newUserData);
            const accessToken = generateAccessToken({ id: newUser._id, username, email, isEmailVerified: true });
            return res.redirect(CLIENT_URL + `?access_token=${accessToken}`);
        }
        const accessToken = generateAccessToken({ id: findUser._id, username, email, isEmailVerified: true });
        res.redirect(CLIENT_URL + `?access_token=${accessToken}`);
    }
);

export default router;
