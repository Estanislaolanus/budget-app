import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import passportConfig from './modules/passport.js'
import authRouter from './routes/auth.route.js'
import Config from './config/config.js';
const { PORT, COOKIE_KEY } = new Config();
const app = express();

app.use(cookieSession({
    name: "session",
    keys: [COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}))
passportConfig();

app.use("/auth", authRouter);
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));