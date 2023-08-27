const jwt = require('jsonwebtoken');
const { readUserByName } = require('../user');


module.exports = async (req,res) => {
    console.log(req.body);

    const { name, password } = {
        name: 'teste',
        password: 'teste123'
    };

    const user = await readUserByName({ name: name });

    if (user[0].dataValues.password !== password) {
        return res.status(403).json({
            error: 'Invalid login',
        });
    }

    delete user.password;

    // const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'});

    // res.cookie('token', token, {
    //     httpOnly: true,
    // });

    return res.send('Logged in');
}
