require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postsRoute = require('./routes/posts');
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Routes */


app.use('/chicken', postsRoute);

// app.get('*', (req, res) => {
    // res.redirect('/chicken');
// });

/* Connect to DB */

mongoose.connect(process.env.DB_CONNECTION ,{ useNewUrlParser: true, useUnifiedTopology: true });


app.listen(process.env.PORT);
