const jwt = require('jsonwebtoken');

exports.signToken = (_id, secret, expireTime) => {
    return jwt.sign({_id}, secret, {expiresIn:expireTime});
};

exports.isAdmin = (user) => {
    return user && user.permission === 'admin';
};