const SurveyorSchema = require("../../model/user/surveyorSchema");
const SupervisorSchema = require("../../model/user/supervisorSchema");
const {body, validationResult} = require('express-validator');

exports.registerSurveyor = async (req, res) => {
    try {
        // Validation middleware
        const validationChecks = [
            body('phone').isMobilePhone().withMessage('Invalid phone number'),
            body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
            body('surveyorName').notEmpty().withMessage('Surveyor Name is required'),
            body('companyName').notEmpty().withMessage('Company name is required')
        ];

        for (const validationCheck of validationChecks) {
            await validationCheck.run(req);
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({error: errorMessages[0]});
        }

        const {phone, password, surveyorName, companyName} = req.body;

        // Check if the surveyor already exists
        const existingSurveyor = await SurveyorSchema.findOne({phone});

        if (existingSurveyor) {
            return res.status(400).json({error: 'Surveyor already exists'});
        }

        // Create a new surveyor
        const surveyor = new SurveyorSchema({
            surveyorName,
            password,
            phone,
            companyName
        });

        // Save the surveyor to the database
        await surveyor.save();
        res.status(201).json({message: 'Surveyor registered successfully', data: surveyor});

    } catch (error) {
        console.error('Error registering surveyor:', error);
        res.status(500).json({error: 'Internal Server Error :' + error});
    }
};


exports.loginSurveyor = async (req, res) => {
    try {
        const {phone, password} = req.body;
        const filter = {
            "phone": phone
        };

        const surveyor = await SurveyorSchema.findOne(filter);

        if (!surveyor) {
            return res.status(401).json({error: 'Surveyor not exists'});
        }
        if (surveyor.password !== password) {
            return res.status(401).json({error: 'Invalid credentials  body= ' + phone + password});
        }
        res.status(200).json({message: 'Login successful', data: surveyor});

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({error: 'Internal Server Error' + error});
    }
}


exports.allSurveyor = async (req, res) => {
    try {
        const surveyors = await SurveyorSchema.find();
        res.status(200).json({data: surveyors});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({error: 'Internal Server Error' + error});
    }
}

exports.getSurveyorBySupervisorId = async (req, res) => {
    try {
        const supervisorId = req.params.id;
        const supervisor = await SupervisorSchema.findById(supervisorId).populate('surveyors');
        // Check if the supervisor exists
        if (!supervisor) {
            return res.status(404).json({error: 'Supervisor not found'});
        }

        // Sending back the surveyors linked to the supervisor
        res.status(200).json({data: supervisor.surveyors});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: 'Internal Server Error: ' + error.message});
    }
};

exports.surveyorUpdate = async (req, res) => {
    try {
        const surveyorId = req.params.id
        // Update supervisor
        const updateData = req.body;
        const updatedSupervisor = await SurveyorSchema.findByIdAndUpdate(surveyorId, updateData, {new: true});

        if (!updatedSupervisor) {
            return res.status(404).json({error: 'Supervisor not found'});
        }

        res.status(200).json({message: 'Supervisor updated successfully', data: updatedSupervisor});
    } catch (error) {
        console.error('Error updating supervisor:', error);
        res.status(400).json({error: 'Internal Server Error'});
    }
}

exports.deleteSurveyor = (req, res) => {
    // Validate if the ID is present
    if (!req.params.id) {
        return res.status(400).send({message: "Surveyor ID is required."});
    }

    SurveyorSchema.findById(req.params.id)
        .then((surveyor) => {
            // Check if the surveyor exists
            if (!surveyor) {
                return res.status(404).send({message: "Surveyor not found with ID: " + req.params.id});
            }

            return SurveyorSchema.findByIdAndDelete(req.params.id);
        })
        .then((result) => {
            return res.status(200).send({data: result});
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({message: "Error occurred while deleting the surveyor."});
        });
}

