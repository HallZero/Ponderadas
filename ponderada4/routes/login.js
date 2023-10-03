const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { readUserByName } = require('../models/user');

dotenv.config();

const JWT_SECRET = process.env.secret;
const JWT_ALGORITHM = process.env.algoritmo;

module.exports = async (req,res) => {

    const user = await readUserByName({ name: req.body.name });

    if (user.length === 0 || user[0].dataValues.password !== req.body.password) {
        return res.status(403).json({
            error: 'Invalid login',
        });
    }

    delete user[0].dataValues.password;

    const token = jwt.sign(user[0].dataValues.name, JWT_SECRET, {algorithm: JWT_ALGORITHM});

    return res.json({'access token': token});
}
