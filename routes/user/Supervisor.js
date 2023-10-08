const supervisorServer = require('../../Controller/user/supervisor')
const express = require("express");
const router = express.Router();

router.post("/login",supervisorServer.loginSupervisor)
router.post("/register",supervisorServer.registerSupervisor)
router.delete("/:id",supervisorServer.deleteSupervisor)
router.put("/",supervisorServer.supervisorUpdate)
router.get("/all",supervisorServer.allSupervisor)

module.exports = router


