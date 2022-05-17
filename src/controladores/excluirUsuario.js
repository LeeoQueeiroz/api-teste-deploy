const knex = require('../conexao');

const excluirUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuarioDeletado = await knex('usuarios').delete().where('id', id);

        res.status(200).json(usuarioDeletado);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    excluirUsuario
}