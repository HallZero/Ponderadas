const {sequelize, User} = require('../config/database');

async function createUser(user){
    await sequelize.sync();

    const new_user = await User.create({name: user.name, password: user.password});

    return new_user;
}

async function readUserByName(user){
    const user_read = await User.findAll({
        where: {
            name: user.name
        }
    });

    return user_read;
}


async function updateUser(user){
    const user_updated = await User.update({name: user.name}, {
        where: {
            id: user.id
        }
    });

    return user_updated;
}

async function deleteUser(user){
    const user_deleted = await User.destroy({
        where: {
            id: user.id
        }
    });

    return user_deleted;
}

module.exports = {createUser, readUserByName, updateUser, deleteUser};