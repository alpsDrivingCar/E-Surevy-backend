const checkEmailServer = require('../../../Controller/settings/sendEmailController')
const express = require("express");
const router = express.Router();

router.post("/",checkEmailServer.sendEmailForChechEmailValid)

module.exports = router


