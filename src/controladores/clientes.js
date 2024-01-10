const knex = require('../conexoes/postgres');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const cliente = await knex('clientes')
            .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .returning('*');

        const resposta = {
            id: cliente[0].id,
            nome: cliente[0].nome,
            email: cliente[0].email,
            cpf: cliente[0].cpf,
            cep: cliente[0].cep,
            rua: cliente[0].rua,
            numero: cliente[0].numero,
            bairro: cliente[0].bairro,
            cidade: cliente[0].cidade,
            estado: cliente[0].estado
        };

        return res.status(201).json(resposta);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const editarDadosCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    const { id } = req.cliente;

    try {
        const atualizarDados = await knex('clientes').where('id', id).update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado });

        if (atualizarDados === 0) {
            return res.status(400).json({ mensagem: 'Não foi possível atualizar os dados do cliente.' });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const listarClientes = async (req, res) => {

    try {
        const listaDeClientes = await knex('clientes').orderBy('id', 'asc');

        return res.status(200).json(listaDeClientes);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const detalharCliente = async (req, res) => {
    const { id } = req.cliente;

    try {
        const cliente = await knex('clientes')
            .where({ id })
            .select('id',
                'nome',
                'email',
                'cpf',
                'cep',
                'rua',
                'numero',
                'bairro',
                'cidade',
                'estado');

        if (cliente.length === 0) {
            return res.status(400).json('Não foi possível detalhar o cliente.');
        }

        return res.status(200).json(cliente[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    cadastrarCliente,
    editarDadosCliente,
    listarClientes,
    detalharCliente
};