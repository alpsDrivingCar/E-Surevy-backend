const surveyorServer = require('../../Controller/user/surveyorController')
const express = require("express");
const router = express.Router();

router.post("/login",surveyorServer.loginSurveyor)
router.post("/register",surveyorServer.registerSurveyor)
router.delete("/:id",surveyorServer.deleteSurveyor)
router.put("/:id",surveyorServer.surveyorUpdate)
router.get("/all",surveyorServer.allSurveyor)
router.get("/:id",surveyorServer.getSurveyorBySupervisorId)

module.exports = router


