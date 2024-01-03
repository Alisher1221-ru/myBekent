import pkg from 'jsonwebtoken';

async function RoleGuart(req, res, next) {
    try {
        if (req.role === 'admin') {
            next()
            return
        }
        const error = new Error("error you not admin")
        error.status = 402
        throw error
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

export default RoleGuart
