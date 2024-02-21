import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';


const host = '0.0.0.0';
const porta = 3000;
const app = express();

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret:'ThiagoCamponez',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 15,
    }
}))

app.post('/indexLogin', (requisicao, resposta) =>{
    const login = requisicao.body.login;
    const senha = requisicao.body.senha;
    if(login && senha && login === 'ThiagoCamponez' && senha === '123'){
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/indexPrivado.html');
    }
    else{
        resposta.redirect('indexLogin.html')
    }
})

app.use(express.static(path.join(process.cwd(), 'publico', 'Groovin')));

app.use(autenticar, express.static(path.join(process.cwd(), 'privado')))

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})
