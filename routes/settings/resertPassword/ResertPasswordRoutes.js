const express = require("express");
const router = express.Router();
const resertPasswordServer = require('../../../Controller/settings/resertPassword/resertPasswordController')

// Route to change password
router.post("/:id", resertPasswordServer.changePasswordById);

module.exports = router;
