import { validateToken } from "../modules/JWT.js";

const isAuth = (req, res, next) => {
    const header = req.headers.authorization || req.headers['Authorization'];
    const accessToken = header.split(" ")[1];
    if(!accessToken) return res.status(401).json({message: "User not authorized"});
    const verifyToken = validateToken(accessToken);
    console.log(verifyToken)
    if(!verifyToken.isValid) return res.status(401).json({message: "User not authorized"});
    req.user = verifyToken.decoded;
    next()
}

export default isAuth;