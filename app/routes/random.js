let express = require('express');
let service = require('../bash-service');
let router = express.Router();

router.get('/api/random', (request, response, next) => {

    service.getRandom()
        .then(data => {
            response.json({
                status: 'success',
                data: data.quotes,
                page: data.page,
            });
        })
        .catch(next);
});

module.exports = router;