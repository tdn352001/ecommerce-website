const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        // GET TOKEN FROM HEADERS
        const token = req.header('Authorization')

        // IF DOES NOT EXIST TOKEN
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Authentication'
            })
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Authentication'
                })
            }

            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = auth