const User = require("../models/user.model")

const { AUTH_TOKEN_MISSING_ERR, AUTH_HEADER_MISSING_ERR, JWT_DECODE_ERR, USER_NOT_FOUND_ERR } = require("../errors")
const { verifyJwtToken } = require("../utils/token.util")

 


module.exports = async (req, res, next) => {
    try {
        const header = req.headers.authorization
        var flag=0

        if (!header && flag==0) {
            next({ status: 403, message: AUTH_HEADER_MISSING_ERR })
            flag=1
        }

        const token = header.split("Bearer ")[1]

        if (!token && flag==0) {
            next({ status: 403, message: AUTH_TOKEN_MISSING_ERR })
            flag=1
        }

        const userId = verifyJwtToken(token,next)

        if (!userId && flag==0) {
            next({ status: 403, message: JWT_DECODE_ERR })
            flag=1
        }

        const user = await User.findById(userId)

        if (!user && flag==0) {
            next({status: 404, message: USER_NOT_FOUND_ERR })
            flag=1
        }

        res.locals.user = user

        next()
    } catch (err) {
        next(err)
    }
}
