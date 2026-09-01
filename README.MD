# Programação Web - Trabalho 1 (ProgWeb_T1)

Sistema web de autenticação, proteção de rotas e gerenciamento de sessões com histórico de acessos por usuário, desenvolvido com **Node.js**, **Express** e **Cookies**.

---

## 📌 Sobre o Projeto

Este projeto foi desenvolvido para demonstrar na prática os conceitos fundamentais de desenvolvimento web backend relacionados a:
- **Autenticação de Usuários**: Validação de credenciais de login e senha.
- **Gerenciamento de Estado e Sessão via Cookies HTTP**: Controle de sessões temporárias (fechamento de navegador) e persistentes (*"Manter acesso"* por 3 dias).
- **Proteção e Redirecionamento de Rotas**: Restrição de acesso a páginas protegidas para usuários não autenticados.
- **Auditoria e Histórico de Acessos**: Rastreamento e exibição de data/hora (`Date`) e agente do usuário (`User-Agent`) para cada login efetuado.

---

## 🚀 Funcionalidades

- 🔐 **Autenticação com Validação de Credenciais**:
  - Verificação de login e senha a partir de base de usuários mockada.
  - Sanitização de entradas com remoção de espaços em branco (`.trim()`).
  - Redirecionamento de volta à página inicial em caso de credenciais inválidas.

- 🍪 **Gerenciamento de Sessão por Cookies**:
  - **Sessão Padrão**: O cookie `usuarioLogado` é mantido apenas durante a sessão do navegador (expira ao fechar a aba/janela).
  - **Sessão Persistente ("Manter acesso")**: Se a opção for marcada, o cookie tem a validade estendida por **3 dias** (`maxAge: 3 * 24 * 60 * 60 * 1000` ms).
  - Armazenamento da data de expiração no cookie `sessaoExpirada` para exibição amigável na interface.

- 🛡️ **Proteção de Rotas**:
  - **Rota `/`**: Se o usuário já possuir sessão ativa (`usuarioLogado`), é redirecionado automaticamente para `/restrito`.
  - **Rota `/restrito`**: Se não houver cookie `usuarioLogado`, o acesso é bloqueado e o usuário é redirecionado para `/`.

- 📊 **Histórico e Detalhes de Acesso**:
  - Registro contínuo no cookie `historicoAcessos` (armazenado em formato JSON, separado por usuário).
  - Captura do cabeçalho `User-Agent` da requisição para identificar o navegador/dispositivo.
  - Exibição dinâmica na área restrita:
    - Mensagem de boas-vindas com o nome do usuário logado.
    - Data e hora do último acesso registrado.
    - Informação sobre até quando a sessão é válida (data/hora formatada ou "fechar o navegador").
    - Tabela completa listando todos os acessos do usuário atual.

- 🚪 **Encerramento de Sessão (Logout)**:
  - Rota `/logout` que remove o cookie `usuarioLogado` e redireciona para a tela de login.

---

## 🍪 Detalhamento dos Cookies

| Cookie | Finalidade | Tipo / Duração | Formato dos Dados |
| :--- | :--- | :--- | :--- |
| `usuarioLogado` | Identifica o usuário atualmente autenticado | Sessão ou Persistente (3 dias via `maxAge`) | `String` (ex: `"admin"`) |
| `sessaoExpirada` | Informa a data de expiração da sessão para exibição na UI | Sessão ou Persistente (3 dias via `maxAge`) | `ISO String` (ex: `"2026-09-03T...`) ou `"sessao"` |
| `historicoAcessos` | Armazena o registro de acessos de cada usuário | Persistente | `JSON String` (`{ "login": [ { data, agente } ] }`) |

---

## 🔑 Credenciais para Teste

O sistema possui os seguintes usuários pré-cadastrados para validação:

| Usuário / Login | Senha |
| :--- | :--- |
| `admin` | `1234` |
| `leomar` | `abcd` |
| `beatriz` | `123` |

---

## 🚦 Rotas da Aplicação

| Método | Rota | Descrição | Comportamento |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Página Inicial / Login | Exibe `login.html` ou redireciona para `/restrito` se já autenticado. |
| `POST` | `/login` | Processamento do Login | Valida `login`, `senha` e `manterConectado`. Define os cookies e redireciona para `/restrito` (sucesso) ou `/` (falha). |
| `GET` | `/restrito` | Painel Restrito | Valida se `usuarioLogado` existe. Lê `restrito.html`, substitui as tags de template dinamicamente e renderiza o HTML. |
| `GET` | `/logout` | Logout | Remove o cookie `usuarioLogado` através de `res.clearCookie()` e redireciona para `/`. |

---

## 📁 Estrutura do Projeto

```plaintext
ProgWeb_T1/
├── node_modules/         # Módulos e dependências instaladas pelo npm
├── .gitignore            # Arquivos e pastas ignorados pelo controle de versão
├── login.html            # Interface da tela de login com formulário e checkbox "Manter acesso"
├── package-lock.json     # Registro exato das versões das dependências instaladas
├── package.json          # Manifesto do projeto Node.js e scripts de execução
├── README.MD             # Documentação completa da aplicação
├── restrito.html         # Template HTML da área restrita com placeholders dinâmicos
└── server.js             # Servidor Express com a lógica de rotas, cookies e renderização
```

---

## 🛠️ Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/):** Ambiente de execução JavaScript server-side.
- **[Express 5](https://expressjs.com/):** Framework para gerenciamento de rotas e requisições HTTP.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser):** Middleware para leitura, escrita e manipulação de cookies.
- **[File System (fs)](https://nodejs.org/api/fs.html):** Módulo nativo do Node.js para leitura dos templates HTML.
- **HTML5:** Estrutura semântica das páginas de login e da área restrita.

---

## ⚙️ Pré-requisitos

- **[Node.js](https://nodejs.org/)** instalado (versão 18 ou superior recomendada).
- **[npm](https://www.npmjs.com/)** (incluso com o Node.js).

---

## 💻 Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/LeomarAlves/ProgWeb_T1.git
   cd ProgWeb_T1
   ```

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   npm start
   # ou: node server.js
   ```

4. **Acesse no navegador:**
   Abra seu navegador e vá para [http://localhost:3000](http://localhost:3000).

---

## 🧪 Cenários de Teste Sugeridos

1. **Login de Sessão Padrão:**
   - Faça login com `admin` e senha `1234` sem marcar *"Manter acesso"*.
   - Verifique que na página restrita a validade da sessão é indicada como *"fechar o navegador"*.
   - Feche o navegador e abra novamente em `http://localhost:3000`; você deverá ver a tela de login.

2. **Login com "Manter acesso":**
   - Faça login marcando a opção *"Manter acesso"*.
   - Verifique que na página restrita é exibida a data e hora exatas de expiração (3 dias à frente).

3. **Histórico de Acessos:**
   - Realize múltiplos logins com usuários diferentes (`admin`, `leomar`, `beatriz`) ou usando navegadores diferentes.
   - Note que o histórico na tabela reflete os acessos isolados de cada usuário com o respectivo `User-Agent`.

4. **Proteção de Acesso Direto:**
   - Estando deslogado, tente acessar diretamente `http://localhost:3000/restrito`. O sistema deve redirecioná-lo para a página inicial `/`.

5. **Logout:**
   - Na página restrita, clique no botão **Logout**. Você será redirecionado para a tela de login e o cookie de sessão será removido.
