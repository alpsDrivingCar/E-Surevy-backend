const checkEmailServer = require('../../../Controller/settings/sendEmail')
const express = require("express");
const router = express.Router();

router.post("/",checkEmailServer.sendEmailForChechEmailValid)

module.exports = router


