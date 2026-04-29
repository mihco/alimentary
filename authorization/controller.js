const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sequelize = require('../common/database');
const defineUser = require('../common/models/User');
const User = defineUser(sequelize);
const addFormats = require("ajv-formats")
const Ajv = require('ajv');
const ajv = new Ajv();
addFormats(ajv);

const schema = {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
        username: { type: 'string', minLength: 3 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
    }
};
const validate = ajv.compile(schema);


const encryptPassword = (password) =>
    crypto.createHash('sha256').update(password).digest('hex');

const generateAccessToken = (username, userID) =>
    jwt.sign({ username, userID}, 'your-secret-key', { expiresIn: '24h' });

exports.register = async (req, res) => {
    if(!validate(req.body)) {
        return res.status(400).json({ error:'Invalid input', details: validate.errors });
    }

    try {
        const { username, email, password, firstName, lastName, age } = req.body;
        const encryptedPassword = encryptPassword(password);
        const user = await User.create({
            username,
            email,
            password: encryptedPassword,
            firstName,
            lastName,
            age
        });
        const accessToken = generateAccessToken(username, user.id);
        res.status(201).json({
            success: true,
            user: { id: user.id, username: user.username, email: user.email },
            token: accessToken
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

exports.login = async (res, req) => {
    const {username, password} = req.body;
    const encrypted = encryptPassword(password);
    const user = await User.findOne({ where: username});

    if(!user || user.password !== encrypted)
        return res.status(401).json({error: 'Invalid credentials'});

    const token = generateAccessToken(username, user.id);
    res.json({success: true, user, token})
}