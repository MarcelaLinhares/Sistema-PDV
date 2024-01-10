const knex = require('../conexoes/postgres');

const cadastrarUsuario = async (req, res) => {
    const { nome, email } = req.body;

    try {
        const senhaCriptografada = req.senhaCriptografada;

        const usuario = await knex('usuarios')
            .insert({ nome, email, senha: senhaCriptografada })
            .returning('*');

        const resposta = {
            id: usuario[0].id,
            nome: usuario[0].nome,
            email: usuario[0].email
        };

        return res.status(201).json(resposta);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const detalharPerfilUsuario = async (req, res) => {
    const id = req.usuario.id;

    try {
        const usuario = await knex('usuarios')
            .where({ id })
            .select('id', 'nome', 'email');

        if (usuario.length === 0) {
            return res.status(400).json('Não foi possível detalhar o usuário.');
        }
        return res.status(200).json(usuario[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const editarPerfilUsuario = async (req, res) => {
    const { nome, email } = req.body;
    const usuarioId = req.usuario.id;

    try {
        const senhaCriptografada = req.senhaCriptografada;

        await knex('usuarios')
            .where({ id: usuarioId })
            .update({ nome, email, senha: senhaCriptografada });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    cadastrarUsuario,
    detalharPerfilUsuario,
    editarPerfilUsuario
};     