const User = require('../models/User');
const Pet = require('../models/Pet');

const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');
exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
    const user = await User.findOne({ username }).lean();

    if (!user) {
        throw new Error(' Wrong username or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error(' Wrong username or password!');
    }

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, {expiresIn: '1d'});

    return token;
};

exports.findbyUser = (userId) => Pet.find({owner: userId});