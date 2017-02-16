let express = require('express');
let service = require('../bash-service');
let router = express.Router();

router.post('/api/vote', (request, response, next) => {

    console.log(request.body);

    return;

    service.vote(request.params.page)
        .then(data => {
            response.json({
                status: 'success',
            });
        })
        .catch(next);
});

module.exports = router;