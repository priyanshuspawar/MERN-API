const express = require("express");
const router = express.Router();
const path = require("path");
const logoutController = require("../../controller/logoutController");

router.route("/")
    .get(logoutController.handlerLogout)

module.exports=router;