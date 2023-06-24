import Config from '../config/config.js';
const { SECRET_JWT_TOKEN } = new Config();
import jwt from 'jsonwebtoken';



const generateAccessToken  = ({id, email, username}) => {
    try {
        return jwt.sign({id, email, username}, SECRET_JWT_TOKEN , {expiresIn: '60m'});
    } catch (err) {
        console.error(err);
    }
}
const validateToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, SECRET_JWT_TOKEN);
    } catch (err) {
        console.error(err);        
        return undefined;
    }
}

export { 
    generateAccessToken, 
    validateToken
}