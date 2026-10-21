const jwt = require('jsonwebtoken');

exports.signToken = (user) => {
    return jwt.sign(
        { _id: user._id, permission: user.permission },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

exports.isAdmin = (req) => {
    try {
        if (!req.headers.authorization) return false;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.permission === 'admin';
    } catch (error) {
        return false;
    }
};