const adminServer = require('../../Controller/user/admin')
const express = require("express");
const router = express.Router();

router.post("/login",adminServer.loginAdmin)
router.post("/register",adminServer.registerAdmin)
router.delete("/:id",adminServer.deleteAdmin)
router.put("/",adminServer.adminUpdate)

module.exports = router


