const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyJWT = (req,res,next)=>{
    const authHeader =  req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401)
    console.log(authHeader)  //Bearer token
    const token = authHeader.split(" ") [1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err){
                return res.sendStatus(409);
            }
            req.user = decoded.userInfo.user;
            req.roles = decoded.userInfo.roles;
        }
    )
    next();
}

module.exports=verifyJWT