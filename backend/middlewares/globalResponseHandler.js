const { createSuccessResponse, createErrorResponse } = require("../utils/commonResponse");

function globalResponseHandler(req, res, next) {
    var json = res.json;
    res.json = function (body) {
        const code = res.statusCode;
        let response = { };
        if([200, 201, 202].includes(code)){
            response = createSuccessResponse(body, undefined, res.statusCode);
        }
        else {
            const { message } = body;
            response = createErrorResponse(res.statusCode, message);
        }
        json.call(this, response);
    };
    next();
}

module.exports = globalResponseHandler;