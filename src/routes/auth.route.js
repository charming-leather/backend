const express = require('express')
const router = express.Router()
const jwt = require('../config/jwt')

const authController = require("../controller/auth.controller")

router.post('/login', async (req, res) => {
    try {
        const user = await authController.login(req.body)
        const token = jwt.generateToken(
            {
                id: user.id,
                name: user.name,
                email: user.email
            });

        return res.json({ token })
    } catch (error) {
        return res.status(error.statusCode).send(error)
    }
})

module.exports = router