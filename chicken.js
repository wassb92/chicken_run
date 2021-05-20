require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postsRoute = require('./routes/posts');
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const OK = 200;
const NOT_FOUND = 404;


/* Routes */

app.get('/', (req, res) => {
    res.redirect('/doc');
});

app.get('/doc', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

app.use('/chicken', postsRoute, (req, res) => {
    res.status(OK);
});

app.get('*', (req, res) => {
    res.status(NOT_FOUND).send('Not found, go to /chicken page');
});


/* Connect to DB */

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });


app.listen(process.env.PORT);
