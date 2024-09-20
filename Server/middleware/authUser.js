const User = require('../model/userModel');

const Authorise = async (req, res, next) => {
    try {
        console.log(req);
        const { id } = req.params;

        // CHECK VALID USER
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        next();
    } catch (error) {

        return res.status(500).send("Server error");
    }
}

module.exports = Authorise;
