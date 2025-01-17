require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./src/config/passport.config'); // Configuração do Passport
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Configurar o diretório das views
app.set('views', path.join(__dirname, 'views'));

// Configurar o motor Handlebars para renderizar as views
const hbs = exphbs.create(); // Cria a instância do Handlebars
app.engine('handlebars', hbs.engine); // Define o motor de renderização
app.set('view engine', 'handlebars'); // Define o Handlebars como o motor de visualização

// Middleware para processar requisições JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret', // Usa a variável de ambiente ou um valor padrão
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }, // Seguro apenas em produção (HTTPS)
  })
);

// Inicializar o Passport
passportConfig(); // Configura as estratégias do Passport
app.use(passport.initialize()); // Inicializa o Passport
app.use(passport.session()); // Habilita o uso de sessões com o Passport

// Rota GET para renderizar a página de login
app.get('/login', (req, res) => {
  res.render('login'); // Renderiza a view 'login.handlebars'
});

// Rota POST para autenticação de login
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redireciona em caso de sucesso
  failureRedirect: '/login', // Redireciona em caso de falha
}));

// Rota para autenticação com GitHub
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// Rota de callback do GitHub
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }), // Redireciona em caso de falha
  (req, res) => {
    res.redirect('/dashboard'); // Redireciona em caso de sucesso
  }
);

// Rota protegida (exemplo)
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login'); // Redireciona para o login se o usuário não estiver autenticado
  }
  res.render('dashboard', { user: req.user }); // Renderiza a view 'dashboard.handlebars' com os dados do usuário
});

// Rota de logout
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Erro ao fazer logout');
    }
    res.redirect('/login'); // Redireciona para a página de login após o logout
  });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});