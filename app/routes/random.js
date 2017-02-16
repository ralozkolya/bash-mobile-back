let express = require('express');
let service = require('../bash-service');
let router = express.Router();

router.get('/api/random', (request, response, next) => {

    service.getRandom()
        .then(quotes => {
            response.json({
                status: 'success',
                data: quotes,
            });
        })
        .catch(next);
});

module.exports = router;