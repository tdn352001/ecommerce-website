const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users } = require('../models')
const Validations = require('../validations')


const createAccessToken = (user) => {
    return jwt.sign(user, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1d' })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '7d' })
}


class UserController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body


            // Validate Email
            if (!Validations.validateEmail(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'The Email is invalid'
                })
            }

            // Check Email exists
            const user = await Users.findOne({ email })
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'The email already exists.'
                })
            }

            // Check password length
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Password is at least 6 characters.'
                })
            }

            // hash password
            const passwordHash = await bcrypt.hash(password, 10)

            // create new User
            const newUser = new Users({ name, email, password: passwordHash })

            // save new user
            await newUser.save()

            // Create jsonwebtoken to authentication
            const acessToken = createAccessToken({ id: newUser._id })

            // create refresh toke 
            const refreshToken = createRefreshToken({ id: newUser._id })

            // include refresh token to response
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
            })

            // respont client
            res.status(200).json({
                success: true,
                message: 'Register Successfully',
                acessToken,
            })


        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async refreshToken(req, res) {

        // GET refresh Token from request
        const refreshToken = req.cookies.refreshToken
        try {

            // check if refresh token exists
            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Please Login before.'
                })
            }

            // check if refresh token is valid
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {

                // Invalid
                if (error) {
                    return res.status(400).json({
                        success: false,
                        message: 'Please Login before.'
                    })
                }

                // Valid
                const accessToken = createAccessToken({ id: user.id })
                res.status(200).json({
                    success: true,
                    accessToken
                })
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body


            //Check user exists
            const user = await Users.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Username or password incorrect.",
                })
            }

            // Check password match
            const isMatch = await bcrypt.compare(password, user.password)

            // Incorrect password
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Username or password incorrect.",
                })
            }

            // Login success

            // Create jsonwebtoken to authentication
            const acessToken = createAccessToken({ id: user._id })

            // create refresh token 
            const refreshToken = createRefreshToken({ id: user._id })

            // include refresh token to response
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
            })

            // respont client
            res.status(200).json({
                success: true,
                message: 'Login Successfully',
                acessToken,
            })



        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('refreshToken', { path: '/user/refresh_token' })
            res.json({
                success: true,
                message: 'Logged out'
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    async getUser(req, res) {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User does not exists"
                })
            }
            res.status(200).json({
                success: true,
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}




module.exports = new UserController