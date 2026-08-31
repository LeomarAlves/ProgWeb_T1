const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const usuarios = [
    { login: 'admin', senha: '1234' },
    { login: 'leomar', senha: 'abcd' },
    { login: 'beatriz', senha: '123' }
];

function validarLogin(login, senha) {
    return usuarios.some(usuario => usuario.login === login && usuario.senha === senha);
}

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.cookies.usuarioLogado) {
        res.redirect('/restrito')
    } else {
        res.sendFile(__dirname + '/login.html')
    }
});

app.post('/login', (req, res) => {
    const loginDigitado = req.body.login ? req.body.login.trim() : '';
    const senhaDigitada = req.body.senha ? req.body.senha.trim() : '';

    let historicoAcessos = {};
    if (req.cookies.historicoAcessos) {
        try {
            historicoAcessos = JSON.parse(req.cookies.historicoAcessos);

            if (Array.isArray(historicoAcessos)) {
                historicoAcessos = {};
            }

        } catch (e) {
            historicoAcessos = {};
        }
    }

    if (validarLogin(loginDigitado, senhaDigitada)) {

        res.cookie('usuarioLogado', loginDigitado)

        if (req.body.manterConectado === 'on') {
            const tresDias = 3 * 24 * 60 * 60 * 1000;
            const dataExpiracao = new Date(Date.now() + tresDias);

            res.cookie('usuarioLogado', loginDigitado, {
                maxAge: tresDias

            });

        }

        const navegador = req.headers['user-agent']
        const dataLogin = new Date()
        const novoAcesso = `Login feito em ${dataLogin} usando ${navegador}`;

        if (!historicoAcessos[loginDigitado]) {
            historicoAcessos[loginDigitado] = [];
        }

        historicoAcessos[loginDigitado].push(novoAcesso);

        res.cookie('historicoAcessos', JSON.stringify(historicoAcessos));

        res.redirect('/restrito')

    } else {
        res.clearCookie('usuarioLogado');
        res.redirect('/')
    }

});

app.get('/restrito', (req, res) => {

    const nomeUser = req.cookies.usuarioLogado;

    const paginaHTML = fs.readFileSync(
        __dirname + '/restrito.html',
        'utf-8'
    );

    let historicoAcessos = {};

    if (req.cookies.historicoAcessos) {
        try {
            historicoAcessos = JSON.parse(req.cookies.historicoAcessos);
        } catch (e) {
            historicoAcessos = {};
        }
    }

    const listaAcessos = historicoAcessos[nomeUser] || [];

    const ultimoAcesso = listaAcessos.length > 0
        ? listaAcessos[listaAcessos.length - 1]
        : 'Nenhum acesso registrado';

    let sessaoExpirada;

    if (
        req.cookies.sessaoExpirada &&
        req.cookies.sessaoExpirada !== 'sessao'
    ) {

        const data = new Date(req.cookies.sessaoExpirada);

        sessaoExpirada = data.toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });

    } else {

        sessaoExpirada = 'fechar o navegador';
    }

    let linhasAcessos = "";

    listaAcessos.forEach(linha => {
        linhasAcessos += `<tr><td>${linha}</td></tr>`;
    });

    const htmlModificado = paginaHTML
        .replace('{{NOME_USUARIO}}', nomeUser)
        .replace('{{ULTIMO_ACESSO}}', ultimoAcesso)
        .replace('{{LINHAS_TABELA}}', linhasAcessos)
        .replace('{{SESSAO_EXPIRADA}}', sessaoExpirada);

    res.send(htmlModificado);
});
app.get('/logout', (req, res) => {
    res.clearCookie('usuarioLogado');
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

