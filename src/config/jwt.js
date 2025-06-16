const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'your_secret_key'
const expiresIn = '1d'

function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn })
}

function verifyToken(token) {
    return jwt.verify(token, secret)
}

module.exports = { generateToken, verifyToken }