require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogs')

// express app
const app = express()

// middleware 
app.use(express.json()) // Looks for data sent to server and attaches to req object

app.use((req, res, next) => { // logs out requests in terminal
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/blogs', blogRoutes)

// connect to database
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



/* NOTES 
    - "node server.js" to run server
    - "npm run dev" re-runs the server when change is detected (dev - nodemon server.js)
    - Environment variables are used to store app secrets and configuration data
*/
