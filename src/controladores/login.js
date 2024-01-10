const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('../conexoes/postgres');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Campo e-mail e senha Obrigatórios.' });
    }

    try {
        const encontraUsuario = await knex('usuarios').where({ email }).first();

        if (!encontraUsuario) {
            return res.status(400).json({ mensagem: 'E-mail ou senha inválido.' });
        }

        const senhaValida = await bcrypt.compare(senha, encontraUsuario.senha);

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'E-mail ou senha inválido.' });
        }
        const token = jwt.sign({ id: encontraUsuario.id }, process.env.SenhaJWT, { expiresIn: '6h' });

        const { senha: _, ...usuarioLogado } = encontraUsuario;

        return res.status(200).json({ usuario: usuarioLogado, token });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = login;