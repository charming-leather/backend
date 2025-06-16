const Error = require("../errors/apiError")

const database = require("../repository/user.repository")

exports.login = async (request) => {
    const { email, password } = request;
    const user = await database.findByEmail(email)

    if (!user) {
        throw Error.unauthorized('Invalid email')
    }

    if (password !== user.password) {
        throw Error.unauthorized('Invalid password')
    }

    return user
}