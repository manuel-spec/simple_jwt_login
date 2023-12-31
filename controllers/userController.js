const { User } = require('../models/User')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const expiresAt = 3 * 60 * 60 * 24

const createToken = (id) => {
    return jwt.sign({ id }, process.env.COOKIE_SECRET, { expiresIn: expiresAt })
}

const login = (request, response) => {
    return response.render('auth/login', { title: "welcome back", errors: [] })
}

const signup = (request, response) => {
    return response.render('auth/signup', { title: "welcome to", errors: [] })
}

const signupPost = (request, response) => {
    const result = validationResult(request)
    if (result.isEmpty()) {
        const { email, password } = request.body
        bcrypt.hash(password, 10).then((hash) => {
            try {
                const user = new User({
                    email: email, password: hash
                })
                user.save()
                const token = createToken(user._id)
                response.cookie('jwt', token, { maxAge: expiresAt * 1000 })
                return response.redirect('/')
            } catch (error) {
                console.log(error.message)
            }

        })
    } else {
        console.log(result)
        return response.render('auth/signup', { title: "welcome to", errors: result["errors"] })
    }
}

const loginPost = async (request, response) => {
    const result = validationResult(request)
    if (result.isEmpty()) {
        const { email, password } = request.body
        const user = await User.findOne({ email })
        if (user) {
            const isUser = await bcrypt.compare(password, user.password)
            if (isUser) {
                const token = createToken(user._id)
                response.cookie('jwt', token, { maxAge: expiresAt * 1000 })
                return response.redirect('/')
            }
        }
        return response.redirect('/users/login')
    } else {
        return response.render('auth/login', { title: 'welcome back', errors: result['errors'] })
    }
}


module.exports = {
    login, signup, loginPost, signupPost
}