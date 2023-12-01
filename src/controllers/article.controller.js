import Article from '../models/article.model.js'
import {validateObjectId} from '../validators/objectId.validator.js'

export const getArticles = async (req, res, next) => {
    try {
        const sortType = parseSortType(req.query.sort)
        const order = parseSortOrder(req.query.order)
        const page = parsePage(req.query.page)
        const limit = parseLimit(req.query.limit)

        const project = {createdAt: 0, updatedAt: 0}
        const skipCount = (page - 1) * limit

        const articles = await Article.find().skip(skipCount).sort([[sortType, order]]).limit(limit).select(project).populate('owner', 'fullName email age -_id')

        res.status(200).json(articles)
    } catch (err) {
        res.status(400)
        next(err)
    }
}

export const getArticleById = async (req, res, next) => {
    try {
        const {id: articleId} = req.params

        if (!validateObjectId(articleId))
            throw new Error('Invalid article id')

        const filter = {_id: articleId}

        const article = await Article.findById(filter)

        if (!article)
            throw new Error('Article not found')

        const project = {createdAt: 0, updatedAt: 0}

        const articleWithOwner = await Article.findById(filter).select(project).populate('owner', 'fullName email age -_id')

        res.status(200).json(articleWithOwner)
    } catch (err) {
        res.status(400)
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
        const {id: articleId} = req.params

        if (!validateObjectId(articleId))
            throw new Error('Invalid article id')

        const filter = {_id: articleId}

        const article = await Article.findById(filter)

        if (!article)
            throw new Error('Article not found')

        if (article.owner.equals(req.user.id))
            return res.status(403).json({message: 'Permission denied'})

        await article.deleteOne()
        res.status(200).json(article)
    } catch (err) {
        next(err)
    }
}

const parseSortType = function (type) {
    if (type !== 'title' && type !== 'category' && type !== 'createdAt')
        return 'createdAt'
    return type
}

const parseSortOrder = function (num) {
    let result = 1

    if (isFinite(num))
        result = parseInt(num)
    if (result !== 1 && result !== -1)
        return 1
    return result
}

const parsePage = function (page) {
    let result = 1

    if (isFinite(page))
        result = parseInt(page)
    if (result < 1)
        return 1
    return result
}

const parseLimit = function (limit) {
    let result = 5

    if (isFinite(limit))
        result = parseInt(limit)
    if (result < 1 || result > 10)
        return 5
    return result
}
