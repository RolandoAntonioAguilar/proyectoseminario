const User = require("../models/usuario");

exports.checkDuplicateEmail = async (req, res, next) => {
    const { email } = req.body;
    const userFound = await User.findOne({ email }, { password: 0 });
    if (userFound)
        return res.status(400).json({
            error: `400`,
            message: `EL correo electrónico ya esta registrado`,
        });

    next();
};
exports.checkEmail = async (req, res, next) => {
    const { email } = req.body;

    const userFound = await User.findOne({ email }, { password: 0 });

    if (!userFound)
        return res.status(400).json({
            error: `400`,
            message: `El correo electrónico o la contraseña son inválidos`,
        });

    next();
};