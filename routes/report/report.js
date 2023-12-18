const reportController = require('../../Controller/report/report')

const express = require("express");
const router = express.Router();

router.post('/', reportController.createReport);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);
router.get('/by-supervisor/:supervisorId', reportController.getReportsBySupervisor);
router.get('/by-surveyor/surveyor/:supervisorId/surveyor/:surveyorId', reportController.getReportsBySupervisorAndSurveyor);


module.exports = router;



