const Users = require("../public/data/Users")
const jwt = require("jsonwebtoken")



const handlerRefreshToken =async  (req,res)=>{
    const cookies = req.cookies;
    
    if(!cookies?.jwt){
        return(
        res.sendStatus(401) //unauthorized
        )
    }
    
    const RefreshToken = cookies.jwt;
    const foundUser = await Users.findOne({RefreshToken:RefreshToken}).exec();
    if(!foundUser) return res.sendStatus(403);
    const roles = Object.values(foundUser.roles)
    //evalute jwt
    jwt.verify(
        RefreshToken,
        process.env.REQUEST_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || decoded.user!==foundUser.user){
                return res.sendStatus(403);
            }
            const accessToken = jwt.sign(
                {
                    userInfo:{
                        user:foundUser.user,
                        roles:roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"600s"}
            )
            res.json({accessToken})
        }
    )
}

module.exports={handlerRefreshToken};