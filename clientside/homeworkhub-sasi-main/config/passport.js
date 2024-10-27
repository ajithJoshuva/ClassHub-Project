const passport = require('passport')
const User = require('../models/users')
const Admin = require('../models/Admin')
const JwtStrategy = require('passport-jwt').Strategy


const jwtExtractor = (req) => {
    let token = null
    if (req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '').trim()
    } else if (req.body.token) {
        token = req.body.token.trim()
    } else if (req.query.token) {
        token = req.query.token.trim()
    }

    return token
}

/**
 * Options object for jwt middlware
 */
const jwtOptions = {
    jwtFromRequest: jwtExtractor,
    secretOrKey: process.env.JWT_SECRET
}

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.data._id, (err, user) => {
        if (err) {
            return done(err, false)
        } if (user) {

            done(null, user)
        } else {
            Admin.findById(payload.data._id, (err2, admin) => {
                if (err2) {
                    return done(err2, false)
                }
                if (admin) {
                    return done(null, admin)
                }
            }
            )
        }
    })
})


passport.use(jwtLogin)
