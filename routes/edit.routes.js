const { Router } = require('express')
const router = Router()
const User = require('../models/User')

router.put('/email', async (req, res) => {
    try {
        db.collection("users").updateOne(
            { email: req.body.email },
            { $set: req.body.newEmail }
        );
        return res.send({ message: 'Email successfully edited' })
    } catch (e) {
        console.error(e)
    }
})
router.post('/fullName', (req, res) => {
    try {

    } catch (e) {

    }
})
router.post('/password', (req, res) => {
    try {

    } catch (e) {

    }
})

router.delete('/delete', async (req, res) => {
    try {
        await User.deleteOne({ email: 'qwerty@mail.ru' });
        res.send({ message: 'User successfully deleted' })
    } catch (e) {
        new Error('Something went wrong')
    }
})

module.exports = router
