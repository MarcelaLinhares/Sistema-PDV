># Sistema-PDV
## 📂 Descrição do projeto
Este projeto foi desenvolvido como Desafio Final do Módulo 05 do curso de Desenvolvimento de Software com foco em Back-end na Cubos Academy. O objetivo principal foi proporcionar prática no fluxo de trabalho em equipe, aplicando metodologias ágeis como o Kanban e Scrum, e explorando o uso de branches para gerenciamento de versões e resolução de conflitos. O projeto foi estruturado em três sprints, cada uma com duração de uma semana, para garantir uma abordagem iterativa e eficiente no desenvolvimento. Como Líder da equipe CodeIn5, tive a oportunidade de contribuir significativamente para o projeto, especialmente na organização das sprints através das metodologias ágeis, além de compartilhar conhecimento sobre a criação e manipulação das branches, e principalmente na motivação do trabalho em equipe. O resultado do nosso esforço conjunto foi reconhecido com o prêmio 🏆 de "Dream Team".

A RESTful API foi desenvolvida para atender às necessidades de um PDV (Frente de Caixa) e foi implantada com sucesso usando a plataforma [Cyclic](https://www.cyclic.sh/), com integração total ao banco de dados PostgreSQL por meio da plataforma [ElephantSQL](https://www.elephantsql.com/), permitindo a persistência e manipulação de dados de usuários, categorias, produtos, clientes e pedidos, fundamentais para o funcionamento da aplicação. Além disso, foram implementadas medidas de segurança, incluindo a criptografia de senhas e autenticação de usuário por meio de tokens, para garantir a proteção dos dados armazenados. Para a comunicação com os clientes, incorporamos o envio de e-mails utilizando o servidor SMTP do [Sendgrid](https://sendgrid.com/en-us/2?adobe_mc_sdid=SDID%3D0C972E2A1A5B44D5-7C455C1ECC21C801%7CMCORGID%3D32523BB96217F7B60A495CB6%40AdobeOrg%7CTS%3D1704917007), notificando-os com informações cruciais sobre os pedidos realizados. A funcionalidade de upload de imagens, seja durante a inclusão ou edição de um produto, é suportada pelo servidor de armazenamento [Backblaze](https://www.backblaze.com/), proporcionando uma solução confiável para a gestão de arquivos no sistema.

## ⚙ Funcionalidades
* Listar categorias
* Cadastrar usuário
* Efetuar login do usuário
* Detalhar perfil do usuário logado
* Editar perfil do usuário logado
* Cadastrar produto
* Editar dados do produto
* Listar produtos
* Detalhar produto
* Excluir produto por ID
* Cadastrar cliente
* Editar dados do cliente
* Listar clientes
* Detalhar cliente
* Cadastrar pedido
* Listar pedido
