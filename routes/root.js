const express = require("express")
const router = express.Router();
const path = require("path")

router.get("^/$|/index(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","pages","index.html"))
})

router.get("/new-page(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","pages","new-page.html"))
})

router.get("/old-page(.html)?",(req,res)=>{   //deleted page is old page here
    res.redirect(302,"/new-page.html")   //redirecting to new page and changing to custom status code 302 default is 301
})





module.exports = router;