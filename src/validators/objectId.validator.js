import {ObjectId} from '../models/user.model.js'
export const validateObjectId = (id) => ObjectId.isValid(id)