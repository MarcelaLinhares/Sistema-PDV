const jwt = require('jsonwebtoken');
const knex = require('../conexoes/postgres');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado.' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.SenhaJWT);

        const usuario = await knex('usuarios').where({ id }).first();

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ mensagem: 'Token inválido.' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensagem: 'Token expirado.' });
        }
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = verificarLogin;