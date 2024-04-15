import passport from 'passport'
import { Strategy } from 'passport-google-oauth20';
import Config from "../config/config.js";
const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } = new Config();

passport.use(new Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, (accessToken, regreshToken, profile, done) => {
    done(null, profile)
}
));

export default passport;