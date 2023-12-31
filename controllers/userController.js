const { User } = require('../models/User')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const login = (request, response) => {
    return response.render('auth/login', { title: "welcome back" })
}

const signup = (request, response) => {
    return response.render('auth/signup', { title: "welcome to" })
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
            } catch (error) {
                console.log(error.message)
            }

        })
    }
}

const loginPost = (request, response) => {
    return response.send("login")
}


module.exports = {
    login, signup, loginPost, signupPost
}