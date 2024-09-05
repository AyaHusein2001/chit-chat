const express=require("express")
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
//import router
const router = require('./routes/index')
const cookiesParser = require("cookie-parser")

const app = express()
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credential: true
    })
)

app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8880

app.get('/',(request,response)=>{
    response.json({
        messaage: "Server runing at "+PORT
    })
}
)

//api endpoints
app.use('/api',router)



connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server runing at "+PORT)
    })
})
