const express = require("express");
const router = express.Router();
const path = require("path");
const authController = require("../../controller/authController")

router.route("/")
    .post(authController)

module.exports=router;