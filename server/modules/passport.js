import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import Config from './config/config.js';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = new Config();
const passportConfig = () => {
    passport.use(new Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http:/localhost:8080/auth/google/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile)
            done(null, profile)
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