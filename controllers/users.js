const sequelize = require('../common/database');
const defineUser = require('../common/models/User');
const User = defineUser(sequelize);
const router = require('express').Router();
const { check } = require('../common/middlewares/IsAuthenticated');

const getUser = async (req, res) => {
    const user = await User.findByPk(req.user.userId);
    if(!user) return res.status(404).json({error: 'User not found'});
    res.json({success: true, data: user});
};

const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json({ success: true, data: users});
}




router.get('/', check, getUser);
router.get('/all', check, getAllUsers);

module.exports = router;
