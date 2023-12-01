import mongoose from 'mongoose'
import User, {ObjectId} from './user.model.js'

const categoryEnum = {
    values: ['sport', 'games', 'history'],
    message: 'Category must be sport, games or history'
}

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        maxLength: 400,
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        minLength: 5
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 5000,
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        enum: categoryEnum,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

articleSchema.pre('save', async function (next) {
    const ownerId = this.owner
    const owner = await User.findById({_id: ownerId})

    if (!owner)
        throw new Error('owner doesn\'t exist')

    next()
})

articleSchema.post('save', async function () {
    const owner = await User.findById({_id: this.owner})
    owner.numberOfArticles += 1
    await owner.save()
})

const Article = mongoose.model('Article', articleSchema)

export default Article
