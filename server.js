const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const cors = require("cors");
// const EventEmitter = require("events");
const PORT = process.env.PORT || 3000;
const verifyJWT = require("./middleware/verifyJWT")
const cookieParser = require("cookie-parser");
const {logEvents,logger} = require("./middleware/logEvents");
const mongoose = require("mongoose")
const errorHandler =require("./middleware/errorHandler");
const connectDb = require("./config/dbCon");

//connect to database
connectDb()

//custom middleware
app.use(logger)

// cross origin resource sharing initilization

const whiteList = ["https://www.yoursite.com","http://localhost:3000/"]
const corsOptions = {
    origin: (origin,callback)=>{
        if(whiteList.indexOf(origin)!==-1 || !origin){
            callback(null,true);
        }
        else{
            callback(new Error("not allowed by CORS"))

        }
    },
    optionsSuccessStatus:200
}
app.use(cors(corsOptions))

//built-in middle-ware
app.use(express.urlencoded({extended:false}))
//serve static files like css,text
app.use("/",express.static(path.join(__dirname,"/public")))
app.use("/subdir",express.static(path.join(__dirname,"/public")))
//serve json file
app.use(express.json())
//middleware for cookies
app.use(cookieParser())

//routes
app.use("/",require("./routes/root"))
app.use("/subdir",require("./routes/subdir"));
app.use("/register",require("./routes/api/register"));
app.use("/auth",require("./routes/api/auth"));
app.use("/refresh",require("./routes/api/refresh"));
app.use("/logout",require("./routes/api/logout"));
app.use(verifyJWT);
app.use("/employee",require("./routes/api/employee"));

//404 page routing
app.all("*",(req,res)=>{
    res.status(404);
    if(req.accepts(".html")){
        res.sendFile(path.join(__dirname,"pages","404.html"));
    }
    else if(req.accepts("json")){
        res.json({error:"404 not found"})
    }
    else{
        res.type("txt").send("404 not found")
    }
})


//middleware  error handler

app.use(errorHandler)

//connection event 
mongoose.connection.once("open",()=>{
    console.log("connected to mongoDB");
    //listner
    app.listen(PORT,()=>{console.log(`server running on http://localhost:${PORT}`)})

})