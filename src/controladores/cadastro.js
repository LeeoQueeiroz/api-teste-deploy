const yup = require('../schema/schema');
const knex = require('../conexao');
const bcrypt = require('bcrypt');
const nodemailer = require('../nodemailer');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const schemaCadastro = yup.object().shape({
            nome: yup.string().required(),
            email: yup.string().email().required(),
            senha: yup.string().required().max(10).min(5)
        })

        await schemaCadastro.validate(req.body);

        const usuario = await knex('usuarios').where('email', email);

        if (usuario.length > 0) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const query = {
            nome,
            email,
            senha: senhaCriptografada,
        }
        const usuarioInserido = await knex('usuarios').insert(query).returning('*');

        if (!usuarioInserido) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        const infoEmail = {
            from: 'Sua conta <nao-responder@suaconta.com>',
            to: email,
            subject: 'Cadastro concluído com sucesso',
            text: `Olá ${nome}, você acaba de criar uma nova conta com o email:${email} em nossa plataforma, seja bem-vindo!`
        }

        nodemailer.sendMail(infoEmail);

        return res.status(200).json(usuarioInserido);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario
}