import User, {ObjectId} from '../models/user.model.js'
import {validateUpdateFields} from '../validators/updateUser.validator.js'

export const getUsers = async (req, res, next) => {
    try {
        const sortType = parseSortType(req.query.sort)
        const order = parseSortOrder(req.query.order)

        const filter = sortType === ' ' ? {} : {
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

    } catch (err) {
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

    } catch (err) {
        next(err)
    }
}

const parseSortType = function (type) {
    if (type !== 'age' && type !== 'fullName' && type !== 'email' && type !== 'createdAt')
        return ' '
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

const validateObjectId = (id) => ObjectId.isValid(id)