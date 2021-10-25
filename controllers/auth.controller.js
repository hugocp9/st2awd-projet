const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const maxTime = 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxTime
    })
}

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

module.exports.signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxTime});
        res.status(200).json({ user: user._id });
    } catch (err) {
        res.status(200).send(err);
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxTime : 1});
    res.redirect('/');
}