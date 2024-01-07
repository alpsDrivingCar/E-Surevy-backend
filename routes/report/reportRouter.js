const reportController = require('../../Controller/report/reportController')

const express = require("express");
const router = express.Router();

router.post('/', reportController.createReport);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);
router.get('/by-supervisor/:supervisorId/:year/:month', reportController.getReportsBySupervisorAndMonth);
router.get('/by-surveyor/surveyor/:supervisorId/surveyor/:surveyorId', reportController.getReportsBySupervisorAndSurveyor);
router.get('/all', reportController.getReportsAll);


module.exports = router;



