module.exports = (request, response, next) => {
    response.status(404).json({
        status: 'error',
        description: 'Error 404: Not Found',
    });
};