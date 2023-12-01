export const authMiddleware = (req, res, next) => {
    try {
        const userId = req.headers['user-id']

        if (!userId)
            throw new Error('Unauthorized: Missing user ID')

        req.user = {_id: userId}

        next()
    } catch (err) {
        res.status(401)
        next(err)
    }
}