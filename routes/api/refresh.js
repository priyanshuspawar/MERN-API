const express = require("express");
const router = express.Router();
const path = require("path");
const refreshTokenController = require("../../controller/refreshTokenController");

router.route("/")
    .get(refreshTokenController.handlerRefreshToken)

module.exports=router;