const knex = require('../conexoes/postgres');
const { validarFormatoEmail } = require('../utils/validarFormatoEmail');

const verificarEmailExistenteUsuario = async (req, res, next) => {
  const { email } = req.body;
  const usuarioId = req.usuario ? req.usuario.id : null;

  try {
    const erroFormatoEmail = validarFormatoEmail(email);

    if (erroFormatoEmail) {
      return res.status(400).json({ mensagem: erroFormatoEmail });
    }

    const query = knex.select().table('usuarios').where({ email });

    if (usuarioId) {
      query.whereNot('id', usuarioId);
    }

    const usuariosExistente = await query;

    if (usuariosExistente.length > 0) {
      return res.status(400).json({ mensagem: 'E-mail já existe.' });
    }
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }

  next();
};

const verificarCategoriaExistente = async (req, res, next) => {
  const { categoria_id } = req.body;

  try {
    const query = knex.select().table('categorias').where('id', categoria_id);

    const categoriaExistente = await query;

    if (categoriaExistente.length <= 0) {
      return res
        .status(404)
        .json({ mensagem: 'A categoria informada não existe.' });
    }
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }

  next();
};

const verificarProdutoExistenteIdEnviado = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ mensagem: 'Campo ID é obrigatório.' })
  }

  try {
    const encontraProduto = await knex('produtos').where({ id }).first();

    if (!encontraProduto) {
      res.status(404).json({ mensagem: ' Produto não encontrado.' });
    }

    req.produto = encontraProduto;
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }

  next();
};

const verificarEmailCpfExistenteCliente = async (req, res, next) => {
  const { email, cpf } = req.body;
  const clienteId = req.params.id ? req.params.id : null;

  try {
    const erroFormatoEmail = validarFormatoEmail(email);

    if (erroFormatoEmail) {
      return res.status(400).json({ mensagem: erroFormatoEmail });
    }

    let query = knex.select().table('clientes');

    if (email || cpf) {
      query.where(condicao => {
        if (email) {
          condicao.where({ email });
        }
        if (cpf) {
          condicao.orWhere({ cpf });
        }
      });
    }

    if (clienteId) {
      query.andWhereNot('id', clienteId);
    }

    const emailOuCpfExistente = await query.first();

    if (emailOuCpfExistente) {
      return res.status(400).json({ mensagem: 'E-mail ou cpf informado já existe.' });
    }

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }

  next();
};

const verificarClienteExistenteIdEnviado = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ mensagem: 'Campo ID é obrigatório.' })
  }

  try {
    const encontraCliente = await knex('clientes').where({ id }).first();

    if (!encontraCliente) {
      res.status(404).json({ mensagem: ' Cliente não encontrado.' });
    }

    req.cliente = encontraCliente;
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }

  next();
};

module.exports = {
  verificarEmailExistenteUsuario,
  verificarCategoriaExistente,
  verificarProdutoExistenteIdEnviado,
  verificarEmailCpfExistenteCliente,
  verificarClienteExistenteIdEnviado
};