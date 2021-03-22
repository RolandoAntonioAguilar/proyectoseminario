const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "dd0a53e645dabc",
        pass: "87dbec44303f7c"
    }
});

module.exports = transport;