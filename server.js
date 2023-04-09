// Dependencies
const express = require('express');
// Import express-handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');
const hbs1 = require('hbs');
const register_account = require('./controllers/registernewaccount-routes');
const login = require('./controllers/login-routes');
const dashboard = require('./controllers/dashboard-routes');
const home =require('./controllers/home-routes')

// Sets up the Express App 
const app = express();
const PORT = process.env.PORT || 3000;

// Describe what the following two lines of code are doing.
// The following two lines of code are setting Handlebars.js as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

hbs1.registerPartials(path.join(__dirname, '/views/Partials'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('./controllers/dish-routes'));
app.use('/registeraccount',register_account);
app.use('/login',login);
app.use('/dashboard',dashboard);
app.use('/home',home);
  

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
  });