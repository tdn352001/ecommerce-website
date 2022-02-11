const userRoute = require('./userRouter')
const categoryRoute = require('./categoryRouter')
const uploadRoute = require('./uploadRouter')
const productRoute = require('./productRouter')
const paymentRoute = require('./paymentRouter')

const route = (app) => {
    app.use('/user', userRoute)
    app.use('/api', categoryRoute)
    app.use('/api', uploadRoute)
    app.use('/api', productRoute)
    app.use('/api', paymentRoute)

}



module.exports = route