import jwt from 'jsonwebtoken'


export const checkAuth = (req, res, next) => {
    const token = (req.headers.authrization || '')
        .replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(
                token,
                proces.env.JWT_SECRET
            )

            req.userId = decoded.id

            next()

        } catch (error) {
            return res.json({
                message: 'Нет доступа'
            })
        }
    } else {
        return res.json({
            message: 'Нет доступа'
        })
    }
}