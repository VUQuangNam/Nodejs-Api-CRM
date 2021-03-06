const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = await Token.findOne({
            where: { value: token }
        });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        if ((decoded.iat * 1000) > Date.now() || data) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        } return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};