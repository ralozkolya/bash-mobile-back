let express = require('express');
let handlebars = require('express-handlebars');
let app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', 'app/views');
app.engine('handlebars', handlebars({defaultLayout: 'main', layoutsDir: 'app/views/layouts'}));
app.set('view engine', 'handlebars');

app.use((request, response, next) => {
    response.header({
        'Access-Control-Allow-Origin': 'http://localhost:8100',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    });
    next();
});

app.use(require('./routes/random'));
app.use(require('./routes/vote'));
app.use(require('./routes/new'));
app.use(require('./routes/404'));
app.use(require('./routes/error'));

app.listen(app.get('port'), () => {
    console.log(`Listening to ${app.get('port')} port`);
});