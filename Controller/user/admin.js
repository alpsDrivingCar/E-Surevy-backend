const AdminSchema = require("../../model/user/adminSchema");

exports.registerAdmin = async (req, res) => {
    try {
        const {phone, password, name} = req.body;

        // Check if the admin already exists
        const existingAdmin = await AdminSchema.findOne({phone});

        if (existingAdmin) {
            return res.status(400).json({error: 'Admin already exists'});
        }

        // Create a new admin
        const admin = new AdminSchema({
            name,
            password,
            phone,
            // In a production environment, always hash passwords
        });

        // Save the admin to the database
        await admin.save();

        res.status(201).json({message: 'Admin registered successfully'});
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({error: 'Internal Server Error :' + error});
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const filter = {
            "phone": phone 
        };

        // Find the admin by username in the database
        const admin = await AdminSchema.findOne(filter);

        // Check if the admin exists
        if (!admin) {
            return res.status(401).json({ error: 'Admin not exists' });
        }

        // Compare the provided password with the stored password (you should use a secure password hashing library in production)
        if (admin.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials  body= ' + phone + password });
        }

        // At this point, the login is successful
        // res.json({ message: 'Login successful' + admin });
        res.status(200).json({message: 'Login successful', data: admin});

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' + error });
    }
}

exports.adminUpdate = (req, res) => {
    AdminSchema.findByIdAndUpdate("64b26a3bfeb691283105b1be").updateOne(req.body)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.deleteAdmin = (req, res) => {
    AdminSchema.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.send("Delete " + result.response)
        })
        .catch((err) => {
            console.log(err);
        });
}
