import Config from '../config/config.js';
const { SECRET_JWT_TOKEN } = new Config();
import jwt from 'jsonwebtoken';

const generateAccessToken = ({ id, email, username, isEmailVerified }) => {
    try {
        return jwt.sign({ id, email, username, isEmailVerified }, SECRET_JWT_TOKEN, { expiresIn: '24h' });
    } catch (err) {
        console.error("Error in generating new token", err);
    }
}
const validateToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, SECRET_JWT_TOKEN);
    } catch (err) {
        console.error("Error in jwt validation", err);
        return undefined;
    }
}

export {
    generateAccessToken,
    validateToken
}