# Programação Web - Trabalho 1 (ProgWeb_T1)

Sistema de autenticação e controle de sessão web desenvolvido com **Node.js**, **Express** e **Cookies**.

---

## 📌 Sobre o Projeto

Este projeto é uma aplicação web que demonstra o funcionamento de autenticação básica de usuários, persistência e gerenciamento de estado/sessão através de **cookies HTTP**, controle de acesso a rotas restritas e histórico de acessos por dispositivo/navegador.

---

## 🚀 Funcionalidades

- **Autenticação de Usuário:** Formulário de login com validação de credenciais.
- **Gerenciamento de Sessão por Cookies:**
  - Criação de cookie de sessão (`usuarioLogado`).
  - Opção *"Manter acesso"* que estende a validade do cookie por 3 dias (`maxAge: 3 * 24 * 60 * 60 * 1000`).
- **Controle de Acesso & Redirecionamento:**
  - Usuários autenticados que acessam `/` são redirecionados automaticamente para `/restrito`.
  - Tentativas de login inválidas são redirecionadas de volta para a tela de login.
- **Histórico e Auditoria de Acessos:**
  - Armazenamento de lista de acessos no cookie `historicoAcessos`.
  - Captura do carimbo de data/hora (`Date`) e do cabeçalho `User-Agent` (navegador/dispositivo) a cada login.
  - Exibição dinâmica do último acesso e de toda a tabela de histórico na área restrita.
- **Encerramento de Sessão (Logout):**
  - Rota `/logout` para exclusão do cookie de sessão e redirecionamento para a página inicial.

---

## 🛠️ Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/):** Ambiente de execução JavaScript no servidor.
- **[Express](https://expressjs.com/):** Framework web minimalista para Node.js.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser):** Middleware para análise e manipulação de cookies nas requisições HTTP.
- **HTML5:** Estruturação das páginas de interface do usuário (`login.html` e `restrito.html`).

---

## 📁 Estrutura de Arquivos

```plaintext
ProgWeb_T1/
├── node_modules/         # Dependências instaladas pelo npm
├── .gitignore            # Arquivos e pastas ignorados pelo Git
├── login.html            # Interface da tela de login
├── package-lock.json     # Árvore de dependências exata
├── package.json          # Metadados e dependências do projeto
├── README.MD             # Documentação do projeto
├── restrito.html         # Template HTML da área restrita
└── server.js             # Servidor Express com as rotas e lógica da aplicação
```

---

## 🚦 Rotas da Aplicação

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Página inicial. Exibe `login.html` ou redireciona para `/restrito` se já logado. |
| `POST` | `/login` | Processa os dados do formulário (`login`, `senha` e `manterConectado`), define cookies e redireciona. |
| `GET` | `/restrito` | Renderiza `restrito.html` com o nome do usuário e tabela com o histórico de acessos. |
| `GET` | `/logout` | Limpa o cookie `usuarioLogado` e redireciona para `/`. |

---

## 🔑 Credenciais para Teste

| Campo | Valor |
| :--- | :--- |
| **Login** | `admin` |
| **Senha** | `123` |

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) instalado na versão 18+ (ou versão LTS recomendada).
- [npm](https://www.npmjs.com/) (gerenciador de pacotes incluso no Node.js).

---

## 💻 Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd ProgWeb_T1
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   node server.js
   ```

4. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
