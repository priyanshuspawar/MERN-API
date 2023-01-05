const {logEvents} = require("../middleware/logEvents")
const errorHandler = (err,req,res,next)=>{
    logEvents(`${err.name}\t${err.message}`,"errLogs.txt")
    console.log(err.stack)
    res.status(500).send(err.message);
}

module.exports=errorHandler;