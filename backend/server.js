require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


const app = express()

const codeRoute = require('./routes/codeRoute')
const connection = require('./config/db')

app.use(cors());

//middleware
app.use(express.json())
app.use(morgan('dev'))



//routes

app.use('/api/entry',codeRoute)

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to TUF</h1>")
})

//connect to db
connection.query('SELECT 1')
.then(()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{
        console.log(`connected to db&listening on port ${process.env.PORT}`)
    })

})
.catch((err)=>{
    console.log(`${err}`)
})
