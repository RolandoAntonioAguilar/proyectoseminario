const User = require("../models/usuario");
const jwt = require("jsonwebtoken");

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
exports.checkEmailExist = async (req, res, next) => {
    const { email } = req.body;


    const userFound = await User.findOne({ email }, { password: 0 });

    if (!userFound)
        return res.status(400).json({
            error: `400`,
            message: `EL correo electrónico no esta registrado`,
        });

    next();
};
exports.verifyToken = async (req, res, next) => {
    try {
        // console.log(req.headers.authorization);
        if (!req.headers.authorization)
            return res
                .status(403)
                .json({ error: `403`, message: "No se proporciono un token" });

        const token = req.headers.authorization.split(" ")[1];

        const payload = jwt.verify(token, 'codigo-secreto-unicah2021');

        const id = payload._id;

        const userFound = await User.findById(id, { password: 0 });

        if (!userFound)
            return res
                .status(400)
                .json({ error: `400`, message: "Usuario no encontrado" });

        next();

    } catch (error) {
        return res.status(401).json({ error, message: "Solicitud rechazada" });
    }
};
