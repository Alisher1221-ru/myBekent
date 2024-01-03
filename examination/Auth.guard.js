import pkg from 'jsonwebtoken';
const { verify } = pkg;
import env from '../config/env.config.js';

async function authGuard(req, res, next) {
    try {
        const access_token = req.headers.authorization.split(" ")[1]
        const {id, role} = verify(access_token, env.ACCESS_TOKEN)
        req.id = id
        req.role = role
        next()
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

export default authGuard
