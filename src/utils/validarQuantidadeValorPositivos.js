const validarQuantidadeValorPositivos = (quantidade, valor) => {
    if (quantidade < 0 || valor < 0) {
        return 'A quantidade_estoque, valor e o valor_total devem ser valores positivos.';
    }
    return null;
};

module.exports = { validarQuantidadeValorPositivos };