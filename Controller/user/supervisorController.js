const SupervisorSchema = require("../../model/user/supervisorSchema");
const {body, validationResult} = require('express-validator');

exports.registerSupervisor = async (req, res) => {
    try {
        // Validation middleware
        const validationChecks = [
            body('phone').isMobilePhone().withMessage('Invalid phone number'),
            body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
            body('supervisorName').notEmpty().withMessage('Supervisor Name is required'),
            body('companyName').notEmpty().withMessage('Company name is required')
        ];

        for (const validationCheck of validationChecks) {
            await validationCheck.run(req);
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({errors: errorMessages[0]});
        }

        const {phone, password, supervisorName, companyName} = req.body;

        // Check if the supervisor already exists
        const existingSupervisor = await SupervisorSchema.findOne({phone});

        if (existingSupervisor) {
            return res.status(400).json({error: 'Supervisor already exists'});
        }

        // Create a new supervisor
        const supervisor = new SupervisorSchema({
            supervisorName,
            password,
            phone,
            companyName
        });

        // Save the supervisor to the database
        await supervisor.save();
        res.status(201).json({message: 'Supervisor registered successfully', data: supervisor});

    } catch (error) {
        console.error('Error registering supervisor:', error);
        res.status(500).json({error: 'Internal Server Error :' + error});
    }
};


exports.loginSupervisor = async (req, res) => {
    try {
        const {phone, password} = req.body;
        const filter = {
            "phone": phone
        };

        const supervisor = await SupervisorSchema.findOne(filter);

        if (!supervisor) {
            return res.status(401).json({error: 'Supervisor not exists'});
        }
        if (supervisor.password !== password) {
            return res.status(401).json({error: 'Invalid credentials  body= ' + phone + password});
        }
        res.status(200).json({message: 'Login successful', data: supervisor});

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({error: 'Internal Server Error' + error});
    }
}


exports.allSupervisor = async (req, res) => {
    try {
        const supervisors = await SupervisorSchema.find();
        res.status(200).json({data: supervisors});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({error: 'Internal Server Error' + error});
    }
}

exports.supervisorUpdate = (req, res) => {
    SupervisorSchema.findByIdAndUpdate("64b26a3bfeb691283105b1be").updateOne(req.body)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.deleteSupervisor = (req, res) => {
    // Validate if the ID is present
    if (!req.params.id) {
        return res.status(400).send({message: "Supervisor ID is required."});
    }

    SupervisorSchema.findById(req.params.id)
        .then((supervisor) => {
            // Check if the supervisor exists
            if (!supervisor) {
                return res.status(404).send({message: "Supervisor not found with ID: " + req.params.id});
            }

            return SupervisorSchema.findByIdAndDelete(req.params.id);
        })
        .then((result) => {
            return res.status(200).send({data: result});
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({message: "Error occurred while deleting the supervisor."});
        });
}

