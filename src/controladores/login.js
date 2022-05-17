const knex = require('../conexao');
const yup = require('../schema/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');
const nodemailer = require('../nodemailer');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const schemaLogin = yup.object().shape({
            email: yup.string().email().required(),
            senha: yup.string().required()
        })

        await schemaLogin.validate(req.body);

        const usuario = await knex('usuarios').where('email', email).first();

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json("Email e senha não confere");
        }

        const token = jwt.sign({ id: usuario.id }, senhaHash, { expiresIn: '8h' });

        const { senha: _, ...dadosUsuario } = usuario;

        const infoEmail = {
            from: 'Sua Conta <nao-responder@suaconta.com.br>',
            to: email,
            subject: 'Login',
            text: `Você acaba de fazer login em sua conta de email: ${email}, caso contrário desconsidere este email`
        }

        nodemailer.sendMail(infoEmail);

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    login
}