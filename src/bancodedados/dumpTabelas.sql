create database pdv;

create table usuarios (
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null
);

create table categorias (
    id serial primary key,
    descricao varchar(255) not null
);

create table produtos (
    id serial primary key,
    descricao varchar(255) not null,
    quantidade_estoque integer not null,
    valor integer not null,
    categoria_id integer not null references categorias(id)
);

create table clientes (
    id serial primary key,
    nome text not null,
    email text not null unique,
    cpf varchar(11) not null unique,
    cep text,
    rua text,
    numero integer,
    bairro text,
    cidade text,
    estado char(2)
);

create table pedidos (
    id serial primary key,
    cliente_id integer not null references clientes(id),
    observacao text,
    valor_total integer not null
);

create table pedido_produtos (
    id serial primary key,
    pedido_id integer not null references pedidos(id),
    produto_id integer not null references produtos(id),
    quantidade_produto integer not null,
    valor_produto integer not null
);

alter table produtos
add column produto_imagem varchar(255);