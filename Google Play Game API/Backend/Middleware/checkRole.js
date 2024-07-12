
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const role = req.user.userRole
        if(allowedRoles.includes(role)){
            next()
        }else{
            res.status(403).json({message: 'Access denied'})
        }
    }
}

module.exports = checkRole