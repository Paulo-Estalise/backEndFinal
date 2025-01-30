require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./src/config/passport.config');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

passportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Por favor, faça login para acessar esta página.');
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash('error', 'Erro ao fazer logout.');
      return res.status(500).redirect('/login');
    }
    req.flash('success', 'Logout realizado com sucesso.');
    res.redirect('/login');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});