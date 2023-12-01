import {Router} from 'express'
import {
    createArticle,
    updateArticleById,
    deleteArticleById,
    getArticles,
    getArticleById,
} from '../controllers/article.controller.js'
import {authMiddleware} from '../middlewares/auth.middleware.js'

const articleRouter = Router()

articleRouter.use('/:id', (req, res, next) => {
    if (req.method === 'DELETE' || req.method === 'PUT') {
        authMiddleware(req, res, next)
    } else {
        next()
    }
})

articleRouter
    .get('/', getArticles)
    .get('/:id', getArticleById)
    .post('/', createArticle)
    .put('/:id', updateArticleById)
    .delete('/:id', deleteArticleById)

export default articleRouter
