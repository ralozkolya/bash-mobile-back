let express = require('express');
let service = require('../bash-service');
let router = express.Router();

router.get('/api', (request, response, next) => {

    service.getNew()
        .then(quotes => {
            response.json({
                status: 'success',
                data: quotes,
            });
        })
        .catch(next);
});

module.exports = router;