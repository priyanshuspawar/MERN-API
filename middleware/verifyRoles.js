const verifyRoles = (...allowedRoles)=>{
    return(req,res,next)=>{
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles]
        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles.map(Element=>rolesArray.includes(Element)).find(value=>value===true);
        if(!result) return res.sendStatus(401);
        next();
    }
}

module.exports=verifyRoles;