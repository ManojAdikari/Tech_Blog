const path = require('path');
const express = require('express');
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);



const hbs1 = require('hbs');

const withAuth = require('./utils/auth');
const User =require('./models/User');
require("dotenv").config();
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({ helpers });
const sess = {
  secret: "Super secret secret",
  cookie: {

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
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
hbs1.registerPartials(path.join(__dirname, '/views/Partials'));

//const hbs = require('hbs');

//this required before view engine setup
hbs1.registerPartials(__dirname + '/views/partials');



app.use(routes);


  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on: http://localhost: ${PORT}`));
  });
  
  app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Something Went Wrong!");
  });

