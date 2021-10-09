const UserModel = require("../models/user.model");

module.exports.signUp = async (req, res) => {
    const {pseudo, email, pass} = req.body;

    try {
        const user = await UserModel.create({pseudo, email, pass});
        res.status(201).json({ user : user._id });
    }
    catch (err) {
        res.status(200).send({ err });
    }
}