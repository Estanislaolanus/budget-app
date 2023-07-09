import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import registerRoute from './routes/register.route.js';
import loginRoute from './routes/login.router.js';
import amountRoute from './routes/amount.route.js';
import isAuth from './middlewares/isAuth.js'
import Config from './config/config.js';
const { PORT } = new Config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET, POST, DELETE",
    credentials: true
}))

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api/amount", isAuth, amountRoute)
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
