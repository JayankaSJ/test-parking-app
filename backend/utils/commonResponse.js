
function createCommonResponse(status, data, message) {
    return {
        status,
        data,
        message
    }
}

function createSuccessResponse(data, message, code = 200) {
    return createCommonResponse(code, data);
}

function createErrorResponse(code, message) {
    return createCommonResponse(code, undefined, message);
}


module.exports = {
    createSuccessResponse,
    createErrorResponse
};