const knex = require('../conexoes/postgres');
const transportador = require('../conexoes/nodemailer');
const compiladorHtml = require('../utils/compiladorHtml');
const { validarQuantidadeValorPositivos } = require('../utils/validarQuantidadeValorPositivos');

const cadastrarPedidos = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    let valorTotal = 0;
    const pedido_produto = [];
    let pedido = { cliente_id: parseInt(cliente_id), observacao };

    try {
        if (!cliente_id || !pedido_produtos) {
            return res.status(400).json({ mensagem: 'Campo cliente_id e pedido_produtos são obrigatórios.' });
        }

        const clienteExiste = await knex('clientes').where({ id: cliente_id }).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
        }

        const quantidadesProduto = [];
        for (const produto of pedido_produtos) {
            const { produto_id, quantidade_produto } = produto;

            if (!produto_id || !quantidade_produto || quantidade_produto === undefined || quantidade_produto === null) {
                return res.status(400).json({ Mensagem: 'Campo produto_id e quantidade_produto são obrigatórios.' });
            }

            const produtoExiste = await knex('produtos').where({ id: produto_id }).first();

            if (!produtoExiste) {
                return res.status(404).json({ Mensagem: 'Produto não encontrado.' });
            }

            if (quantidade_produto > produtoExiste.quantidade_estoque) {
                return res.status(400).json({ Mensagem: 'Quantidade em estoque insuficiente.' });
            }

            const valorProduto = produtoExiste.valor;
            const valorParcial = valorProduto * quantidade_produto;
            valorTotal += valorParcial;

            await knex('produtos')
                .where({ id: produto_id })
                .update({ quantidade_estoque: produtoExiste.quantidade_estoque - quantidade_produto });

            quantidadesProduto.push(quantidade_produto);
        }

        if (quantidadesProduto.some(qtd => qtd < 0)) {
            return res.status(400).json({ mensagem: 'A quantidade_produto deve ser um valor positivo.' });
        }

        const erroValorTotal = validarQuantidadeValorPositivos(valorTotal);

        if (erroValorTotal) {
            return res.status(400).json({ mensagem: erroValorTotal });
        }

        pedido.valor_total = valorTotal;

        const novoPedido = await knex('pedidos').insert(pedido).returning('*');

        for (let i = 0; i < pedido_produtos.length; i++) {
            const produto = pedido_produtos[i];
            const produtoExiste = await knex('produtos').where({ id: produto.produto_id }).first();

            const pedido_produto_tabela = await knex('pedido_produtos').insert({
                pedido_id: novoPedido[0].id,
                produto_id: produtoExiste.id,
                quantidade_produto: produto.quantidade_produto,
                valor_produto: produtoExiste.valor
            }).returning('*');

            pedido_produto.push(pedido_produto_tabela);
        }

        const valorFormatado = (pedido.valor_total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const html = await compiladorHtml('./src/templates/email.html', {
            nomecliente: clienteExiste.nome,
            pedido: novoPedido[0].id,
            observacao: observacao,
            valor: valorFormatado,
        });

        transportador.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${clienteExiste.nome} <${clienteExiste.email}>`,
            subject: 'Pedido Cadastrado!',
            html,
        });

        const respostaFormatada = {
            id: novoPedido[0].id,
            cliente_id: novoPedido[0].cliente_id,
            observacao,
            pedido_produtos
        };

        return res.status(201).json(respostaFormatada);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const listarPedidos = async (req, res) => {
    const clienteId = req.query.cliente_id;

    try {
        if (clienteId) {
            const clienteExiste = await knex('clientes')
                .where('id', clienteId)
                .select('id')
                .first();

            if (!clienteExiste) {
                return res.status(404).json({ mensagem: 'O cliente informado não existe.' });
            }
        }

        let query = knex('pedidos');

        if (clienteId) {
            query = query.where('cliente_id', clienteId);
        }

        const pedidos = await query.select();

        const respostaFormatada = pedidos.map((pedido) => {
            return {
                pedido: {
                    id: pedido.id,
                    valor_total: pedido.valor_total,
                    observacao: pedido.observacao,
                    cliente_id: pedido.cliente_id,
                },
                pedido_produtos: [],
            };
        });

        for (const respostaPedido of respostaFormatada) {
            const produtosPedido = await knex('pedido_produtos')
                .where('pedido_id', respostaPedido.pedido.id)
                .select();

            respostaPedido.pedido_produtos = produtosPedido.map((produto) => {
                return {
                    id: produto.id,
                    quantidade_produto: produto.quantidade_produto,
                    valor_produto: produto.valor_produto,
                    pedido_id: produto.pedido_id,
                    produto_id: produto.produto_id,
                };
            });
        }

        return res.status(200).json(respostaFormatada);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    cadastrarPedidos,
    listarPedidos
};