const { createErrorResponse } = require("../utils/commonResponse");

function globalErrorHandler(error, req, res, next) {
    if(error){
        console.log(error);
    }
    if (res.headersSent) {
        return next(error)
    }
    res.status(500).json(createErrorResponse(500, 'INTERNAL SERVER ERROR!'))
}

module.exports = globalErrorHandler;