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

const User =require('./models/User');
const userRegister = require('./controllers/registernewaccount-routes');
require("dotenv").config();

// Sets up the Express App 
const app = express();
const PORT = process.env.PORT || 3000;



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
  

// Starts the server to begin listening


  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on: http://localhost: ${PORT}`));
  });
  
  app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Something Went Wrong!");
  });