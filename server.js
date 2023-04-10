// Dependencies
const express = require('express');
// Import express-handlebars
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const hbs = exphbs.create({});
const path = require('path');
const hbs1 = require('hbs');
const register_account = require('./controllers/registernewaccount-routes');
const login = require('./controllers/login-routes');
const dashboard = require('./controllers/dashboard-routes');
const home =require('./controllers/home-routes');
const withAuth = require('./utils/auth');
const User =require('./models/User');
const userRegister = require('./controllers/registernewaccount-routes');
const userlogin = require('./controllers/login-routes');
require("dotenv").config();

// Sets up the Express App 
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
  secret: "Super secret secret",
  // when user idle for a while will be prompted to log in again
  cookie: {
    // milliseconds⤵️10mintues
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
session.loggedin=false;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
hbs1.registerPartials(path.join(__dirname, '/views/Partials'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('./controllers/dish-routes'));
app.use('/registeraccount',register_account);
app.use('/login',login);
app.use('/dashboard',dashboard);
app.use('/home',home);
app.use('/controllers/user_Register',userRegister);
app.use('/controllers/user_login',userlogin);

// Starts the server to begin listening

var hbsContent = {userName: '', loggedin: false, title: "You are not logged in today", body: "Hello World"}; 


// route for user's dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
  hbsContent.loggedin = true; 
  hbsContent.userName = req.session.user.username; 
  //console.log(JSON.stringify(req.session.user)); 
  console.log(req.session.user.username); 
  hbsContent.title = "You are logged in"; 
      //res.sendFile(__dirname + '/public/dashboard.html');
      res.render('index', hbsContent);
  } else {
      res.redirect('/login');
  }
});

/////////////
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on: http://localhost: ${PORT}`));
  });
  
  app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Something Went Wrong!");
  });

