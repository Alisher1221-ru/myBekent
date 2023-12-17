function Role(gmail) {
    return function (req, res, next) {
        try {
            const { gmails } = req.body
            if (!gmails) {
                const error = "tel not faund"
                error.status = 401
                throw error
            }
            if (gmails === gmail) {
                next()
                return
            }
            const error = "tel is not faund"
            error.status = 401
            throw error
        } catch (error) {
            res.status(401).json({error: error.message})
        }
    }
}

export default Role
