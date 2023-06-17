const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConnect = require('./config/dbConfig');
const PORT = 3000;

const routes = require('./routes');

const app = express();

dbConnect()
    .then(() => console.log('Connected to DB succesfully'))
    .catch (err => {
        console.log('DB ERROR:', err);
    });

expressConfig(app);
handlebarsConfig(app);

app.get('/', (req, res) => {
    res.render('home');
});
app.use(routes);

app.listen(PORT, () => { console.log(`Server is listening on port ${PORT}...`); });