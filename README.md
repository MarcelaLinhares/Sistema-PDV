># Sistema-PDV
## Menu
- [Descrição do projeto](#-descrição-do-projeto)
  
- [Funcionalidades](#-funcionalidades)

- [Linguagens e Ferramentas utilizadas](#-linguagens-e-ferramentas-utilizadas)

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

## 🛠 Linguagens e Ferramentas utilizadas
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)
![Beekeeper](https://img.shields.io/badge/beekeeper-0D1117?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAFNUExURQAAAP//a/rXOvPUOejMN/jWOvjWOenQOP/fPP3VOf/nOf/xP+zSOPzYOvvYOo98IfTTOfjWOvjWOfjWOffWOf//R1xQFUc+EO7NN/jWOvjWOfjWOffWOfjWOf/cO5J+IvjWOfjWOfjWOffWOfjWOfjWOvfWOfjWOvjWOvnXO/nXOvjWOvfWOfjWOfjWOfjWOfjWOfjWOvfWOfjWOfjWOfjWOvfWOfjWOfjWOfnXOjoyDe/ON/vYOvzZOv3aO5WBIjkxDd7AM8esLpJ+ItC0MPrYOvjWOZaBIzUuDKONJqSOJj83DiQfCJSAIvXTOTcvDM2xL/HQOObGNXppHBUTBcCmLO/PN/rXOvvZOuTFNSokCZqFJJiDIyslCuXGNeXFNbyiKxQRBH5sHefHNX1sHRUSBb+lLPTSOI57ISMeCJF9IfTTOXtrHM+zMP///548sBYAAAA5dFJOUwAAAAAAAAAAAAAAAAAAABqI7eyGGQpYx/v7xlYKNa729qw0KtTSKWH6aPxiK9U3sPf3C1rJ/ByK7y1GWkAAAAABYktHRG4iD1EXAAAAB3RJTUUH5wkZEwMcxtjpWwAAAJtJREFUCB0FwdtKw0AUQNG9JydOW6wIUgUviOiL4P//iC8iiC0iFQURvFBCMse1BDxQ9dMJw0P1irX6rrOVnqk5bXXrtaeq6s/y2QiZqer8o8soQlXVKBnA7vtcVSGACx3Yaw0IyNAeNaGUNtZah+Gt78dWupPu6KV+HbN63Cz/cHGj88tXctq1fHJ/uFODMTPvq9AtbpXMh9+Jf7viMqPTlzUXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA5LTI1VDE5OjAzOjI4KzAwOjAwxaUCOQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wOS0yNVQxOTowMzoyOCswMDowMLT4uoUAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMDktMjVUMTk6MDM6MjgrMDA6MDDj7ZtaAAAAAElFTkSuQmCC&logoColor=5849BE)
![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
