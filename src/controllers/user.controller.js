import User, {ObjectId} from '../models/user.model.js'
import {validateUpdateFields} from '../validators/updateUser.validator.js'
import {validateObjectId} from '../validators/objectId.validator.js'

export const getUsers = async (req, res, next) => {
    try {
        const sortType = parseSortType(req.query.sort)
        const order = parseSortOrder(req.query.order)

        const filter = sortType === 'createdAt' ? {} : {
            [sortType]: {$exists: true}
        }

        const project = {_id: 1, fullName: 1, email: 1, age: 1}

        const users = await User.find(filter).sort([[sortType, order]]).select(project)

        return res.status(200).json(users)
    } catch (err) {
        res.status(400)
        next(err)
    }
}

export const getUserByIdWithArticles = async (req, res, next) => {
    try {
        const {id: userId} = req.params

        if (!validateObjectId(userId))
            throw new Error('Invalid user id')

        const filter = {_id: new ObjectId(userId)}

        const userWithArticles = await User.aggregate([
            {
                $match: filter,
            },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'owner',
                    as: 'articles',
                },
            },
            {
                $project: {
                    _id: 1,
                    fullName: 1,
                    email: 1,
                    age: 1,
                    numberOfArticles: 1,
                    articles: {
                        $map: {
                            input: '$articles',
                            as: 'article',
                            in: {
                                title: '$$article.title',
                                subtitle: '$$article.subtitle',
                                createdAt: '$$article.createdAt'
                            }
                        }
                    },
                },
            },
        ])

        if (userWithArticles.length === 0)
            throw new Error('User not found')

        res.status(200).json(userWithArticles[0])
    } catch (err) {
        res.status(404)
        next(err)
    }
}

export const createUser = async (req, res, next) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role,
            age: req.body.age,
            numberOfArticles: req.body.numberOfArticles
        })

        await user.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(400)
        next(err)
    }
}

export const updateUserById = async (req, res, next) => {
    try {
        const {id: userId} = req.params

        if (!validateObjectId(userId))
            throw new Error('Invalid user id')

        const filter = {_id: userId}
        const project = {firstName: 1, lastName: 1, fullName: 1, age: 1}

        const user = await User.findById(filter).select(project)
        if (!user)
            throw new Error('User not found')

        const update = {}

        validateUpdateFields(update, req.body)

        for (const key in update)
            user[key] = update[key]

        await user.save()

        res.status(200).json(user)
    } catch (err) {
        res.status(404)
        next(err)
    }
}

export const deleteUserById = async (req, res, next) => {
    try {
        const {id: userId} = req.params

        if (!validateObjectId(userId))
            throw new Error('Invalid user id')

        const filter = {_id: userId}

        const user = await User.findById(filter)

        if (!user)
            throw new Error('User not found')

        await User.deleteOne(filter)

        res.status(200).json(user)
    } catch (err) {
        res.status(400)
        next(err)
    }
}

const parseSortType = function (type) {
    if (type !== 'age' && type !== 'fullName' && type !== 'email' && type !== 'createdAt' && type !== 'numberOfArticles')
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