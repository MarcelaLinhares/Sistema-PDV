const validarFormatoEmail = (email) => {
    const padraoValidacaoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+[^.]$/;

    if (!padraoValidacaoEmail.test(email)) {
        return 'E-mail inválido.';
    }
    return null;
};

module.exports = { validarFormatoEmail };