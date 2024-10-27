const express = require('express');
const multer = require('multer')
const router = express.Router()
require('../config/passport.js')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
    session: false
})

const trimRequest = require('trim-request');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./files");
    },
    filename: (req, file, cb) => {

        const unique = Date.now();
        cb(null, unique + file.originalname);
    }
});

const upload = multer({ storage: storage })

const { register, login, createroom, joinroom, myroom, Homework, facultyhomework, studentupload, Totalhomework , Whatsapp } = require('../controller/auth/index');

const { validateregister } = require('../controller/auth/validators');




router.post('/register', trimRequest.all, validateregister, register)

router.post('/login', trimRequest.all, login)

router.post('/createroom', requireAuth, trimRequest.all, createroom)

router.post('/joinroom', requireAuth, trimRequest.all, joinroom)

router.post('/myroom', requireAuth, trimRequest.all, myroom)

router.post('/homeworkpost', requireAuth, trimRequest.all, Homework)

router.post('/facultyhomework', requireAuth, trimRequest.all, facultyhomework)

router.post('/studentupload', upload.single("file"), requireAuth, trimRequest.all, studentupload)

router.post('/totalhomework', requireAuth, trimRequest.all, Totalhomework)

router.post('/Whatsapp', requireAuth, trimRequest.all, Whatsapp )




module.exports = router; 