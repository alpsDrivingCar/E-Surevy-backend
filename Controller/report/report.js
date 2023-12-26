const Report = require('../../model/report/report'); // Replace with the correct path
const mongoose = require('mongoose');
const Supervisor = require('../../model/user/supervisorSchema'); // Adjust the path to your Supervisor model
const Surveyor = require('../../model/user/surveyorSchema'); // Adjust the path to your Surveyor model


function checkIsIdsValid(supervisorId, surveyorId) {
    return !mongoose.Types.ObjectId.isValid(supervisorId) || !mongoose.Types.ObjectId.isValid(surveyorId);
}

exports.createReport = async (req, res) => {
    try {
        const { reports, supervisorId, surveyorId } = req.body;

        // Check if there are exactly 3 items
        if (!reports || reports.length !== 3) {
            return res.status(400).json({ error: 'Exactly 3 items are required.' });
        }

        // Check if supervisorId and surveyorId are valid ObjectIds
        if (checkIsIdsValid(supervisorId, surveyorId)) {
            return res.status(400).json({ error: 'Invalid supervisorId or surveyorId.' });
        }

        // Check if supervisorId and surveyorId exist in their collections
        const supervisorExists = await Supervisor.findById(supervisorId);
        const surveyorExists = await Surveyor.findById(surveyorId);

        if (!surveyorExists) {
            return res.status(404).json({ error: 'Surveyor not found.' });
        } else if (!supervisorExists) {
            return res.status(404).json({ error: 'Supervisor not found.' });
        }

        // Create a new report
        const report = new Report({ reports, supervisorId, surveyorId });
        await report.save();

        res.status(201).json({ message: 'Report created successfully', data: report });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ error: 'Internal Server Error: ' + error });
    }
};


exports.updateReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        const updates = req.body;

        const updatedReport = await Report.findByIdAndUpdate(reportId, updates, { new: true });
        res.status(200).json({ message: 'Report updated successfully', data: updatedReport });
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ error: 'Internal Server Error: ' + error });
    }
};


exports.deleteReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        await Report.findByIdAndDelete(reportId);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ error: 'Internal Server Error: ' + error });
    }
};

exports.getReportsBySupervisor = async (req, res) => {
    try {
        const supervisorId = req.params.supervisorId;

        if (!mongoose.Types.ObjectId.isValid(supervisorId)) {
            return res.status(400).json({ error: 'Invalid supervisorId.' });
        }

        const supervisorExists = await Supervisor.findById(supervisorId);
        if (!supervisorExists) {
            return res.status(404).json({ error: 'Supervisor not found.' });
        }

        const reports = await Report.find({ supervisorId });
        res.status(200).json({data: reports});

    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Internal Server Error: ' + error });
    }
};

exports.getReportsBySupervisorAndSurveyor = async (req, res) => {
    try {
        const { supervisorId, surveyorId } = req.params;

        if (checkIsIdsValid(supervisorId, surveyorId)) {
            return res.status(400).json({ error: 'Invalid supervisorId or surveyorId.' });
        }

        const supervisorExists = await Supervisor.findById(supervisorId);
        const surveyorExists = await Surveyor.findById(surveyorId);

        if (!supervisorExists || !surveyorExists) {
            return res.status(404).json({ error: 'Supervisor or Surveyor not found.' });
        }

        const reports = await Report.find({ supervisorId, surveyorId });
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Internal Server Error: ' + error });
    }
};

