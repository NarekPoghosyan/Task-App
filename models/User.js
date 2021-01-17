const { Schema, model } = require('mongoose')

const schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: { type: String, required: true, unique: true }
})

module.exports = model('User', schema)

