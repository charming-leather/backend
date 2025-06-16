const Error = require("../errors/apiError")

const database = require('../repository/user.repository')

exports.getUserById = async (id) => {
    const user = database.getById(id)

    if (user.length === 0)
    {
        throw Error.notFound('User not found')
    }

    return user
}

exports.getAllUsers = async () => {
    return await database.get()
}

exports.createUser = async (user) => {
    try {
        return await database.add(user)
    } catch (err) {
        throw Error.conflict('Duplicate user')
    }
}