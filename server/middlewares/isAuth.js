import { validateToken } from "../modules/JWT.js";

const isAuth = (req, res, next) => {
    const header = req.headers.authorization || req.headers['Authorization'];
    const accessToken = header.split(" ")[1];
    if(!accessToken) return res.status(401).json({message: "User not authorized"});
    const verifyToken = validateToken(accessToken);
    if(!verifyToken) return res.status(401).json({message: "User not authorized"});
    req.user = verifyToken;
    next()
}

export default isAuth;