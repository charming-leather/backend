const jwt = require('../config/jwt');
const ApiError = require('../errors/apiError');

exports.authEnabled = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send(ApiError.unauthorized('Missing token'));
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = jwt.verifyToken(token);
        next();
    } catch (err) {
        return res.status(401).send(ApiError.unauthorized('Invalid or expired token'));
    }
}

