export const validateUpdateFields = (update, reqBody) => {
    let {firstName, lastName, age} = reqBody

    if (firstName)
        update.firstName = validateString(firstName, 4, 50, 'firstName')

    if (lastName)
        update.lastName = validateString(lastName, 3, 60, 'lastName')

    if (age !== undefined)
        update.age = validateAge(age)
}

function validateString(fieldValue, minLength, maxLength, fieldName) {
    if (typeof fieldValue !== 'string')
        throw new Error(`${fieldName} must be a string`)

    fieldValue = fieldValue.trim()

    if (fieldValue.length < minLength || fieldValue.length > maxLength)
        throw new Error(`${fieldName} length must be at least 4 characters and not more than 50`)
    return fieldValue
}

function validateAge(age) {
    if (!Number.isFinite(age) || !Number.isInteger(age))
        throw new Error('age must be an integer')
    else if (age > 99 || age === 0)
        throw new Error('age cannot be greater than 99 and less than 1')
    else if (age < 0)
        return 1
    else
        return age
}
