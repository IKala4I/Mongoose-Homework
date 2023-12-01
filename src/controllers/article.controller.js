import Article from '../models/article.model.js'
import {validateObjectId} from '../validators/objectId.validator.js'

export const getArticles = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}

export const getArticleById = async (req, res, next) => {
    try {
        const {id: articleId} = req.params
        const filter = {_id: articleId}
        console.log(articleId)

        const article = await Article.findOne(filter).populate('owner')
        res.status(200).json(article)
    } catch (err) {
        next(err)
    }
}

export const createArticle = async (req, res, next) => {
    try {
        const ownerId = req.body.owner

        if (!ownerId)
            throw new Error('owner is required')

        if (!validateObjectId(ownerId))
            throw new Error('Invalid owner id')

        const article = new Article({
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            owner: ownerId,
            category: req.body.category
        })

        await article.save()
        res.status(201).json(article)
    } catch (err) {
        res.status(400)
        next(err)
    }
}

export const updateArticleById = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}

export const deleteArticleById = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}
