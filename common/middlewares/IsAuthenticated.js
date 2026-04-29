const jwt = require('jsonwebtoken');
exports.check = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) 
        return res.status(401).json({ error: 'no authorization header provided'});

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer')
        return res.status(401).json({ error: 'Invalid authorization format'});

    try {
        const decoded = jwt.verify(token, 'your-secret-key')
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({error: 'Invalid or expired token'});
    }
};
