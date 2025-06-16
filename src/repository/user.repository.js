const db = require('../config/db')

exports.getById = async (id) => {
    const result = await db.query('SELECT * FROM users WHERE id = ?', [id])
    return result[0]
}

exports.get = async () => {
    const result = await db.callProcedure('GetAllUsers')
    return result[0]
}

exports.findByEmail = async (email) => {
    const result = await db.callProcedure('GetUserByEmail', [email])
    return result[0][0]
}

exports.add = async (user) => {
    const result = await db.callProcedure('AddUser', [user.name, user.email, user.password])
    return result[0][0]
}