import express from 'express';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import session from 'express-session';

import passport from 'passport';
import passportConfig from './modules/passport.js';
import registerRoute from './routes/register.route.js';
import loginRoute from './routes/login.router.js';
import amountRoute from './routes/amount.route.js';
import isAuth from './middlewares/isAuth.js'
import Config from './config/config.js';
const { PORT, SESSION_SECRET, MONGO_STORE_URL } = new Config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET, POST",
    credentials: true
}))
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_STORE_URL,
        ttl: 24 * 60 * 60
    }),
    key: "user",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        expires: 24 * 60 * 60 * 1000,
    }
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api/amount", isAuth, amountRoute)
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
