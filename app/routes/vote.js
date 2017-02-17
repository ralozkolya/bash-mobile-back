let express = require('express');
let service = require('../bash-service');
let bodyParser = require('body-parser');
let router = express.Router();

router.use('/api/vote', bodyParser.urlencoded({extended: true}));

router.post('/api/vote', (request, response, next) => {

    let quote = request.body.quote;
    let act = request.body.act;

    service.vote(quote, act)
        .then(() => {
            response.json({
                status: 'success',
            });
        })
        .catch(next);
});

module.exports = router;