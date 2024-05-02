import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import registerRoute from './routes/register.route.js';
import loginRoute from './routes/login.router.js';
import expenseRoute from './routes/expense.route.js'
import incomeRoute from './routes/income.route.js'
import verifyEmailRoute from './routes/verifyEmail.route.js';
import authGoogleRoute from './routes/authGoogle.route.js'
import isAuth from './middlewares/isAuth.js';
import googlePassport from './modules/googlePassport.js';
import Config from './config/config.js';
const { PORT, CLIENT_URL } = new Config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: CLIENT_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(googlePassport.initialize());

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api/expense", isAuth, expenseRoute);
app.use("/api/income", isAuth, incomeRoute);
app.use("/api/verify", verifyEmailRoute);
app.use('/api/auth/google', authGoogleRoute);
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
