const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

let expToken

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        //Провірка пароля, корустувач існує
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //Генерація токена
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})
            expToken = `Bearer ${token}`
            res.status(200).json({
                token: `Bearer ${token}`,
            })
            
        } else {
            //Паролі неспівпали
            res.status(401).json({
                message: 'password do not match'
            })
        }
    } else {
        // Користувача нема
        res.status(404).json({
            message: 'User not fond'
        })
    }
}


module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        res.status(409).json({
            message: "Email is not longer inaccessible"
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}



module.exports.getToken = async function (req, res) {
    try {
        token = expToken
        res.status(200).json(token)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        expToken = null
        const token = expToken
        res.status(200).json(token)
    } catch (e) {
        errorHandler(res, e)
    }
}
