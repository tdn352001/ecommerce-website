require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const route = require('./routes')

const app = express()
const path = require('path')

// đọc được url encode
app.use(express.urlencoded({
    extended: true
}))


// đọc được json
app.use(express.json())

// chưa rõ
app.use(cookieParser())

// cho fe lấy api
app.use(cors())

// chưa rõ
app.use(fileUpload({
    useTempFiles: true,
}))


//connect DB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        throw err
    }
    console.log("CONNECT TO DB SUCCESSFULLY!!!")
})

//route
route(app)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
    })
}


// start
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Server is running on port', port);
})
