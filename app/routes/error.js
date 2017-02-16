module.exports = (error, request, response, next) => {
    response.status(500).json({
        status: 'error',
        description: error,
    });
};