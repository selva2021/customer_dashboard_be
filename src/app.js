require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3012
mongoose.connect(process.env.mongodb_uri,{useNewUrlParser:true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',()=>console.error('Unable to connect to database'))
db.on('open',()=>console.log('Successfully connected to Database'))

const userRoutes = require('./routes/user')
app.use('/user',userRoutes)

const customerRoutes = require('./routes/customers')
app.use('/customer',customerRoutes)

app.get('/',(req,res)=>{
    res.json({
        status:200,
        message:'Welcome to customer dashboard backend system',
        envVars:process.env
    })
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})

