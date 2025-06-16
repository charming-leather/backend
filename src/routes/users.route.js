const express = require('express')
const router = express.Router()
const { authEnabled } = require('../middleware/auth.middleware')

const userController = require('../controller/users.controller')

router.get('/users/:id', authEnabled, async (req, res) => {
    try {
        res.json(await userController.getUserById(req.params.id))
    } catch (err) {
        res.status(err.statusCode).send(err)
    }
})

router.get('/users', authEnabled, async (req, res) => {
    try {
        res.json(await userController.getAllUsers())
    } catch (err) {
        res.status(err.statusCode).send(err)
    }
})

router.post('/users/create', async (req, res) => {
    try {
        res.json(await userController.createUser(req.body))
    } catch (err) {
        res.status(err.statusCode).send(err)
    }
})

router.put('/users', async (req, res) => {
    res.json("This is a PUT")
})

module.exports = router