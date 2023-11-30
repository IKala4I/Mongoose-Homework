import mongoose from 'mongoose'
import {validateUpdateFields} from '../validators/updateUser.validator.js'

const roleEnum = {
    values: ['admin', 'writer', 'guest'],
    message: 'Role must be admin, writer or guest'
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        maxLength: 50,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 60,
        required: true,
        trim: true
    },
    fullName: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: [true, 'Already exists!'],
        match: [/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format']
    },
    role: {
        type: String,
        enum: roleEnum
    },
    age: {
        type: Number,
        min: 1,
        max: [99, 'Age cannot be more than 99']
    },
    numberOfArticles: {
        type: Number,
        min: [0, 'NumberOfArticles cannot be less than 0'],
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function (next) {
    if (!this.isModified('firstName') && !this.isModified('lastName')) {
        return next()
    }

    this.fullName = `${this.firstName} ${this.lastName}`
    next()
})

userSchema.pre('validate', function (next) {
    if (this.age < 0) {
        this.age = 1
    }
    next()
})
userSchema.pre('updateOne', function (next) {
    this.update({}, { $set: { updatedAt: new Date() } })
    next()
})

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('A user with this email already exists'))
    } else {
        next(error)
    }
})

const User = mongoose.model('User', userSchema)

export default User