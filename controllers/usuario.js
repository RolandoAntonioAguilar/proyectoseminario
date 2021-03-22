const User = require("../models/usuario");
const jwt = require("jsonwebtoken");
const transporter = require("../nodemailer");
const crypto = require("crypto")

exports.list = async (req, res, next) => {
    try {
        const users = await User.find({}, { _id: 0, password: 0 });
        res.json(users);
    } catch (error) {
        res.status(400).json({ error, message: `Error al listar las cuentas` });
    }
}
exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const newUser = new User({
            email,
            password: await User.encryptPassword(password),
        });

        await newUser.save();

        const token = jwt.sign({ _id: newUser.id }, 'codigo-secreto-unicah2021', {
            expiresIn: "7d",
        });
        res.status(200).json({ token });

    } catch (error) {
        res.status(400).json({ error, message: `Error al crear la cuenta` });
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const newUser = await User.findOne({ email });

        const matchPassword = await User.comparePassword(
            password,
            newUser.password
        );

        if (!matchPassword)
            return res.status(401).json({
                error: `401`,
                message: `El correo electrónico o la contraseña son inválidos`,
            });

        const token = jwt.sign({ _id: newUser.id }, 'codigo-secreto-unicah2021', {
            expiresIn: "7d",
        });

        res.status(200).json({ token });

    } catch (error) {
        res.status(400).json({ error, message: `Error al iniciar sesión` });
    }
}
exports.sendMail = async (req, res, next) => {
    const { email } = req.body;
    try {
        if (email) {

            const userFound = await User.findOne({ email });
            const newToken = await crypto.randomBytes(20).toString("hex");
            await User.findByIdAndUpdate(userFound.id, {
                token: newToken
            });
            const HOST_FRONTEND = 'localhost:4200'

            const confirmationUrl = `http://${HOST_FRONTEND}/restore_password/${newToken}`;

            let info = await transporter.sendMail({
                from: '"Lista de tareas 👻" <admin@listadetareas.com>',
                to: `${email}`,
                subject: "Restablece tu contraseña",
                text:
                    "Hola, " +
                    email +
                    "\n" +
                    "Para restablecer su cuenta haga click en este enlace:\n\n" +
                    confirmationUrl +
                    ".\n",
                html:
                    "Hola, " +
                    email +
                    "<br>" +
                    "Para restablecer su cuenta haga click en este enlace:<br><br>" +
                    '<a href="' +
                    confirmationUrl +
                    '" target="_blank">Restablecer contraseña</a>.<br>'
            });
            if (info.messageId) {
                res.status(200).json({ message: `Correo electrónico de recuperación enviado` });
            } else {
                res.status(400).json({ error, message: `Error al enviar el correo electrónico` });
            }
        } else {
            res.status(400).json({ error, message: `El correo electrónico es necesario` });
        }
    } catch (error) {
        res.status(400).json({ error, message: `Error al enviar el correo electrónico` });
    }
}

exports.restorePassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const { token } = req.params;

        if (!token)
            return res
                .status(400)
                .json({ error: `400`, message: `No se encontró un token valido` });

        const userFound = await User.findOne(
            { token }, { password: 0 }
        );

        if (!userFound)
            return res
                .status(400)
                .json({ error: `400`, message: `El token no es valido` });

        await User.findByIdAndUpdate(userFound.id, {
            password: await User.encryptPassword(password),
            token: null,
        });

        res.status(200).json({ message: `Contraseña restablecida` });
    } catch (error) {
        res.status(400)
            .json({ error, message: `Error al restablecer la contraseña` });
    }
}
