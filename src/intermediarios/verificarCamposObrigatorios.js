const verificarCamposObrigatoriosUsuario = (req, res, next) => {
    const { nome, email, senha } = req.body;

    if (!email || !senha || !nome) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    next();
};

const verificarCamposObrigatoriosProduto = (req, res, next) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    next();
};

const verificarCamposObrigatoriosCliente = (req, res, next) => {
    const { nome, email, cpf } = req.body;

    if (!nome || !email || !cpf) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    next();
};

module.exports = {
    verificarCamposObrigatoriosUsuario,
    verificarCamposObrigatoriosProduto,
    verificarCamposObrigatoriosCliente
};