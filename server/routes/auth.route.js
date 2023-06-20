import { Router } from 'express';
import passport from 'passport';
import Config from '../config/config.js';
const { CLIENT_URL } = new Config();

const authRouter = Router();

authRouter.get("/login/success", (req, res) => {
    if(req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user
        })
    } else {
        res.status(401).json({
            error: true,
            message: "Failed to login"
        });
    }
})
.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Failed to login"
    })
})
.get("/google/callback", passport.authenticate("google",{
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))
.get("/google/", passport.authenticate("google",{scope:["profile", "email"]}))
.get("/logout", (req, res) => {
    req.logOut();
    res.redirect(CLIENT_URL + "/login")
})