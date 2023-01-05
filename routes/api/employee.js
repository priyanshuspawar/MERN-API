const express = require("express")
const router = express.Router();
const employeeController =require("../../controller/employeeController")
const ROLE_LIST = require("../../config/role_list");
const verifyRoles = require("../../middleware/verifyRoles");




router.route("/")
    .get(employeeController.getAllEmployee)
    .post(verifyRoles(ROLE_LIST.Admin,ROLE_LIST.Editor),employeeController.createNewEmployee)
    .put(verifyRoles(ROLE_LIST.Admin,ROLE_LIST.Editor),employeeController.updateEmployee)
    .delete(verifyRoles(ROLE_LIST.Admin),employeeController.deleteEmployee)


router.route("/:id")
    .get(verifyRoles(ROLE_LIST.Admin),employeeController.getEmployee)

module.exports=router;
