import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

function authMiddleware(req, res, next){

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "No token provided"
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId
        next();
    }
    catch(e){
        console.log(e.message);
        res.status(400).json({
            message: "Interval Server Error"
        })
    }
}

export default authMiddleware
