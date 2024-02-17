const reportController = require('../../Controller/report/reportController')

const express = require("express");
const router = express.Router();

router.post('/', reportController.createReport);
router.put('/:reportId', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);
router.get('/by-supervisor/:supervisorId/:year/:month', reportController.getReportsBySupervisorAndMonth);
router.get('/by-surveyor/:surveyorId/:year/:month', reportController.getReportsBySurveyorAndMonth);
router.get('/all', reportController.getReportsAll);


module.exports = router;



