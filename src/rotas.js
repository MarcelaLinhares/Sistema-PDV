const express = require('express');
const listarCategorias = require('./controladores/categorias');
const { cadastrarUsuario, detalharPerfilUsuario, editarPerfilUsuario } = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificarLogin = require('./intermediarios/autenticacao');
const { criptografarSenha } = require('./intermediarios/criptografarSenha');
const { verificarCamposObrigatoriosUsuario, verificarCamposObrigatoriosCliente, verificarCamposObrigatoriosProduto } = require('./intermediarios/verificarCamposObrigatorios');
const { verificarEmailExistenteUsuario, verificarProdutoExistenteIdEnviado, verificarCategoriaExistente, verificarEmailCpfExistenteCliente, verificarClienteExistenteIdEnviado } = require('./intermediarios/verificarEmailCpfCategoriaProdutoClienteExistente');
const { editarDadosProduto, detalharProduto, excluirProduto, listarProdutos, cadastrarProduto } = require('./controladores/produtos');
const { detalharCliente, cadastrarCliente, listarClientes, editarDadosCliente } = require('./controladores/clientes');
const validarCpfEstadoCliente = require('./intermediarios/validarCpfEstadoCliente');
const multer = require('./intermediarios/multer');
const { listarPedidos, cadastrarPedidos } = require('./controladores/pedidos');

const rotas = express();

rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', verificarCamposObrigatoriosUsuario, criptografarSenha, verificarEmailExistenteUsuario, cadastrarUsuario);
rotas.post('/login', login);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharPerfilUsuario);
rotas.put('/usuario', verificarCamposObrigatoriosUsuario, criptografarSenha, verificarEmailExistenteUsuario, editarPerfilUsuario);

rotas.post('/produto', multer.single('produto_imagem'), verificarCamposObrigatoriosProduto, verificarCategoriaExistente, cadastrarProduto);
rotas.put('/produto/:id', multer.single('produto_imagem'), verificarCamposObrigatoriosProduto, verificarProdutoExistenteIdEnviado, verificarCategoriaExistente, editarDadosProduto);
rotas.get('/produto', listarProdutos);
rotas.get('/produto/:id', verificarProdutoExistenteIdEnviado, detalharProduto);
rotas.delete('/produto/:id', verificarProdutoExistenteIdEnviado, excluirProduto);

rotas.post('/cliente', verificarCamposObrigatoriosCliente, validarCpfEstadoCliente, verificarEmailCpfExistenteCliente, cadastrarCliente);
rotas.put('/cliente/:id', verificarCamposObrigatoriosCliente, verificarClienteExistenteIdEnviado, validarCpfEstadoCliente, verificarEmailCpfExistenteCliente, editarDadosCliente);
rotas.get('/cliente', listarClientes);
rotas.get('/cliente/:id', verificarClienteExistenteIdEnviado, detalharCliente);

rotas.post('/pedido', cadastrarPedidos);
rotas.get('/pedido', listarPedidos);

module.exports = rotas; 