const express = require('express');

const rotas = express();

const { cadastrarUsuario } = require('./controladores/cadastro');
const { login } = require('./controladores/login');
const { excluirUsuario } = require('./controladores/excluirUsuario');
const verificaLogin = require('./filtro/verificaLogin');

rotas.post('/cadastrar', cadastrarUsuario);
rotas.post('/login', login);
rotas.delete('/deletar/:id', excluirUsuario)

rotas.use(verificaLogin);



module.exports = rotas;