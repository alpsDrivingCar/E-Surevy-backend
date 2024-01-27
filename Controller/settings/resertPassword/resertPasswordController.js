const SupervisorSchema = require("../../../model/user/supervisorSchema");
const SurveyorSchema = require("../../../model/user/surveyorSchema");

exports.changePasswordById = async (req, res) => {
  try {
    const id = req.params.id;
    const { newPassword, isSurveyor } = req.body;

    let user;
    if (isSurveyor) {
      // Check in SurveyorSchema
      user = await SurveyorSchema.findById(id);
    } else {
      // Check in SupervisorSchema
      user = await SupervisorSchema.findById(id);
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the password - ideally, hash the new password before storing
    user.password = newPassword; // You should hash this password

    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error during password change:', error);
    res.status(500).json({ error: 'Internal Server Error' + error });
  }
};
