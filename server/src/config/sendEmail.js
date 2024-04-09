import nodemailer from 'nodemailer';
import Config from './config.js';
const { AUTH_EMAIL, AUTH_PASSWORD } = new Config();
const sendEmail = (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: AUTH_EMAIL,
            pass: AUTH_PASSWORD
        }
    });
    let mailOptions = {
        from: "Budget app",
        to: email,
        subject: "Email confirmation",
        html: `<h4> Press<a href=http://localhost:8080/api/verify/${token}> here </a> to verify your email. Thanks!</h4>`
    };
    transporter.sendMail(mailOptions, (error, response) => {
        if (error) console.log(error)
        else console.log('Message sent');
    });
}
export default sendEmail;
