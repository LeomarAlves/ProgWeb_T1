const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.cookies.usuarioLogado) {
        res.redirect('/restrito')
    } else {
        res.sendFile(__dirname + '/login.html')
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('usuarioLogado');
    res.redirect('/');
});

app.post('/login', (req, res) => {
    const loginDigitado = req.body.login;
    const senhaDigitada = req.body.senha;
    const  listaAcessos = req.cookies.historicoAcessos || [];
    

    if (loginDigitado === 'admin' && senhaDigitada === '123') {
        
        res.cookie('usuarioLogado', loginDigitado)
        
        if (req.body.manterConectado === 'on'){
            res.cookie('usuarioLogado', loginDigitado, {maxAge: 3 * 24 * 60 * 60 * 1000});
        }

        const navegador = req.headers['user-agent']
        const dataLogin = new Date()
        const novoAcesso = `Login feito em ${dataLogin} usando ${navegador}`;

        listaAcessos.push(novoAcesso);

        res.cookie('historicoAcessos', listaAcessos);

        res.redirect('/restrito')

        

    } else {
        res.redirect('/')
    }
});

app.get('/restrito', (req, res) => {
   const listaAcessos = req.cookies.historicoAcessos || [];
   const ultimoAcesso = listaAcessos[listaAcessos.length -1];
   const paginaHTML = fs.readFileSync(__dirname + '/restrito.html', 'utf-8');
   const nomeUser = req.cookies.usuarioLogado;
   

   let linhasAcessos = "";
   listaAcessos.forEach(linha => {
    linhasAcessos = linhasAcessos + `<tr><td>${linha}</td></tr>`;
   });

   const htmlModificado = paginaHTML.replace('{{NOME_USUARIO}}', nomeUser) .replace('{{ULTIMO_ACESSO}}', ultimoAcesso) .replace('{{LINHAS_TABELA}}', linhasAcessos);

   res.send(htmlModificado);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    });