let express = require('express');
let service = require('../bash-service');
let router = express.Router();

router.get('/api/:page?', (request, response, next) => {

    service.getNew(request.params.page)
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