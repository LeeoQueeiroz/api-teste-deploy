const nodemailer = require('nodemailer');

const transportador = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false,
    auth: {
        user: "postmaster@sandbox2db9e38294c243448baa100dafb09818.mailgun.org",
        pass: "f5c5f2c2425b17296b91a533a55b6b7f-53ce4923-28db87c7",
    },
})

module.exports = transportador;