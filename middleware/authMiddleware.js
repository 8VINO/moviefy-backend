import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.js';

export default function authenticate(req,res,next){
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({error: 'Token not provided'});
    }
    try{
        jwt.verify(token,jwtConfig.secret);
        next();
    } catch{
        return res.status(401).json({erro: 'Invalid token'})
    }
}