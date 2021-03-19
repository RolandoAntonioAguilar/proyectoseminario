const User = require("../models/usuario");

exports.list = async (req, res, next) => {
    try {
        const users = await User.find();
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

        res.json('Bienvenido');

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
                error: `Code 401`,
                message: `El correo electrónico o la contraseña son inválidos`,
            });


        res.json('Bienvenido');

    } catch (error) {
        res.status(400).json({ error, message: `Error al iniciar sesión` }); 
    }
}
