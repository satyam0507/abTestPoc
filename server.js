'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const port = 9090;

const app = express();
app.set('port', (process.env.PORT || 5010));
app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' + app.get('port'));
})

app.use('/static',express.static('static'));
app.use('/bower_components',express.static('bower_components'));

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/abTest', (req, res) => {
    res.render('abTest', { abTest: true });
})

app.listen(port, () => {
    console.log('running on port :: ' + port);
})