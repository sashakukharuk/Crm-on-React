const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandlers = require('../utils/errorHandler')
const fs = require('fs')

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({user: req.user.id})
        res.status(200).json(categories)
    } catch (e) {
        errorHandlers(e)
    }
}
module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (e) {
        errorHandlers(e)
    }
}
module.exports.remove = async function (req, res) {
    try{
        const oldCategory = await Category.findById(req.params.id)

        if (oldCategory.imageSrc) {
            fs.unlink(oldCategory.imageSrc, err => {
                if (err) errorHandlers(res, 'Category deleted')
            })
        }

        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})
        res.status(200).json({
            message: 'Category deleted'
        })
    } catch (e) {
        errorHandlers(e)
    }
}
module.exports.create = async function (req, res) {
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    })
    try {
        await category.save()
        res.status(201).json(category)
    } catch (e) {
        errorHandlers(e)
    }
}
module.exports.update = async function (req, res) {
    const oldCategory = await Category.findById(req.params.id)

    if (oldCategory.imageSrc) {
        fs.unlink(oldCategory.imageSrc, err => {
            if (err) errorHandlers(res, 'the photo has been changed, reload page')
        })
    }

    const update = {
        name: req.body.name
    }
    if (req.file) {
        update.imageSrc = req.file.path
    }
    try {
        const category = await Category.findOneAndUpdate(
        {_id: req.params.id},
        {$set: update},
        {new: true})
        res.status(201).json(category)
    } catch (e) {
        errorHandlers(res, e)
    }
}
