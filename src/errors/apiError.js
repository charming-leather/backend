class ApiError extends Error {
    constructor(statusCode, errorCode, message) {
        super(message)
        this.statusCode = statusCode
        this.errorCode = errorCode
    }

    toJSON() {
        return {
            errorCode: this.errorCode,
            message: this.message
        }
    }

    static badRequest(message = 'Bad Request') {
        return new ApiError(400, 'BAD_REQUEST', message)
    }

    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, 'UNAUTHORIZED', message)
    }

    static forbidden(message = 'Forbidden') {
        return new ApiError(403, 'FORBIDDEN', message)
    }

    static notFound(message = 'Not Found') {
        return new ApiError(404, 'NOT_FOUND', message)
    }

    static internal(message = 'Internal Server Error') {
        return new ApiError(500, 'INTERNAL_SERVER_ERROR', message)
    }

    static conflict(message = 'Conflict') {
        return new ApiError(409, 'CONFLICT', message)
    }
}

class DatabaseError extends ApiError {}

module.exports = ApiError