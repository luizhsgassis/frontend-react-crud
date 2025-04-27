# Gerenciamento de Usuários (React + Vite)

Este é um projeto de CRUD (Create, Read, Update, Delete) desenvolvido em React utilizando Vite como ferramenta de build. A aplicação permite gerenciar usuários, incluindo funcionalidades para adicionar, listar, editar e excluir usuários. Este projeto foi desenvolvido como parte de um trabalho acadêmico.

## ✨ Funcionalidades

-   **Adicionar Usuário**: Formulário para cadastrar novos usuários com nome, e-mail e senha.
-   **Listar Usuários**: Exibe uma lista de usuários cadastrados.
-   **Editar Usuário**: Permite editar o nome e o e-mail de um usuário existente.
-   **Excluir Usuário**: Remove um usuário da lista após confirmação.

## 🚀 Tecnologias Utilizadas

-   **React**: Biblioteca para construção da interface do usuário.
-   **Vite**: Ferramenta de build rápida e moderna.
-   **Axios**: Biblioteca para realizar requisições HTTP.
-   **ESLint**: Ferramenta para análise de código e padronização.
-   **CSS**: Estilização da interface.

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

-   [Node.js](https://nodejs.org/) (versão 16 ou superior)
-   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## ⚙️ Configuração do Projeto

1.  **Clone o repositório**:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd frontend-react-crud
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Configure a URL da API**:
    Crie um arquivo `.env` na raiz do projeto e configure a variável `VITE_API_URL` com a URL da sua API backend. Por padrão, pode ser:
    ```env
    VITE_API_URL=http://localhost:3001/usuarios
    ```
    *Observação: Certifique-se de que o servidor da API esteja rodando.*

4.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    # ou
    # yarn dev
    ```

O projeto estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver ocupada).

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis da aplicação
│   ├── AddUserForm.jsx # Formulário para adicionar novos usuários
│   ├── EditUserForm.jsx# Formulário para editar usuários existentes
│   └── UserList.jsx    # Lista de usuários com opções para editar e excluir
├── services/           # Lógica de comunicação com a API (Axios)
│   └── api.js          # Configuração e chamadas da API
├── App.jsx             # Componente principal (gerencia estado e lógica)
├── index.css           # Estilos globais
├── App.css             # Estilos específicos do App.jsx
└── main.jsx            # Ponto de entrada da aplicação React
.env                    # Arquivo para variáveis de ambiente (não versionado)
.eslintrc.cjs           # Configuração do ESLint
.gitignore              # Arquivos ignorados pelo Git
package.json            # Dependências e scripts do projeto
README.md               # Este arquivo
vite.config.js          # Configuração do Vite
```

## 🛠️ Como Utilizar

1.  **Adicionar Usuário**:
    *   Preencha o formulário na parte superior da página com nome, e-mail e senha.
    *   Clique no botão "Adicionar Usuário".
2.  **Editar Usuário**:
    *   Na lista de usuários, clique no botão "Editar" ao lado do usuário desejado.
    *   Altere os campos no formulário de edição que aparecerá.
    *   Clique em "Salvar Alterações".
3.  **Excluir Usuário**:
    *   Na lista de usuários, clique no botão "Excluir" ao lado do usuário desejado.
    *   Confirme a exclusão na janela de confirmação.
4.  **Listar Usuários**:
    *   A lista de usuários é carregada automaticamente ao abrir a aplicação e atualizada após cada operação CRUD.

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

-   `npm run dev`: Inicia o servidor de desenvolvimento com hot-reload.
-   `npm run build`: Gera a versão de produção otimizada do projeto na pasta `dist/`.
-   `npm run preview`: Inicia um servidor local para visualizar a versão de produção gerada.
-   `npm run lint`: Executa o ESLint para verificar e corrigir problemas de estilo e potenciais erros no código.

## 📝 Observações

-   Certifique-se de que a API configurada no `.env` esteja em execução para que a aplicação funcione corretamente.
-   O projeto utiliza ESLint para garantir a qualidade e a padronização do código. É recomendado executar `npm run lint` antes de commitar alterações.

## 👨‍💻 Autor

Este projeto foi desenvolvido por **Luiz Henrique Schmidt Gonçalves de Assis**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Luiz%20Assis-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/luiz-henrique-de-assis/) <!-- Opcional: Adicione seu link do LinkedIn -->
[![GitHub](https://img.shields.io/badge/GitHub-luizhsgassis-181717?style=flat&logo=github)](https://github.com/luizhsgassis) <!-- Opcional: Adicione seu link do GitHub -->

Para dúvidas ou sugestões, entre em contato pelo e-mail: `luizhsgassis.dev@gmail.com`.