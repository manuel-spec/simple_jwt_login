const jwt = require('jsonwebtoken')
const { User } = require('../../models/User')
require('dotenv').config()

const verifyCookie = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.COOKIE_SECRET, ((error, decodedToken) => {
            if (error) {
                res.redirect('/users/login')
            } else {
                next()
            }
        }))
    } else {
        res.redirect('/users/login')
    }
}

const auth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.COOKIE_SECRET, (async (error, decodedToken) => {
            if (error) {
                console.log(error)
                res.locals.user = null
                next()
            } else {
                const user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        }))
    } else {
        res.locals.user = null
        next()
    }
};

module.exports = { verifyCookie, auth }
