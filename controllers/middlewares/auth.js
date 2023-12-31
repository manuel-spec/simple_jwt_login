const jwt = require('jsonwebtoken')
const User = require('../../models/User')
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

const auth = async (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.COOKIE_SECRET);
            return true;
        } catch (error) {
            return false;  // Token verification failed
        }
    } else {
        return false;  // No token provided
    }
};

module.exports = { verifyCookie, auth }
