const validarCpfEstadoCliente = (req, res, next) => {
    const { cpf, estado } = req.body;

    const formatoCpf = /^\d{11}$/;
    if (!formatoCpf.test(cpf)) {
        return res.status(400).json({ mensagem: 'CPF inválido.' });
    }

    if (estado !== undefined) {
        const estadosValidos = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

        const estadoValido = estadosValidos.find(itemEstado => itemEstado.toUpperCase() === estado.toUpperCase());

        if (!estadoValido) {
            return res.status(400).json({ mensagem: 'Estado inválido.' });
        }

        req.body.estado = estado.toUpperCase();
    }

    next();
};

module.exports = validarCpfEstadoCliente;