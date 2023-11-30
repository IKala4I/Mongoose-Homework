export const validateUpdateFields = (updateFields) => {
    const {firstName, lastName, age} = updateFields

    if (firstName)
        validateString(firstName, 4, 50, 'firstName')

    if (lastName)
        validateString(lastName, 3, 60, 'lastName')

    if (age !== undefined)
        updateFields.age = validateAge(age)
}

function validateString(fieldValue, minLength, maxLength, fieldName) {
    if (fieldValue.length < minLength || fieldValue.length > maxLength)
        throw new Error(`${fieldName} length must be at least 4 characters and not more than 50`)
}

function validateAge(age) {
    if (age > 99 || age === 0)
        throw new Error('age cannot be greater than 99 and less than 1')
    else if (age < 0)
        return 1
    else
        return age
}
