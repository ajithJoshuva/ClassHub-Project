const { register } = require('./register')
const { login } = require('./login')
const { createroom } = require('./createroom')
const { joinroom } = require('./joinroom')
const { myroom } = require('./myroom')
const { Homework, facultyhomework } = require('./homework')
const { studentupload, Totalhomework } = require('./studentupload')
const {Whatsapp} = require('./whatsapp')

module.exports = { register, login, createroom, joinroom, myroom, Homework, facultyhomework, studentupload, Totalhomework , Whatsapp }