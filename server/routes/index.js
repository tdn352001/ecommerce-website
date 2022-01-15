const userRoute = require('./userRouter')
const categoryRoute = require('./categoryRouter')

const route = (app) => {
    app.use('/user', userRoute)
    app.use('/api', categoryRoute)
}

module.exports = route