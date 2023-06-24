import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import Config from '../config/config.js';
import User from '../dao/User.dao.js';
const user = new User();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = new Config();
const passportConfig = () => {
    passport.use(new Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const defaultUser = {
                    username: profile.name.givenName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                }
                console.log(defaultUser);
                const findUser = await user.getUserByEmail(defaultUser.email);
                if (findUser) return;

                return done(null, profile)
            } catch (err) {
                console.error(`Passport error: ${err}`);
                done(err, null);
            }
        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}
export default passportConfig