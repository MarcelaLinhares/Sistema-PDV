const bcrypt = require('bcrypt');

const criptografarSenha = async (req, res, next) => {
    const { senha } = req.body;

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    req.senhaCriptografada = senhaCriptografada;

    next();
};

module.exports = {
    criptografarSenha
};