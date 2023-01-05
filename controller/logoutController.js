const Users = require("../public/data/Users")

const handlerLogout =async  (req,res)=>{
    //on client also delete the access token

    const cookies = req.cookies;
    
    if(!cookies?.jwt){
        return(
        res.sendStatus(204) //success- no content
        )
    }
    
    const RefreshToken = cookies.jwt;
    // checking refresh token in db
    const foundUser = await Users.findOne({RefreshToken:RefreshToken}).exec();
    if(!foundUser){
        res.clearCookie("jwt",{httpOnly:true})
        return res.sendStatus(204)
    }
    //deleting refresh token in db
    foundUser.RefreshToken=""
    const result = await foundUser.save(); 

    res.clearCookie("jwt",{httpOnly:true}) //secure - true : only serves to https in production do that
    res.sendStatus(204);

}

module.exports={handlerLogout};