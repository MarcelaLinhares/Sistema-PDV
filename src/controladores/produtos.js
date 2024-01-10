const knex = require('../conexoes/postgres');
const { uploadImagem, deleteImagem } = require('../conexoes/storage');
const { validarQuantidadeValorPositivos } = require('../utils/validarQuantidadeValorPositivos');

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const erroQuantidadeValor = validarQuantidadeValorPositivos(quantidade_estoque, valor);

    if (erroQuantidadeValor) {
      return res.status(400).json({ mensagem: erroQuantidadeValor });
    }

    const produto = await knex('produtos')
      .insert({ descricao, quantidade_estoque, valor, categoria_id })
      .returning('*');

    let resposta = {
      id: produto[0].id,
      descricao: produto[0].descricao,
      quantidade_estoque: produto[0].quantidade_estoque,
      valor: produto[0].valor,
      categoria_id: produto[0].categoria_id
    };

    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;

      const id = produto[0].id;

      const nomeArquivoSemEspacos = originalname.replace(/\s/g, '');

      const imagem = await uploadImagem(
        `produtos/${id}/${nomeArquivoSemEspacos}`,
        buffer,
        mimetype
      );

      resposta = await knex('produtos').update({
        produto_imagem: imagem.path
      }).where({ id }).returning('*');

      const { Url: imagemUrl } = imagem;

      resposta = { ...resposta[0], produto_imagem: imagemUrl };
    }

    return res.status(201).json(resposta);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const editarDadosProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.produto;

  try {
    const produtoExistente = await knex('produtos').where({ id }).first();

    if (!produtoExistente) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    const erroQuantidadeValor = validarQuantidadeValorPositivos(
      quantidade_estoque,
      valor
    );

    if (erroQuantidadeValor) {
      return res.status(400).json({ mensagem: erroQuantidadeValor });
    }

    const produto = await knex('produtos').where({ id }).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    }).returning('*');

    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;

      const id = produto[0].id;

      const nomeArquivoSemEspacos = originalname.replace(/\s/g, '');

      const imagem = await uploadImagem(
        `produtos/${id}/${nomeArquivoSemEspacos}`,
        buffer,
        mimetype
      );

      resposta = await knex('produtos').update({
        produto_imagem: imagem.path
      }).where({ id });

      const { Url: imagemUrl } = imagem;

      resposta = { ...resposta[0], produto_imagem: imagemUrl };
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const listarProdutos = async (req, res) => {
  const categoria_ids = req.query.categoria_id;

  try {
    let categoriaIdsNumeros = [];

    if (categoria_ids) {
      categoriaIdsNumeros = Array.isArray(categoria_ids)
        ? categoria_ids.map(Number)
        : [Number(categoria_ids)];
    }

    if (categoria_ids && categoriaIdsNumeros.some(isNaN)) {
      return res
        .status(400)
        .json({ mensagem: 'Formato inválido para categoria_id.' });
    }

    if (categoria_ids) {
      const categoriasExistem = await knex('categorias')
        .whereIn('id', categoriaIdsNumeros)
        .select('id');

      if (categoriasExistem.length !== categoriaIdsNumeros.length) {
        return res
          .status(404)
          .json({ mensagem: 'Uma ou mais categorias informadas não existem.' });
      }
    }

    let query = knex('produtos');

    if (categoria_ids) {
      query = query.whereIn('categoria_id', categoriaIdsNumeros);
    }

    if (!categoria_ids) {
      query = query.orderBy('id', 'asc');
    }

    const produtos = await query.select();

    const produtosComUrl = produtos.map((produto) => ({
      ...produto,
      produto_imagem: produto.produto_imagem
        ? `https://${process.env.BACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/${produto.produto_imagem}`
        : null,
    }));

    const produtosOrdenadosPorId = produtosComUrl.sort((a, b) => a.id - b.id);

    return res.status(200).json(produtosOrdenadosPorId);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

const detalharProduto = async (req, res) => {
  const { produto } = req;

  const produtoComUrl = {
    ...produto,
    produto_imagem: produto.produto_imagem
      ? `https://${process.env.BACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/${produto.produto_imagem}`
      : null,
  };

  return res.status(200).json(produtoComUrl);
};

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const encontradoPedidoProduto = await knex('pedido_produtos')
      .where({ produto_id: id })
      .first();

    if (encontradoPedidoProduto) {
      return res
        .status(400)
        .json({ mensagem: 'Produto encontra-se vinculado a um pedido.' });
    }

    const produto = await knex('produtos').where({ id }).first();

    let imagemExcluidaComSucesso = true;

    if (produto && produto.produto_imagem) {
      imagemExcluidaComSucesso = await deleteImagem(produto.produto_imagem);
    }

    await knex('produtos').where({ id }).del();

    if (!res.headersSent) {
      return res.status(204).send();
    }
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  }
};

module.exports = {
  cadastrarProduto,
  editarDadosProduto,
  listarProdutos,
  detalharProduto,
  excluirProduto,
};