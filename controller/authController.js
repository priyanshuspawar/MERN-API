const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt");
const Users = require("../public/data/Users");



const handlerUserLogin = async (req,res)=>{
    const {user,pwd} = req.body;
    if(!user || !pwd){
        return(
        res.status(400).json({"message":"user and password is required"})
        )
    }
    
    const foundUser = await Users.findOne({user:user}).exec();
    if(!foundUser) return(res.sendStatus(401)) //unauthorized
    const roles = Object.values(foundUser.roles)
    //checking password match
    const match = bcrypt.compare(pwd,foundUser.pwd);
    if(match){
        //jwt
        const accessToken = jwt.sign(
            {
                userInfo:{
                    user:user,
                    roles:roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"500s"}
        );
        const RefreshToken = jwt.sign(
            {"user":foundUser.user},
            process.env.REQUEST_TOKEN_SECRET,
            {expiresIn:"1d"}
        );
        foundUser.RefreshToken=RefreshToken;
        const result = await foundUser.save();
        res.cookie("jwt",RefreshToken,{httponly:true,maxAge:24*60*60*1000})
        res.json({accessToken})
    }
    else{
        res.sendStatus(401)
    }
}

module.exports=handlerUserLogin;